import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest

from app import create_app
from config import TestingConfig
from models import db, User, Task, Project, Comment


@pytest.fixture
def app():
    app = create_app(TestingConfig)
    yield app
    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def register(client, username="alice", email="alice@example.com", password="secret123", role="member"):
    return client.post(
        "/api/auth/register",
        json={"username": username, "email": email, "password": password, "role": role},
    )


def login(client, username="alice", password="secret123"):
    return client.post(
        "/api/auth/login", json={"username": username, "password": password}
    )


def auth_header(client, username="alice", password="secret123"):
    resp = login(client, username, password)
    token = resp.get_json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


class TestAuth:
    def test_register_success(self, client):
        resp = register(client)
        assert resp.status_code == 201
        assert resp.get_json()["user"]["username"] == "alice"
        assert resp.get_json()["user"]["role"] == "member"

    def test_register_with_role(self, client):
        resp = register(client, username="manager_bob", email="bob@example.com", role="manager")
        assert resp.status_code == 201
        assert resp.get_json()["user"]["role"] == "manager"

    def test_register_duplicate_username(self, client):
        register(client)
        resp = register(client, email="other@example.com")
        assert resp.status_code == 409

    def test_register_missing_fields(self, client):
        resp = client.post("/api/auth/register", json={"username": "bob"})
        assert resp.status_code == 400

    def test_login_success(self, client):
        register(client)
        resp = login(client)
        assert resp.status_code == 200
        assert "access_token" in resp.get_json()

    def test_login_wrong_password(self, client):
        register(client)
        resp = login(client, password="wrongpass")
        assert resp.status_code == 401

    def test_login_nonexistent_user(self, client):
        resp = login(client, username="ghost")
        assert resp.status_code == 401


class TestProjects:
    def test_create_and_list_project(self, client):
        register(client)
        headers = auth_header(client)
        resp = client.post(
            "/api/projects",
            json={"name": "Migration Project", "description": "Migrating DB"},
            headers=headers,
        )
        assert resp.status_code == 201
        data = resp.get_json()
        assert data["name"] == "Migration Project"

        resp2 = client.get("/api/projects", headers=headers)
        assert resp2.status_code == 200
        assert len(resp2.get_json()) == 1


class TestTasks:
    def _headers(self, client):
        register(client)
        return auth_header(client)

    def test_create_task_requires_auth(self, client):
        resp = client.post("/api/tasks", json={"title": "No auth"})
        assert resp.status_code == 401

    def test_create_task_success(self, client):
        headers = self._headers(client)
        resp = client.post("/api/tasks", json={"title": "Write tests", "due_date": "2026-08-30"}, headers=headers)
        assert resp.status_code == 201
        body = resp.get_json()
        assert body["title"] == "Write tests"
        assert body["status"] == "pending"
        assert "2026-08-30" in body["due_date"]

    def test_create_task_missing_title(self, client):
        headers = self._headers(client)
        resp = client.post("/api/tasks", json={"description": "no title"}, headers=headers)
        assert resp.status_code == 400

    def test_create_task_invalid_status(self, client):
        headers = self._headers(client)
        resp = client.post(
            "/api/tasks", json={"title": "Bad status", "status": "nope"}, headers=headers
        )
        assert resp.status_code == 400

    def test_list_tasks(self, client):
        headers = self._headers(client)
        client.post("/api/tasks", json={"title": "Task 1"}, headers=headers)
        client.post("/api/tasks", json={"title": "Task 2"}, headers=headers)
        resp = client.get("/api/tasks", headers=headers)
        assert resp.status_code == 200
        assert resp.get_json()["total"] == 2

    def test_filter_tasks_by_status(self, client):
        headers = self._headers(client)
        client.post(
            "/api/tasks",
            json={"title": "Done task", "status": "completed"},
            headers=headers,
        )
        client.post("/api/tasks", json={"title": "Pending task"}, headers=headers)
        resp = client.get("/api/tasks?status=completed", headers=headers)
        data = resp.get_json()
        assert data["total"] == 1
        assert data["tasks"][0]["title"] == "Done task"

    def test_get_single_task(self, client):
        headers = self._headers(client)
        create_resp = client.post("/api/tasks", json={"title": "Solo task"}, headers=headers)
        task_id = create_resp.get_json()["id"]
        resp = client.get(f"/api/tasks/{task_id}", headers=headers)
        assert resp.status_code == 200
        assert resp.get_json()["title"] == "Solo task"

    def test_get_task_not_found(self, client):
        headers = self._headers(client)
        resp = client.get("/api/tasks/999", headers=headers)
        assert resp.status_code == 404

    def test_update_task(self, client):
        headers = self._headers(client)
        create_resp = client.post("/api/tasks", json={"title": "Old title"}, headers=headers)
        task_id = create_resp.get_json()["id"]
        resp = client.put(
            f"/api/tasks/{task_id}",
            json={"title": "New title", "status": "in_progress"},
            headers=headers,
        )
        assert resp.status_code == 200
        body = resp.get_json()
        assert body["title"] == "New title"
        assert body["status"] == "in_progress"

    def test_delete_task(self, client):
        headers = self._headers(client)
        create_resp = client.post("/api/tasks", json={"title": "To delete"}, headers=headers)
        task_id = create_resp.get_json()["id"]
        resp = client.delete(f"/api/tasks/{task_id}", headers=headers)
        assert resp.status_code == 200
        resp2 = client.get(f"/api/tasks/{task_id}", headers=headers)
        assert resp2.status_code == 404


class TestComments:
    def test_add_and_list_comments(self, client):
        register(client)
        headers = auth_header(client)
        create_resp = client.post("/api/tasks", json={"title": "Task for comments"}, headers=headers)
        task_id = create_resp.get_json()["id"]

        resp = client.post(
            f"/api/tasks/{task_id}/comments",
            json={"content": "Great task progress!"},
            headers=headers,
        )
        assert resp.status_code == 201
        assert resp.get_json()["content"] == "Great task progress!"

        resp2 = client.get(f"/api/tasks/{task_id}/comments", headers=headers)
        assert resp2.status_code == 200
        assert len(resp2.get_json()) == 1
