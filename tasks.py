from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import db, Task, Comment, User, Project

tasks_bp = Blueprint("tasks", __name__)

ALLOWED_STATUSES = {"pending", "in_progress", "completed"}
ALLOWED_PRIORITIES = {"low", "medium", "high"}


def _current_user():
    user_id = int(get_jwt_identity())
    return db.session.get(User, user_id)


def _parse_due_date(date_str):
    if not date_str:
        return None
    try:
        if "T" in date_str:
            return datetime.fromisoformat(date_str)
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        return None


@tasks_bp.route("", methods=["GET"])
@jwt_required()
def list_tasks():
    user = _current_user()
    if not user:
        return jsonify({"error": "user not found"}), 404

    if user.role in ("admin", "manager"):
        query = Task.query
    else:
        query = Task.query.filter(
            (Task.user_id == user.id) | (Task.assigned_to_id == user.id)
        )

    status = request.args.get("status")
    priority = request.args.get("priority")
    search = request.args.get("search")
    project_id = request.args.get("project_id")
    assigned_to_id = request.args.get("assigned_to_id")

    if status:
        if status not in ALLOWED_STATUSES:
            return jsonify({"error": f"invalid status filter '{status}'"}), 400
        query = query.filter_by(status=status)

    if priority:
        if priority not in ALLOWED_PRIORITIES:
            return jsonify({"error": f"invalid priority filter '{priority}'"}), 400
        query = query.filter_by(priority=priority)

    if project_id:
        query = query.filter_by(project_id=project_id)

    if assigned_to_id:
        query = query.filter_by(assigned_to_id=assigned_to_id)

    if search:
        query = query.filter(Task.title.ilike(f"%{search}%"))

    try:
        page = max(int(request.args.get("page", 1)), 1)
        per_page = min(max(int(request.args.get("per_page", 20)), 1), 100)
    except ValueError:
        return jsonify({"error": "page and per_page must be integers"}), 400

    pagination = query.order_by(Task.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify(
        {
            "tasks": [t.to_dict() for t in pagination.items],
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
        }
    ), 200


@tasks_bp.route("/<int:task_id>", methods=["GET"])
@jwt_required()
def get_task(task_id):
    user = _current_user()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "task not found"}), 404

    if user.role not in ("admin", "manager") and task.user_id != user.id and task.assigned_to_id != user.id:
        return jsonify({"error": "task not found"}), 404

    return jsonify(task.to_dict()), 200


@tasks_bp.route("", methods=["POST"])
@jwt_required()
def create_task():
    user = _current_user()
    if not user:
        return jsonify({"error": "user not found"}), 404

    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    if not title:
        return jsonify({"error": "title is required"}), 400

    status = data.get("status", "pending")
    priority = data.get("priority", "medium")

    if status not in ALLOWED_STATUSES:
        return jsonify({"error": f"invalid status '{status}'"}), 400
    if priority not in ALLOWED_PRIORITIES:
        return jsonify({"error": f"invalid priority '{priority}'"}), 400

    due_date = _parse_due_date(data.get("due_date"))

    task = Task(
        title=title,
        description=data.get("description"),
        status=status,
        priority=priority,
        due_date=due_date,
        user_id=user.id,
        assigned_to_id=data.get("assigned_to_id"),
        project_id=data.get("project_id"),
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


@tasks_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    user = _current_user()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "task not found"}), 404

    if user.role not in ("admin", "manager") and task.user_id != user.id and task.assigned_to_id != user.id:
        return jsonify({"error": "task not found"}), 404

    data = request.get_json(silent=True) or {}

    if "title" in data:
        title = (data.get("title") or "").strip()
        if not title:
            return jsonify({"error": "title cannot be empty"}), 400
        task.title = title

    if "description" in data:
        task.description = data.get("description")

    if "status" in data:
        if data["status"] not in ALLOWED_STATUSES:
            return jsonify({"error": f"invalid status '{data['status']}'"}), 400
        task.status = data["status"]

    if "priority" in data:
        if data["priority"] not in ALLOWED_PRIORITIES:
            return jsonify({"error": f"invalid priority '{data['priority']}'"}), 400
        task.priority = data["priority"]

    if "due_date" in data:
        task.due_date = _parse_due_date(data.get("due_date"))

    if "assigned_to_id" in data:
        task.assigned_to_id = data.get("assigned_to_id")

    if "project_id" in data:
        task.project_id = data.get("project_id")

    db.session.commit()
    return jsonify(task.to_dict()), 200


@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user = _current_user()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "task not found"}), 404

    if user.role not in ("admin", "manager") and task.user_id != user.id:
        return jsonify({"error": "permission denied"}), 403

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "task deleted"}), 200


@tasks_bp.route("/<int:task_id>/comments", methods=["GET"])
@jwt_required()
def list_comments(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "task not found"}), 404

    comments = Comment.query.filter_by(task_id=task_id).order_by(Comment.created_at.asc()).all()
    return jsonify([c.to_dict() for c in comments]), 200


@tasks_bp.route("/<int:task_id>/comments", methods=["POST"])
@jwt_required()
def add_comment(task_id):
    user = _current_user()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "task not found"}), 404

    data = request.get_json(silent=True) or {}
    content = (data.get("content") or "").strip()
    if not content:
        return jsonify({"error": "comment content is required"}), 400

    comment = Comment(content=content, task_id=task_id, user_id=user.id)
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.to_dict()), 201
