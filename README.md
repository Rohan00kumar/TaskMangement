# Task Management API (Flask)

A full-stack Task Management REST API built with **Flask**, **Flask-SQLAlchemy**,
and **Flask-JWT-Extended**. Supports user registration/login, JWT-protected
task CRUD, filtering, and pagination. Comes with a pytest test suite.

## Tech Stack

- **Framework:** Flask + Flask-RESTful-style blueprints
- **Database:** SQLite (via SQLAlchemy ORM)
- **Auth:** JWT (Flask-JWT-Extended)
- **Testing:** pytest

## Project Structure

```
task_api/
├── app.py            # App factory, blueprint registration
├── config.py          # Config classes (dev / testing)
├── models.py           # User and Task SQLAlchemy models
├── auth.py             # /api/auth routes (register, login)
├── tasks.py             # /api/tasks routes (CRUD + filtering)
├── requirements.txt
├── tests/
│   └── test_tasks.py   # pytest suite (17 tests)
└── README.md
```

## Setup

```bash
cd task_api
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the app

```bash
python app.py
```

The API will start at `http://127.0.0.1:5000`. A `app.db` SQLite file is
created automatically on first run.

## Running tests

```bash
pytest tests/ -v
```

All 17 tests should pass (auth: registration/login edge cases; tasks: CRUD,
filtering, ownership isolation, auth enforcement).

## API Reference

### Auth

| Method | Endpoint             | Body                          | Description         |
| ------ | -------------------- | ----------------------------- | ------------------- |
| POST   | `/api/auth/register` | `{username, email, password}` | Create a new user   |
| POST   | `/api/auth/login`    | `{username, password}`        | Returns a JWT token |

**Login response:**

```json
{
  "access_token": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com",
    "created_at": "..."
  }
}
```

All `/api/tasks/*` routes below require the header:

```
Authorization: Bearer <access_token>
```

### Tasks

| Method | Endpoint          | Description                                     |
| ------ | ----------------- | ----------------------------------------------- |
| GET    | `/api/tasks`      | List the current user's tasks (filter/paginate) |
| POST   | `/api/tasks`      | Create a task                                   |
| GET    | `/api/tasks/<id>` | Get a single task                               |
| PUT    | `/api/tasks/<id>` | Update a task                                   |
| DELETE | `/api/tasks/<id>` | Delete a task                                   |

**Query params for `GET /api/tasks`:**

- `status` — `pending` | `in_progress` | `completed`
- `priority` — `low` | `medium` | `high`
- `search` — case-insensitive substring match on title
- `page`, `per_page` — pagination (default page=1, per_page=20, max 100)

**Task body (create/update):**

```json
{
  "title": "Write project README",
  "description": "Optional details",
  "status": "pending",
  "priority": "medium"
}
```

Each task is scoped to the authenticated user — you can never see or modify
another user's tasks (enforced at the query level, and covered by a test).

## Example curl walkthrough

```bash
# Register
curl -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret123"}'

# Login
TOKEN=$(curl -s -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")

# Create a task
curl -X POST http://127.0.0.1:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Buy milk","priority":"low"}'

# List tasks, filtered
curl "http://127.0.0.1:5000/api/tasks?status=pending" \
  -H "Authorization: Bearer $TOKEN"

# Update a task
curl -X PUT http://127.0.0.1:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status":"completed"}'

# Delete a task
curl -X DELETE http://127.0.0.1:5000/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN"
```

## Notes on production readiness

This mirrors what's expected for the project brief (entry-level portfolio
piece), but a few things worth knowing if you extend it:

- `SECRET_KEY` / `JWT_SECRET_KEY` should be set via environment variables in
  any real deployment, not left as the dev defaults in `config.py`.
- SQLite is fine for development; swap `DATABASE_URL` for Postgres/MySQL in
  production via the `SQLALCHEMY_DATABASE_URI` config.
- Add token expiry / refresh tokens if this needs to run beyond a demo.

Absolutely. For a **professional, scalable Task Management System**, I’d structure the backend, database, and frontend so that each layer has a clear responsibility and integrates through REST APIs.

## 1. Overall Architecture

