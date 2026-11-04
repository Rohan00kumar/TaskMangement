import React from 'react';
import {
  LayoutDashboard,
  Target,
  BarChart3,
  GraduationCap,
  BookOpen,
  Settings,
  Plus,
  X
} from 'lucide-react';

function PathFlowLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pfGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B78FF" />
          <stop offset="100%" stopColor="#6C5DD3" />
        </linearGradient>
        <linearGradient id="pfGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3DD598" />
          <stop offset="100%" stopColor="#00C5FF" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#pfGradPrimary)" />
      <path
        d="M10 25C10 18.5 14.5 13.5 21 13.5C27 13.5 29.5 18 26.5 22C23.5 26 16.5 25.5 14.5 21.5"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27" cy="14" r="3.2" fill="url(#pfGradCyan)" />
      <circle cx="12" cy="26" r="2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
  examsCount,
  projectsCount,
  coursesCount,
  trackingCount,
  onOpenAddTask,
  isOpenMobile,
  onCloseMobile
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exams', label: 'Exams', icon: GraduationCap, badge: examsCount },
    { id: 'projects', label: 'Projects', icon: BarChart3, badge: projectsCount },
    { id: 'courses', label: 'Courses & Skills', icon: BookOpen, badge: coursesCount },
    { id: 'tracking', label: 'Schedule', icon: Target, badge: trackingCount },
  ];

  return (
    <>
      {isOpenMobile && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}
      <aside className={`sidebar ${isOpenMobile ? 'open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrap" style={{ flexShrink: 0 }}>
            <PathFlowLogo size={36} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-name">{user?.brandName || 'PathFlow'}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
              CAREER & EXAM OS
            </span>
          </div>
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              title="Close Menu"
            >
              <X size={20} color="#808191" />
            </button>
          )}
        </div>

        {/* Workspaces Label */}
        <div className="sidebar-section-label">MAIN WORKSPACES</div>

        {/* Primary Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`nav-badge ${item.id === 'exams' ? 'accent' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: Add Item and User Card */}
        <div className="sidebar-bottom">
          <button
            className="btn-add-task-card"
            onClick={onOpenAddTask}
            title="Add Target Exam, Project, Course or Milestone"
          >
            <div className="plus-circle">
              <Plus size={16} strokeWidth={2.5} />
            </div>
            <span>Add Item</span>
          </button>

          <div
            className={`sidebar-user-card ${activeTab === 'settings' ? 'active-card' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              if (onCloseMobile) onCloseMobile();
            }}
            title="Workspace Settings & Backups"
          >
            <div className="user-card-content">
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7F70F1 0%, #6C5DD3 100%)',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {user?.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Student / Builder'}</span>
                <span className="user-role">{user?.role || 'Personal Workspace'}</span>
              </div>
            </div>
            <Settings size={15} color="#808191" />
          </div>
        </div>
      </aside>
    </>
  );
}
