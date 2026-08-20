from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import db, Project, User

projects_bp = Blueprint("projects", __name__)


def _current_user():
    user_id = int(get_jwt_identity())
    return db.session.get(User, user_id)


@projects_bp.route("", methods=["GET"])
@jwt_required()
def list_projects():
    user = _current_user()
    if not user:
        return jsonify({"error": "user not found"}), 404

    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([p.to_dict() for p in projects]), 200


@projects_bp.route("/<int:project_id>", methods=["GET"])
@jwt_required()
def get_project(project_id):
    project = db.session.get(Project, project_id)
    if not project:
        return jsonify({"error": "project not found"}), 404
    return jsonify(project.to_dict()), 200


@projects_bp.route("", methods=["POST"])
@jwt_required()
def create_project():
    user = _current_user()
    if not user:
        return jsonify({"error": "user not found"}), 404

    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "project name is required"}), 400

    project = Project(
        name=name,
        description=data.get("description"),
        owner_id=user.id,
    )
    db.session.add(project)
    db.session.commit()

    return jsonify(project.to_dict()), 201


@projects_bp.route("/<int:project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    user = _current_user()
    project = db.session.get(Project, project_id)
    if not project:
        return jsonify({"error": "project not found"}), 404

    if user.role not in ("admin", "manager") and project.owner_id != user.id:
        return jsonify({"error": "permission denied"}), 403

    data = request.get_json(silent=True) or {}
    if "name" in data:
        name = (data.get("name") or "").strip()
        if not name:
            return jsonify({"error": "project name cannot be empty"}), 400
        project.name = name

    if "description" in data:
        project.description = data.get("description")

    db.session.commit()
    return jsonify(project.to_dict()), 200


@projects_bp.route("/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    user = _current_user()
    project = db.session.get(Project, project_id)
    if not project:
        return jsonify({"error": "project not found"}), 404

    if user.role not in ("admin", "manager") and project.owner_id != user.id:
        return jsonify({"error": "permission denied"}), 403

    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "project deleted"}), 200