```text
┌──────────────────────────────┐
│         FRONTEND             │
│  React / HTML-CSS-JS / etc.  │
│                              │
│ Pages → Components → API     │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│          FLASK API           │
│                              │
│ Routes / Blueprints          │
│ Controllers / Services       │
│ Authentication / Validation  │
└──────────────┬───────────────┘
               │ SQLAlchemy ORM
               ▼
┌──────────────────────────────┐
│           SQLite             │
│                              │
│ Users │ Projects │ Tasks     │
│ Teams │ Comments │ etc.      │
└──────────────────────────────┘
```

---

# 2. Recommended Backend Structure

```text
backend/
│
├── app/
│   ├── __init__.py
│   ├── config.py
│   │
│   ├── extensions.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── comment.py
│   │   ├── notification.py
│   │   └── activity_log.py
│   │
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── projects.py
│   │   ├── tasks.py
│   │   ├── comments.py
│   │   ├── notifications.py
│   │   ├── reports.py
│   │   └── admin.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── task_service.py
│   │   ├── project_service.py
│   │   ├── notification_service.py
│   │   └── report_service.py
│   │
│   ├── schemas/
│   │   ├── auth_schema.py
│   │   ├── task_schema.py
│   │   ├── project_schema.py
│   │   └── user_schema.py
│   │
│   ├── utils/
│   │   ├── decorators.py
│   │   ├── validators.py
│   │   ├── permissions.py
│   │   └── helpers.py
│   │
│   └── errors/
│       └── handlers.py
│
├── tests/
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_users.py
│   ├── test_projects.py
│   ├── test_tasks.py
│   └── test_reports.py
│
├── migrations/
│
├── instance/
│   └── taskmanager.db
│
├── requirements.txt
├── run.py
├── .env
├── .gitignore
└── README.md
```

### Why this structure?

- **Models** → database structure
- **Routes** → API endpoints
- **Services** → business logic
- **Schemas** → request/response validation
- **Utils** → reusable authentication/permission logic
- **Tests** → automated testing
- **Config** → environment-specific configuration

This prevents putting all your logic inside one huge `app.py`.

---

# 3. Database Structure

For the features you listed, I recommend these core tables:

```text
users
roles
projects
project_members
tasks
comments
notifications
activity_logs
```

### Relationship

```text
User
 │
 ├───────────────┐
 ▼               ▼
Projects        Tasks
 │               │
 ▼               ▼
ProjectMembers  Comments
 │
 ▼
Users

Tasks ──────────► Notifications
Tasks ──────────► ActivityLogs
Users ──────────► ActivityLogs
```

---

# 4. Users Table

```text
users
--------------------------------
id              PK
name
email           UNIQUE
password_hash
role_id         FK
avatar
is_active
created_at
updated_at
```

Roles:

```text
ADMIN
MANAGER
MEMBER
```

Never store the actual password. Store a secure password hash.

---

# 5. Projects Table

```text
projects
--------------------------------
id              PK
name
description
status
priority
start_date
due_date
created_by      FK → users.id
created_at
updated_at
```

Example statuses:

```text
PLANNING
ACTIVE
ON_HOLD
COMPLETED
ARCHIVED
```

---

# 6. Project Members

A project can have many users, and a user can belong to many projects.

Therefore use a many-to-many table:

```text
project_members
--------------------------------
id              PK
project_id      FK
user_id         FK
role
joined_at
```

Example:

```text
Project A
 ├── Manager John
 ├── Member Alex
 └── Member Sarah
```

---

# 7. Tasks Table

This is the main table of the application.

```text
tasks
--------------------------------
id              PK
project_id      FK
title
description
status
priority
assigned_to     FK → users.id
created_by      FK → users.id
due_date
estimated_hours
completed_at
created_at
updated_at
```

### Status

```text
TODO
IN_PROGRESS
IN_REVIEW
COMPLETED
CANCELLED
```

### Priority

```text
LOW
MEDIUM
HIGH
URGENT
```

---

# 8. Comments

```text
comments
--------------------------------
id              PK
task_id         FK
user_id         FK
content
created_at
updated_at
```

This allows:

```text
Task
 ├── Comment by John
 ├── Comment by Alex
 └── Comment by Sarah
```

