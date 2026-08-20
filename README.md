# TaskFlow — Enterprise Task & Project Management System

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Framework-Flask%203.1-green.svg)](https://flask.palletsprojects.com/)
[![Database](https://img.shields.io/badge/Database-SQLite%2FSQLAlchemy-orange.svg)](https://www.sqlalchemy.org/)
[![Auth](https://img.shields.io/badge/Auth-JWT%20(Flask--JWT--Extended)-red.svg)](https://flask-jwt-extended.readthedocs.io/)
[![Deployment](https://img.shields.io/badge/Deploy-Render.com-black.svg)](https://render.com/)

**TaskFlow** is a modern, high-performance, full-stack Task & Project Management application. Built with a robust **Flask REST API** backend and a responsive, dynamic **Single Page Application (SPA)** frontend featuring glassmorphism dark-mode UI.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [Tech Stack & Use Cases](#-tech-stack--use-cases)
3. [System Architecture](#-system-architecture)
4. [Database Schema](#-database-schema)
5. [Directory & File Structure](#-directory--file-structure)
6. [API Endpoints Reference](#-api-endpoints-reference)
7. [Local Setup & Installation](#-local-setup--installation)
8. [Running Automated Tests](#-running-automated-tests)
9. [Deployment (Render.com)](#-deployment-rendercom)

---

## ✨ Key Features

- 🔐 **Secure Authentication**: JWT-based user registration, login, and session persistence with password hashing (Bcrypt/Werkzeug).
- 📁 **Project Workspace**: Create, update, and manage team projects with priority levels, status tracking, and member assignments.
- 📝 **Task Management**: Full task CRUD with status workflows (`pending`, `in_progress`, `completed`), priority tagging (`low`, `medium`, `high`), and due dates.
- 🔍 **Search, Filtering & Pagination**: Filter tasks by project, status, priority, or free-text title search with built-in API pagination.
- 📊 **Real-time Analytics Dashboard**: Summary metrics for total projects, pending tasks, completed tasks, and completion percentages.
- 🎨 **Modern Dark UI**: Premium glassmorphism styling, responsive layouts, interactive modals, and real-time DOM updates.
- 🚀 **Production Ready**: Configured for instant cloud deployment on Render with Gunicorn WSGI server.

---

## 🛠️ Tech Stack & Use Cases

| Technology | Layer | Primary Use Case & Role |
| :--- | :--- | :--- |
| **Python 3.9+** | Core Language | Business logic, backend execution environment, and script automation. |
| **Flask 3.1** | Web Framework | Lightweight RESTful Web Server API routing, request handling, and app factory. |
| **Flask-SQLAlchemy** | ORM Layer | Object-Relational Mapping to interact with database tables via Python classes (`User`, `Task`, `Project`, `Comment`). |
| **Flask-JWT-Extended** | Security / Auth | Generates, verifies, and decodes JSON Web Tokens (`Authorization: Bearer <token>`) for stateless endpoint protection. |
| **Flask-CORS** | Security | Handles Cross-Origin Resource Sharing (CORS) headers for secure frontend-backend communication. |
| **Werkzeug** | Security / Utilities | Password hashing (`generate_password_hash`, `check_password_hash`) and WSGI utilities. |
| **Gunicorn 23.0** | WSGI Production Server | Pre-fork worker server used in production (Render) to serve concurrent HTTP requests. |
| **SQLite / PostgreSQL** | Database | SQLite for zero-config local development; drop-in compatible with PostgreSQL for production. |
| **Vanilla HTML5 & CSS3** | Frontend Presentation | Semantic HTML, CSS variables, Flexbox/Grid layout, animations, and custom dark glassmorphism theme. |
| **Vanilla JavaScript (ES6+)** | Frontend Logic | Single Page Application state management, fetch API requests, JWT storage, DOM manipulation, and dynamic modal dialogs. |
| **Pytest 8.x** | Automated Testing | Comprehensive unit and integration testing suite for auth, task isolation, and permissions. |

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER (Browser)                        │
│                                                                        │
│   Single Page Application (index.html + style.css + app.js)            │
│   - Auth Views (Login / Register)                                      │
│   - Dashboard Analytics UI                                             │
│   - Task & Project Modals                                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         HTTP / REST (JSON API)
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        BACKEND LAYER (Flask API)                       │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ app.py (App Factory & Top-level Server Entrypoint)             │   │
│   └───────────────┬────────────────────────────────┬───────────────┘   │
│                   │                                │                   │
│         ┌─────────▼─────────┐            ┌─────────▼─────────┐         │
│         │  Blueprint Routes │            │  Security / Auth  │         │
│         │  - /api/auth      │            │  - JWT Verification│         │
│         │  - /api/tasks     │            │  - Password Hashing│         │
│         │  - /api/projects  │            └───────────────────┘         │
│         └─────────┬─────────┘                                          │
└───────────────────┼────────────────────────────────────────────────────┘
                    │ SQLAlchemy ORM
┌───────────────────▼────────────────────────────────────────────────────┐
│                        DATABASE LAYER (SQLite)                         │
│                                                                        │
│   Tables: users ◄──► projects ◄──► tasks ◄──► comments                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

```text
  ┌─────────────────┐       1:N       ┌─────────────────┐
  │     users       │─────────────────│    projects     │
  ├─────────────────┤                 ├─────────────────┤
  │ id (PK)         │                 │ id (PK)         │
  │ username        │                 │ name            │
  │ email           │                 │ description     │
  │ password_hash   │                 │ created_by (FK) │
  │ created_at      │                 │ created_at      │
  └────────┬────────┘                 └────────┬────────┘
           │                                   │
           │ 1:N                               │ 1:N
           ▼                                   ▼
  ┌─────────────────────────────────────────────────────┐
  │                        tasks                        │
  ├─────────────────────────────────────────────────────┤
  │ id (PK)                                             │
  │ title, description                                  │
  │ status ('pending' | 'in_progress' | 'completed')    │
  │ priority ('low' | 'medium' | 'high')                │
  │ user_id (FK -> users.id)                            │
  │ project_id (FK -> projects.id)                      │
  │ due_date, created_at, updated_at                    │
  └──────────────────────────┬──────────────────────────┘
                             │ 1:N
                             ▼
                  ┌────────────────────┐
                  │      comments      │
                  ├────────────────────┤
                  │ id (PK)            │
                  │ content            │
                  │ task_id (FK)       │
                  │ user_id (FK)       │
                  │ created_at         │
                  └────────────────────┘
```

---

## 📁 Directory & File Structure

```text
TaskMangement/
├── app.py              # Application Factory (create_app), routes, error handlers, entrypoint
├── auth.py             # Authentication Blueprint (/api/auth: register, login, profile)
├── tasks.py            # Tasks Blueprint (/api/tasks: CRUD, search, filter, paginate)
├── projects.py         # Projects Blueprint (/api/projects: CRUD, project members)
├── models.py           # SQLAlchemy database models (User, Project, Task, Comment)
├── config.py           # Configuration classes (Development, Testing, Production)
├── requirements.txt    # Python dependencies list for environment & deployment
├── render.yaml         # Render Cloud Blueprint specification for deployment
├── README.md           # System documentation
│
├── static/             # Static frontend assets
│   ├── css/
│   │   └── style.css   # Dark glassmorphism layout, animations, responsive design
│   └── js/
│       └── app.js      # SPA logic, JWT token management, API requests, dynamic DOM
│
├── templates/          # HTML templates
│   └── index.html      # Main Single Page Application shell HTML
│
└── tests/              # Automated Test Suite
    └── test_tasks.py   # Pytest suite covering auth, task CRUD, isolation, and endpoints
```

### Detailed File Descriptions

- **`app.py`**: Initializes the Flask app factory (`create_app`), configures CORS, initializes SQLAlchemy and JWT extensions, registers feature blueprints, and exposes the top-level `app` object for Gunicorn WSGI server.
- **`auth.py`**: Defines authentication routes (`/register`, `/login`, `/me`). Handles input validation, password hashing verification, and JWT access token issuance.
- **`tasks.py`**: Manages all task operations. Enforces user data isolation so users can only access their own tasks.
- **`projects.py`**: Handles project creation, list retrieval, updating, deletion, and task association.
- **`models.py`**: Contains SQLAlchemy ORM classes (`User`, `Task`, `Project`, `Comment`) with relationship bindings and `to_dict()` serialization helpers.
- **`config.py`**: Sets up base configuration environment variables like `SECRET_KEY`, `JWT_SECRET_KEY`, and `SQLALCHEMY_DATABASE_URI`.
- **`render.yaml`**: Infrastructure-as-code deployment descriptor for Render.

---

## 📡 API Endpoints Reference

### 1. Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | `{"username", "email", "password"}` | Register a new user account |
| `POST` | `/api/auth/login` | `{"username", "password"}` | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | *Header: Bearer Token* | Retrieve current user profile |

### 2. Task Endpoints (`/api/tasks`)
*All task endpoints require `Authorization: Bearer <access_token>` header.*

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | `status`, `priority`, `search`, `page`, `per_page` | List & filter user tasks with pagination |
| `POST` | `/api/tasks` | Body: `{"title", "description", "status", "priority", "project_id"}` | Create a new task |
| `GET` | `/api/tasks/<id>` | — | Fetch details of a specific task |
| `PUT` | `/api/tasks/<id>` | Body: `{"title", "status", "priority", ...}` | Update an existing task |
| `DELETE` | `/api/tasks/<id>` | — | Delete a task |

### 3. Project Endpoints (`/api/projects`)
*All project endpoints require `Authorization: Bearer <access_token>` header.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | List all projects created by user |
| `POST` | `/api/projects` | Create a new project |
| `GET` | `/api/projects/<id>` | Retrieve project details & associated tasks |
| `PUT` | `/api/projects/<id>` | Update project details |
| `DELETE` | `/api/projects/<id>` | Delete project |

### 4. System Health (`/api/health`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check (`{"status": "ok"}`) |

---

## 💻 Local Setup & Installation

### Prerequisites
- Python 3.9 or higher
- Git

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rohan00kumar/TaskMangement.git
   cd TaskMangement
   ```

2. **Create and Activate a Virtual Environment**
   - **Windows (PowerShell):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**
   ```bash
   python app.py
   ```

5. **Access the Web Interface**
   Open your browser and navigate to: `http://127.0.0.1:5000`

---

## 🧪 Running Automated Tests

The codebase includes an extensive **Pytest** suite covering authentication, task creation, data isolation between users, and API endpoints.

To run all automated tests:

```bash
pytest tests/ -v
```

---

## ☁️ Deployment (Render.com)

This repository includes a pre-configured [`render.yaml`](file:///d:/My%20Projects/ILP/TaskMangement/render.yaml) blueprint file.

### Instant Blueprint Deployment
1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** $\rightarrow$ **Blueprint**.
3. Connect your GitHub repository (`Rohan00kumar/TaskMangement`).
4. Render will automatically detect `render.yaml` and configure:
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. Click **Apply**. Your app will be deployed and assigned a live URL!

---

## 📄 License

This project is open-source under the MIT License.
