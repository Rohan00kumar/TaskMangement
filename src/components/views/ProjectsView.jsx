import React, { useState } from 'react';
import { Plus, ExternalLink, Lightbulb, Rocket, Trash2, Code2, Globe } from 'lucide-react';

function GithubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ProjectsView({
  projects = [],
  onOpenAddProject,
  onDeleteProject
}) {
  const [activeType, setActiveType] = useState('current'); // "current" | "future_idea"
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Filter projects by type & domain
  const filtered = projects.filter((p) => {
    const matchesType = p.projectType === activeType;
    const matchesDomain =
      selectedDomain === 'All' || (p.domain || '').toLowerCase().includes(selectedDomain.toLowerCase());
    return matchesType && matchesDomain;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div className="view-header">
        <div className="view-title-wrap">
          <h2 className="view-main-title">Software Projects & Ideas Lab</h2>
          <p className="view-sub-desc">
            Manage your active portfolio applications, deployed SaaS systems, and future architectural ideas.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={onOpenAddProject}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          <span>+ Add Project / Idea</span>
        </button>
      </div>

      {/* Main Track Filter: Current vs Future Idea */}
      <div className="category-pills-row">
        <button
          type="button"
          className={`cat-nav-pill ${activeType === 'current' ? 'active' : ''}`}
          onClick={() => setActiveType('current')}
        >
          <Rocket size={14} />
          <span>Active Builds</span>
          <span className="cat-count-badge">
            {projects.filter((p) => p.projectType === 'current').length}
          </span>
        </button>

        <button
          type="button"
          className={`cat-nav-pill ${activeType === 'future_idea' ? 'active' : ''}`}
          onClick={() => setActiveType('future_idea')}
        >
          <Lightbulb size={14} />
          <span>Future Ideas Incubator</span>
          <span className="cat-count-badge">
            {projects.filter((p) => p.projectType === 'future_idea').length}
          </span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid-cards">
        {filtered.map((proj) => {
          const tags = (proj.techStack || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

          const isDeployed = proj.status === 'deployed' || proj.status === 'completed';

          return (
            <div key={proj.id} className="exam-card-pro">
              <div className="exam-card-pro-top">
                <span className="badge-tag tech">
                  {proj.domain || 'Full Stack'}
                </span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-arrow-btn"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={13} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-arrow-btn"
                      title="Live Demo Preview"
                      style={{ color: '#00C5FF' }}
                    >
                      <Globe size={13} />
                    </a>
                  )}
                  <button
                    type="button"
                    className="icon-arrow-btn"
                    onClick={() => onDeleteProject && onDeleteProject(proj.id)}
                    title="Delete Project"
                  >
                    <Trash2 size={13} color="#FF754C" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="exam-title-pro">{proj.title}</h3>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Difficulty: <b>{proj.difficulty || 'Intermediate'}</b>
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: isDeployed ? 'var(--pill-green-bg)' : 'var(--pill-purple-bg)',
                      color: isDeployed ? '#20C978' : 'var(--primary)',
                      textTransform: 'capitalize'
                    }}
                  >
                    ● {(proj.status || 'in_progress').replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Minimalist Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="minimal-topic-chip"
                    style={{ fontSize: '10.5px' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Minimalist Key Features */}
              {proj.keyFeatures && (
                <div style={{ fontSize: '11.5px', color: 'var(--text-dark)', background: 'var(--bg-card-subtle)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: '800', color: 'var(--text-muted)', fontSize: '9.5px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    ARCHITECTURAL HIGHLIGHTS
                  </span>
                  {proj.keyFeatures}
                </div>
              )}

              {proj.learningOutcomes && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Takeaway: {proj.learningOutcomes}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="exam-empty-box">
            {activeType === 'current' ? (
              <Rocket size={38} color="var(--primary)" />
            ) : (
              <Lightbulb size={38} color="var(--primary)" />
            )}
            <h3 style={{ fontSize: '15px', fontWeight: '800', marginTop: '10px' }}>
              No {activeType === 'current' ? 'active builds' : 'ideas in incubator'} yet
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Add full-stack architectures, algorithms, or tool projects to your portfolio.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={onOpenAddProject}
              style={{ marginTop: '14px' }}
            >
              + Add {activeType === 'current' ? 'Project' : 'Future Idea'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