---

# 9. Notifications

```text
notifications
--------------------------------
id              PK
user_id         FK
type
title
message
is_read
related_task_id
related_project_id
created_at
```

Examples:

```text
"You were assigned a new task"
"Task deadline is tomorrow"
"Project status was updated"
"Someone commented on your task"
```

---

# 10. Activity Logs

For a professional system, keep an activity history.

```text
activity_logs
--------------------------------
id              PK
user_id         FK
action
entity_type
entity_id
description
created_at
```

Example:

```text
John created task "Design Dashboard"

Alex changed task status
TODO → IN_PROGRESS

Sarah assigned task to John
```

This is especially useful for the **Activity History** page.

---

# 11. API Structure

Use versioned REST APIs:

```text
/api/v1/
```

### Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
```

JWT handles authentication.

---

### Users

```text
GET    /api/v1/users
GET    /api/v1/users/<id>
PUT    /api/v1/users/<id>
DELETE /api/v1/users/<id>
```

---

### Projects

```text
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/<id>
PUT    /api/v1/projects/<id>
DELETE /api/v1/projects/<id>

GET    /api/v1/projects/<id>/members
POST   /api/v1/projects/<id>/members
DELETE /api/v1/projects/<id>/members/<user_id>
```

---

### Tasks

```text
GET    /api/v1/tasks
POST   /api/v1/tasks
GET    /api/v1/tasks/<id>
PUT    /api/v1/tasks/<id>
DELETE /api/v1/tasks/<id>

PATCH  /api/v1/tasks/<id>/status
PATCH  /api/v1/tasks/<id>/priority

GET    /api/v1/projects/<id>/tasks
```

Useful filtering:

```text
GET /api/v1/tasks?status=IN_PROGRESS
GET /api/v1/tasks?priority=HIGH
GET /api/v1/tasks?assigned_to=5
GET /api/v1/tasks?project_id=2
```

---

### Comments

```text
GET    /api/v1/tasks/<id>/comments
POST   /api/v1/tasks/<id>/comments
PUT    /api/v1/comments/<id>
DELETE /api/v1/comments/<id>
```

---

### Notifications

```text
GET   /api/v1/notifications
PATCH /api/v1/notifications/<id>/read
PATCH /api/v1/notifications/read-all
```

---

### Reports

```text
GET /api/v1/reports/dashboard
GET /api/v1/reports/tasks
GET /api/v1/reports/projects
GET /api/v1/reports/team
```

---

# 12. Frontend ↔ Backend Integration

Keep a dedicated API layer on the frontend.

```text
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   ├── services/
│   │   ├── api.js
│   │   ├── authApi.js
│   │   ├── taskApi.js
│   │   ├── projectApi.js
│   │   └── userApi.js
│   │
│   ├── hooks/
│   ├── context/
│   │   └── AuthContext
│   ├── utils/
│   └── routes/
│
└── ...
```

For example:

```text
Task Page
   ↓
taskApi.getTasks()
   ↓
GET /api/v1/tasks
   ↓
Flask Task Blueprint
   ↓
Task Service
   ↓
SQLAlchemy
   ↓
SQLite
```

Response:

```text
SQLite
  ↓
SQLAlchemy
  ↓
Task Service
  ↓
Flask JSON Response
  ↓
Frontend API Service
  ↓
Task Table / Kanban UI
```

---

# 13. Authentication Flow

```text
User
 ↓
Login Form
 ↓
POST /api/v1/auth/login
 ↓
Flask validates credentials
 ↓
JWT Access Token
 ↓
Frontend stores authentication state
 ↓
API requests include JWT
 ↓
Flask-JWT-Extended validates token
 ↓
Protected endpoint
```

Protected pages:

```text
Dashboard
Tasks
Projects
Team
Reports
Settings
```

Admin-only pages should additionally check the user's role.

---

# 14. Permission System

Don't rely only on hiding frontend buttons.

Backend must also verify permissions.

Example:

```text
ADMIN
 ├── Manage users
 ├── Manage projects
 ├── Manage roles
 └── View all reports

