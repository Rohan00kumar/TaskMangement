/**
 * TaskFlow Application JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Variables ---
    let token = localStorage.getItem('task_token') || null;
    let currentUser = JSON.parse(localStorage.getItem('task_user') || 'null');
    let tasks = [];
    let projects = [];
    let users = [];

    let activeTab = 'tasks'; // 'tasks', 'projects', 'team'
    let activeStatusFilter = 'all';
    let activePriorityFilter = 'all';
    let activeProjectFilter = 'all';
    let searchQuery = '';
    let currentView = 'board'; // 'board' or 'list'

    // --- DOM Elements ---
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    
    // Auth
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabRegisterBtn = document.getElementById('tab-register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const displayUsername = document.getElementById('display-username');
    const displayRole = document.getElementById('display-role');
    const userAvatar = document.getElementById('user-avatar');
    const logoutBtn = document.getElementById('logout-btn');

    // Controls & Navigation
    const navTabs = document.querySelectorAll('.nav-tab');
    const filterItems = document.querySelectorAll('.filter-item');
    const tabViewTasks = document.getElementById('tab-view-tasks');
    const tabViewProjects = document.getElementById('tab-view-projects');
    const tabViewTeam = document.getElementById('tab-view-team');

    const searchInput = document.getElementById('search-input');
    const priorityFilter = document.getElementById('priority-filter');
    const projectFilter = document.getElementById('project-filter');
    const viewBoardBtn = document.getElementById('view-board-btn');
    const viewListBtn = document.getElementById('view-list-btn');

    // Views
    const kanbanView = document.getElementById('kanban-view');
    const listView = document.getElementById('list-view');
    const listPending = document.getElementById('list-pending');
    const listInProgress = document.getElementById('list-in_progress');
    const listCompleted = document.getElementById('list-completed');
    const tableBody = document.getElementById('table-body');
    const tableEmptyState = document.getElementById('table-empty-state');
    const projectsGrid = document.getElementById('projects-grid');
    const teamGrid = document.getElementById('team-grid');

    // Stats Counters
    const statTotal = document.getElementById('stat-total');
    const statPending = document.getElementById('stat-pending');
    const statInProgress = document.getElementById('stat-in-progress');
    const statCompleted = document.getElementById('stat-completed');
    const countAll = document.getElementById('count-all');
    const countPending = document.getElementById('count-pending');
    const countInProgress = document.getElementById('count-in_progress');
    const countCompleted = document.getElementById('count-completed');
    const countProjects = document.getElementById('count-projects');
    const countTeam = document.getElementById('count-team');
    const kanbanCountPending = document.getElementById('kanban-count-pending');
    const kanbanCountInProgress = document.getElementById('kanban-count-in_progress');
    const kanbanCountCompleted = document.getElementById('kanban-count-completed');

    // Task Modal
    const taskModal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('modal-title');
    const openCreateModalBtn = document.getElementById('open-create-modal');
    const closeTaskModalBtn = document.getElementById('close-task-modal');
    const cancelTaskBtn = document.getElementById('cancel-task-btn');
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const taskStatusSelect = document.getElementById('task-status');
    const taskPrioritySelect = document.getElementById('task-priority');
    const taskProjectSelect = document.getElementById('task-project');
    const taskAssigneeSelect = document.getElementById('task-assignee');
    const taskDueDateInput = document.getElementById('task-due-date');

    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const openCreateProjectModalBtn = document.getElementById('open-create-project-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const cancelProjectBtn = document.getElementById('cancel-project-btn');
    const projectForm = document.getElementById('project-form');

    // Comments Modal
    const commentsModal = document.getElementById('comments-modal');
    const closeCommentsModalBtn = document.getElementById('close-comments-modal');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const commentTaskIdInput = document.getElementById('comment-task-id');
    const commentContentInput = document.getElementById('comment-content');

    const toastContainer = document.getElementById('toast-container');

    init();

    function init() {
        if (token && currentUser) {
            showDashboard();
        } else {
            showAuth();
        }
        setupEventListeners();
    }

    function showAuth() {
        authSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }

    function showDashboard() {
        authSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        if (currentUser) {
            displayUsername.textContent = currentUser.username;
            displayRole.textContent = currentUser.role || 'Member';
            userAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
        }
        loadInitialData();
    }

    async function loadInitialData() {
        await Promise.all([fetchProjects(), fetchUsers(), fetchTasks()]);
    }

    function setupEventListeners() {
        // Tab switching in Auth
        tabLoginBtn.addEventListener('click', () => {
            tabLoginBtn.classList.add('active');
            tabRegisterBtn.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        tabRegisterBtn.addEventListener('click', () => {
            tabRegisterBtn.classList.add('active');
            tabLoginBtn.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });

        loginForm.addEventListener('submit', handleLogin);
        registerForm.addEventListener('submit', handleRegister);
        logoutBtn.addEventListener('click', handleLogout);

        // Sidebar Navigation
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeTab = tab.getAttribute('data-tab');
                switchMainTab(activeTab);
            });
        });

        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                filterItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                activeStatusFilter = item.getAttribute('data-filter-status');
                fetchTasks();
            });
        });

        priorityFilter.addEventListener('change', (e) => {
            activePriorityFilter = e.target.value;
            fetchTasks();
        });

        projectFilter.addEventListener('change', (e) => {
            activeProjectFilter = e.target.value;
            fetchTasks();
        });

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchQuery = e.target.value.trim();
                fetchTasks();
            }, 300);
        });

        viewBoardBtn.addEventListener('click', () => {
            currentView = 'board';
            viewBoardBtn.classList.add('active');
            viewListBtn.classList.remove('active');
            kanbanView.classList.remove('hidden');
            listView.classList.add('hidden');
            renderTasksView();
        });

        viewListBtn.addEventListener('click', () => {
            currentView = 'list';
            viewListBtn.classList.add('active');
            viewBoardBtn.classList.remove('active');
            listView.classList.remove('hidden');
            kanbanView.classList.add('hidden');
            renderTasksView();
        });

        // Modals
        openCreateModalBtn.addEventListener('click', () => openTaskModal());
        closeTaskModalBtn.addEventListener('click', closeTaskModal);
        cancelTaskBtn.addEventListener('click', closeTaskModal);
        taskForm.addEventListener('submit', handleTaskSubmit);

        openCreateProjectModalBtn.addEventListener('click', openProjectModal);
        closeProjectModalBtn.addEventListener('click', closeProjectModal);
        cancelProjectBtn.addEventListener('click', closeProjectModal);
        projectForm.addEventListener('submit', handleProjectSubmit);

        closeCommentsModalBtn.addEventListener('click', closeCommentsModal);
        commentForm.addEventListener('submit', handleCommentSubmit);
    }

    function switchMainTab(tab) {
        tabViewTasks.classList.add('hidden');
        tabViewProjects.classList.add('hidden');
        tabViewTeam.classList.add('hidden');

        if (tab === 'tasks') {
            tabViewTasks.classList.remove('hidden');
            fetchTasks();
        } else if (tab === 'projects') {
            tabViewProjects.classList.remove('hidden');
            renderProjectsView();
        } else if (tab === 'team') {
            tabViewTeam.classList.remove('hidden');
            renderTeamView();
        }
    }

    // --- Auth API ---

    async function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok) {
                token = data.access_token;
                currentUser = data.user;
                localStorage.setItem('task_token', token);
                localStorage.setItem('task_user', JSON.stringify(currentUser));
                showToast(`Welcome back, ${currentUser.username}!`, 'success');
                showDashboard();
            } else {
                showToast(data.error || 'Login failed', 'error');
            }
        } catch (err) {
            showToast('Network error during login', 'error');
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const role = document.getElementById('reg-role').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role })
            });
            const data = await response.json();

            if (response.ok) {
                showToast('Registration successful! Please log in.', 'success');
                tabLoginBtn.click();
                document.getElementById('login-username').value = username;
            } else {
                showToast(data.error || 'Registration failed', 'error');
            }
        } catch (err) {
            showToast('Network error during registration', 'error');
        }
    }

    function handleLogout() {
        token = null;
        currentUser = null;
        localStorage.removeItem('task_token');
        localStorage.removeItem('task_user');
        showToast('Logged out successfully', 'info');
        showAuth();
    }

    // --- Projects API & Rendering ---

    async function fetchProjects() {
        if (!token) return;
        try {
            const response = await fetch('/api/projects', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                projects = await response.json();
                countProjects.textContent = projects.length;
                populateProjectDropdowns();
                if (activeTab === 'projects') renderProjectsView();
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    }

    function populateProjectDropdowns() {
        taskProjectSelect.innerHTML = '<option value="">(None)</option>';
        projectFilter.innerHTML = '<option value="all">All Projects</option>';

        projects.forEach(p => {
            const opt1 = document.createElement('option');
            opt1.value = p.id;
            opt1.textContent = p.name;
            taskProjectSelect.appendChild(opt1);

            const opt2 = document.createElement('option');
            opt2.value = p.id;
            opt2.textContent = p.name;
            projectFilter.appendChild(opt2);
        });
    }

    async function handleProjectSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('project-name').value.trim();
        const description = document.getElementById('project-desc').value.trim();

        if (!name) return;

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, description })
            });

            if (response.ok) {
                showToast('Project created!', 'success');
                closeProjectModal();
                fetchProjects();
            } else {
                const data = await response.json();
                showToast(data.error || 'Failed to create project', 'error');
            }
        } catch (err) {
            showToast('Error creating project', 'error');
        }
    }

    function renderProjectsView() {
        projectsGrid.innerHTML = '';
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-folder-open"></i>
                    <p>No projects found. Click "New Project" to create one.</p>
                </div>
            `;
            return;
        }

        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card glass-panel';
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-icon"><i class="fa-solid fa-folder-closed"></i></div>
                    <div>
                        <h3>${escapeHtml(p.name)}</h3>
                        <span class="card-date">Owner: ${escapeHtml(p.owner_username || 'Admin')}</span>
                    </div>
                </div>
                ${p.description ? `<p class="task-desc">${escapeHtml(p.description)}</p>` : ''}
                <div class="card-footer">
                    <span class="badge badge-info"><i class="fa-solid fa-list-check"></i> ${p.task_count} Tasks</span>
                    <button class="action-btn filter-project-btn" title="View Project Tasks"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            `;

            card.querySelector('.filter-project-btn').addEventListener('click', () => {
                activeProjectFilter = p.id;
                projectFilter.value = p.id;
                navTabs[0].click(); // Switch to tasks tab
            });

            projectsGrid.appendChild(card);
        });
    }

    // --- Users / Team API & Rendering ---

    async function fetchUsers() {
        if (!token) return;
        try {
            const response = await fetch('/api/auth/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                users = await response.json();
                countTeam.textContent = users.length;
                populateUserDropdown();
                if (activeTab === 'team') renderTeamView();
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    }

    function populateUserDropdown() {
        taskAssigneeSelect.innerHTML = '<option value="">Unassigned</option>';
        users.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = `${u.username} (${u.role})`;
            taskAssigneeSelect.appendChild(opt);
        });
    }

    function renderTeamView() {
        teamGrid.innerHTML = '';
        users.forEach(u => {
            const card = document.createElement('div');
            card.className = 'team-card glass-panel';
            card.innerHTML = `
                <div class="team-avatar">${u.username.charAt(0).toUpperCase()}</div>
                <h3>${escapeHtml(u.username)}</h3>
                <span class="badge badge-role">${u.role || 'Member'}</span>
                <span class="card-date">${escapeHtml(u.email)}</span>
            `;
            teamGrid.appendChild(card);
        });
    }

    // --- Tasks API & Rendering ---

    async function fetchTasks() {
        if (!token) return;

        let url = '/api/tasks?per_page=100';
        if (activeStatusFilter !== 'all') url += `&status=${activeStatusFilter}`;
        if (activePriorityFilter !== 'all') url += `&priority=${activePriorityFilter}`;
        if (activeProjectFilter !== 'all') url += `&project_id=${activeProjectFilter}`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();
            if (response.ok) {
                tasks = data.tasks || [];
                updateStats();
                renderTasksView();
            }
        } catch (err) {
            showToast('Error fetching tasks', 'error');
        }
    }

    async function handleTaskSubmit(e) {
        e.preventDefault();
        const id = taskIdInput.value;
        const title = taskTitleInput.value.trim();
        const description = taskDescInput.value.trim();
        const status = taskStatusSelect.value;
        const priority = taskPrioritySelect.value;
        const project_id = taskProjectSelect.value ? parseInt(taskProjectSelect.value) : null;
        const assigned_to_id = taskAssigneeSelect.value ? parseInt(taskAssigneeSelect.value) : null;
        const due_date = taskDueDateInput.value || null;

        if (!title) return;

        const payload = { title, description, status, priority, project_id, assigned_to_id, due_date };
        const url = id ? `/api/tasks/${id}` : '/api/tasks';
        const method = id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showToast(id ? 'Task updated!' : 'Task created!', 'success');
                closeTaskModal();
                fetchTasks();
                fetchProjects();
            } else {
                const data = await response.json();
                showToast(data.error || 'Failed to save task', 'error');
            }
        } catch (err) {
            showToast('Error saving task', 'error');
        }
    }

    async function updateTaskStatus(id, newStatus) {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                showToast('Status updated', 'success');
                fetchTasks();
            }
        } catch (err) {
            showToast('Error updating status', 'error');
        }
    }

    async function deleteTask(id) {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                showToast('Task deleted', 'info');
                fetchTasks();
                fetchProjects();
            }
        } catch (err) {
            showToast('Error deleting task', 'error');
        }
    }

    function renderTasksView() {
        if (currentView === 'board') renderKanbanBoard();
        else renderListView();
    }

    function renderKanbanBoard() {
        listPending.innerHTML = '';
        listInProgress.innerHTML = '';
        listCompleted.innerHTML = '';

        let pCount = 0, ipCount = 0, cCount = 0;

        tasks.forEach(task => {
            const card = createKanbanCard(task);
            if (task.status === 'pending') {
                listPending.appendChild(card);
                pCount++;
            } else if (task.status === 'in_progress') {
                listInProgress.appendChild(card);
                ipCount++;
            } else if (task.status === 'completed') {
                listCompleted.appendChild(card);
                cCount++;
            }
        });

        kanbanCountPending.textContent = pCount;
        kanbanCountInProgress.textContent = ipCount;
        kanbanCountCompleted.textContent = cCount;
    }

    function createKanbanCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';

        const dueDateFormatted = task.due_date ? new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null;

        card.innerHTML = `
            <div class="card-top">
                <span class="task-title">${escapeHtml(task.title)}</span>
                <span class="priority-tag priority-${task.priority}">${task.priority}</span>
            </div>
            ${task.description ? `<p class="task-desc">${escapeHtml(task.description)}</p>` : ''}
            
            <div class="card-meta-row">
                ${task.project_name ? `<span class="project-chip"><i class="fa-solid fa-folder"></i> ${escapeHtml(task.project_name)}</span>` : ''}
                ${task.assignee_username ? `<span class="assignee-chip"><i class="fa-regular fa-user"></i> ${escapeHtml(task.assignee_username)}</span>` : ''}
                ${dueDateFormatted ? `<span class="due-chip"><i class="fa-regular fa-calendar"></i> ${dueDateFormatted}</span>` : ''}
            </div>

            <div class="card-footer">
                <button class="action-btn comment-btn" title="Comments (${task.comment_count})"><i class="fa-regular fa-comments"></i> ${task.comment_count}</button>
                <div class="card-actions">
                    ${getStatusMoveButtons(task)}
                    <button class="action-btn edit-btn" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="action-btn delete delete-btn" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        `;

        card.querySelector('.edit-btn').addEventListener('click', () => openTaskModal(task));
        card.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
        card.querySelector('.comment-btn').addEventListener('click', () => openCommentsModal(task.id, task.title));

        card.querySelectorAll('.move-btn').forEach(btn => {
            btn.addEventListener('click', () => updateTaskStatus(task.id, btn.getAttribute('data-status')));
        });

        return card;
    }

    function getStatusMoveButtons(task) {
        let btns = '';
        if (task.status !== 'pending') btns += `<button class="action-btn move-btn" data-status="pending" title="Move to Pending"><i class="fa-solid fa-arrow-left"></i></button>`;
        if (task.status !== 'in_progress') btns += `<button class="action-btn move-btn" data-status="in_progress" title="Move to In Progress"><i class="fa-solid fa-arrows-rotate"></i></button>`;
        if (task.status !== 'completed') btns += `<button class="action-btn move-btn" data-status="completed" title="Move to Completed"><i class="fa-solid fa-check"></i></button>`;
        return btns;
    }

    function renderListView() {
        tableBody.innerHTML = '';
        if (tasks.length === 0) {
            tableEmptyState.classList.remove('hidden');
            return;
        }
        tableEmptyState.classList.add('hidden');

        tasks.forEach(task => {
            const tr = document.createElement('tr');
            const dueDateFormatted = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A';

            tr.innerHTML = `
                <td>
                    <strong>${escapeHtml(task.title)}</strong>
                    ${task.description ? `<br><small class="text-muted">${escapeHtml(task.description)}</small>` : ''}
                </td>
                <td>${task.project_name ? `<span class="project-chip">${escapeHtml(task.project_name)}</span>` : '-'}</td>
                <td>${task.assignee_username ? `<span class="assignee-chip">${escapeHtml(task.assignee_username)}</span>` : '-'}</td>
                <td>${dueDateFormatted}</td>
                <td><span class="badge badge-${getBadgeClass(task.status)}">${formatStatus(task.status)}</span></td>
                <td><span class="priority-tag priority-${task.priority}">${task.priority}</span></td>
                <td class="text-right">
                    <button class="action-btn comment-btn" title="Comments"><i class="fa-regular fa-comments"></i> ${task.comment_count}</button>
                    <button class="action-btn edit-btn" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="action-btn delete delete-btn" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            `;

            tr.querySelector('.edit-btn').addEventListener('click', () => openTaskModal(task));
            tr.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
            tr.querySelector('.comment-btn').addEventListener('click', () => openCommentsModal(task.id, task.title));
            tableBody.appendChild(tr);
        });
    }

    // --- Comments Modal ---

    async function openCommentsModal(taskId, title) {
        commentTaskIdInput.value = taskId;
        document.getElementById('comments-modal-title').innerHTML = `<i class="fa-regular fa-comments"></i> Comments: ${escapeHtml(title)}`;
        commentsModal.classList.remove('hidden');
        fetchComments(taskId);
    }

    function closeCommentsModal() {
        commentsModal.classList.add('hidden');
        commentsList.innerHTML = '';
        commentForm.reset();
    }

    async function fetchComments(taskId) {
        try {
            const response = await fetch(`/api/tasks/${taskId}/comments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const comments = await response.json();
                renderComments(comments);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    }

    function renderComments(comments) {
        commentsList.innerHTML = '';
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="text-muted">No comments yet. Be the first to comment!</p>';
            return;
        }

        comments.forEach(c => {
            const timeFormatted = new Date(c.created_at).toLocaleString();
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `
                <div class="comment-author">${escapeHtml(c.author_username || 'User')}</div>
                <div class="comment-text">${escapeHtml(c.content)}</div>
                <div class="comment-time">${timeFormatted}</div>
            `;
            commentsList.appendChild(div);
        });
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        const taskId = commentTaskIdInput.value;
        const content = commentContentInput.value.trim();
        if (!content || !taskId) return;

        try {
            const response = await fetch(`/api/tasks/${taskId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            });

            if (response.ok) {
                commentContentInput.value = '';
                fetchComments(taskId);
                fetchTasks(); // refresh comment counts
            }
        } catch (err) {
            showToast('Error posting comment', 'error');
        }
    }

    // --- Helpers & Modals ---

    function openTaskModal(task = null) {
        if (task) {
            modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Task`;
            taskIdInput.value = task.id;
            taskTitleInput.value = task.title;
            taskDescInput.value = task.description || '';
            taskStatusSelect.value = task.status;
            taskPrioritySelect.value = task.priority;
            taskProjectSelect.value = task.project_id || '';
            taskAssigneeSelect.value = task.assigned_to_id || '';
            taskDueDateInput.value = task.due_date ? task.due_date.split('T')[0] : '';
        } else {
            modalTitle.innerHTML = `<i class="fa-solid fa-plus"></i> Create New Task`;
            taskForm.reset();
            taskIdInput.value = '';
        }
        taskModal.classList.remove('hidden');
    }

    function closeTaskModal() {
        taskModal.classList.add('hidden');
        taskForm.reset();
    }

    function openProjectModal() { projectModal.classList.remove('hidden'); }
    function closeProjectModal() { projectModal.classList.add('hidden'); projectForm.reset(); }

    function updateStats() {
        const total = tasks.length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const completed = tasks.filter(t => t.status === 'completed').length;

        statTotal.textContent = total;
        statPending.textContent = pending;
        statInProgress.textContent = inProgress;
        statCompleted.textContent = completed;

        countAll.textContent = total;
        countPending.textContent = pending;
        countInProgress.textContent = inProgress;
        countCompleted.textContent = completed;
    }

    function getBadgeClass(status) {
        if (status === 'completed') return 'success';
        if (status === 'in_progress') return 'info';
        return 'warning';
    }

    function formatStatus(status) {
        if (status === 'in_progress') return 'In Progress';
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = 'fa-circle-info';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'error') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
});