MANAGER
 ├── Create projects
 ├── Assign tasks
 ├── Manage project members
 └── View project reports

MEMBER
 ├── View assigned tasks
 ├── Update task status
 ├── Add comments
 └── View assigned projects
```

The backend should enforce these permissions even if someone manually calls the API.

---

# 15. Testing Structure

Using **pytest**:

```text
tests/
│
├── conftest.py
│
├── test_auth.py
│   ├── test_register()
│   ├── test_login()
│   └── test_invalid_login()
│
├── test_users.py
│
├── test_projects.py
│   ├── test_create_project()
│   ├── test_update_project()
│   └── test_delete_project()
│
├── test_tasks.py
│   ├── test_create_task()
│   ├── test_assign_task()
│   ├── test_update_task_status()
│   └── test_delete_task()
│
└── test_permissions.py
```

Test important cases such as:

- Valid/invalid login
- JWT-protected routes
- Creating tasks
- Assigning tasks
- Updating status
- Project permissions
- Admin permissions
- Invalid IDs
- Missing required fields
- Unauthorized API requests

---

# 16. Configuration

Use environment variables rather than hardcoding secrets.

```text
.env

SECRET_KEY=...
JWT_SECRET_KEY=...
DATABASE_URL=sqlite:///taskmanager.db
```

And separate configurations:

```text
DevelopmentConfig
TestingConfig
ProductionConfig
```

For tests, use a separate temporary/test database so your real database isn't modified.

---

# 17. Final Professional Stack

```text
FRONTEND
│
├── Pages
├── Components
├── Layouts
├── API Services
├── Authentication State
└── Protected Routes
        │
        │ REST / JSON
        ▼
BACKEND — FLASK
│
├── Blueprints / Routes
├── JWT Authentication
├── Permission System
├── Validation
├── Services / Business Logic
├── Error Handling
└── SQLAlchemy ORM
        │
        ▼
DATABASE — SQLite
│
├── Users
├── Roles
├── Projects
├── Project Members
├── Tasks
├── Comments
├── Notifications
└── Activity Logs

TESTING — PYTEST
│
├── Authentication Tests
├── API Tests
├── Task Tests
├── Project Tests
└── Permission Tests
```

### Recommended development order

**1. Database models → 2. Authentication/JWT → 3. User & role system → 4. Projects → 5. Tasks → 6. Comments → 7. Notifications → 8. Dashboard/Reports → 9. Frontend integration → 10. pytest testing**

This order keeps the dependencies clean and makes it much easier to build the project without creating a tightly coupled backend.

App
├── Auth
│ ├── Login
│ ├── Register
│ ├── ForgotPassword
│ └── ResetPassword
│
├── Dashboard
│
├── Tasks
│ ├── AllTasks
│ ├── MyTasks
│ ├── CreateTask
│ ├── TaskDetails
│ └── KanbanBoard
│
├── Projects
│ ├── ProjectList
│ ├── CreateProject
│ └── ProjectDetails
│
├── Team
│ ├── Members
│ └── MemberProfile
│
├── Calendar
├── Notifications
├── Reports
│
├── Profile
├── Settings
│
└── Admin
├── Dashboard
├── Users
├── Roles
└── ActivityLogs

### Professional Task Management Project Features

- **User Authentication & Role Management** – Secure login with Admin, Manager, and Team Member roles.
- **Task Creation & Assignment** – Create, assign, prioritize, and manage tasks.
- **Task Status Tracking** – Track tasks as To-Do, In Progress, Review, and Completed.
- **Deadline & Priority Management** – Set due dates, priorities, and reminders.
- **Project & Team Management** – Organize tasks into projects and manage team members.
- **Dashboard & Analytics** – View progress, workload, deadlines, and completion statistics.
- **Notifications & Reminders** – Get alerts for assignments, deadlines, and updates.
- **Comments & File Sharing** – Collaborate through task comments and attachments.
- **Search, Filter & Sort** – Quickly find tasks based on status, priority, user, or deadline.
- **Activity & Progress History** – Maintain a record of task updates and team activities.
- **Responsive & Secure Design** – Mobile-friendly interface with secure data handling.
- **Reports & Performance Tracking** – Generate project and team performance reports.
