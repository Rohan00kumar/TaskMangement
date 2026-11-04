import React from 'react';
import { GraduationCap, Code2, Plus } from 'lucide-react';

export default function HeroBanner({ onAddExam, onAddProject }) {
  return (
    <div className="hero-welcome-banner">
      <div className="hero-banner-content">
        <span className="hero-tag">OVERVIEW</span>
        <h2 className="hero-title">Workspace Dashboard</h2>
        <p className="hero-desc">
          Manage target exams, software builds, and focus milestones in one focused view.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
          <button
            type="button"
            className="hero-btn"
            onClick={onAddExam}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GraduationCap size={15} />
            <span>Add Exam</span>
          </button>
          <button
            type="button"
            className="hero-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-card)',
              color: 'var(--primary)',
              border: '1px solid var(--border)'
            }}
            onClick={onAddProject}
          >
            <Code2 size={15} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div className="hero-banner-illustration">
        <svg
          width="240"
          height="135"
          viewBox="0 0 260 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Calendar Board */}
          <rect x="75" y="15" width="135" height="105" rx="10" fill="#EBF9FC" stroke="#BFEAF2" strokeWidth="2" />
          
          {/* Calendar Header / Top bar */}
          <rect x="75" y="15" width="135" height="24" rx="10" fill="#5DCAE0" />
          <circle cx="90" cy="27" r="3.5" fill="#FFFFFF" />
          <circle cx="102" cy="27" r="3.5" fill="#FFFFFF" />
          <circle cx="114" cy="27" r="3.5" fill="#FFFFFF" />

          {/* Calendar Cells */}
          <rect x="85" y="47" width="18" height="15" rx="3" fill="#D7F3F8" />
          <rect x="108" y="47" width="18" height="15" rx="3" fill="#FFEAE5" />
          <rect x="131" y="47" width="18" height="15" rx="3" fill="#ECEBFE" />
          <rect x="154" y="47" width="18" height="15" rx="3" fill="#20C978" />
          <path d="M158 54.5L161.5 58L168 51.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="85" y="68" width="18" height="15" rx="3" fill="#ECEBFE" />
          <rect x="108" y="68" width="18" height="15" rx="3" fill="#6C5DD3" />
          <rect x="131" y="68" width="18" height="15" rx="3" fill="#D7F3F8" />
          <rect x="154" y="68" width="18" height="15" rx="3" fill="#FFEAE5" />

          <rect x="85" y="89" width="18" height="15" rx="3" fill="#D7F3F8" />
          <rect x="108" y="89" width="18" height="15" rx="3" fill="#ECEBFE" />
          <rect x="131" y="89" width="18" height="15" rx="3" fill="#6C5DD3" />
          <rect x="154" y="89" width="18" height="15" rx="3" fill="#D7F3F8" />

          {/* Foreground Character & Checklist */}
          <rect x="25" y="40" width="55" height="75" rx="8" fill="#FFFFFF" stroke="#EDEDF5" strokeWidth="2" />
          <circle cx="40" cy="55" r="4" fill="#20C978" />
          <line x1="48" y1="55" x2="70" y2="55" stroke="#11142D" strokeWidth="2.5" strokeLinecap="round" />
          
          <circle cx="40" cy="72" r="4" fill="#6C5DD3" />
          <line x1="48" y1="72" x2="68" y2="72" stroke="#808191" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="40" cy="89" r="4" fill="#FF754C" />
          <line x1="48" y1="89" x2="65" y2="89" stroke="#808191" strokeWidth="2.5" strokeLinecap="round" />

          {/* Accent Pen / Marker */}
          <rect x="195" y="60" width="14" height="42" rx="4" transform="rotate(-30 195 60)" fill="#6C5DD3" />
          <path d="M216 48L220 55L213 58Z" fill="#FF754C" />
        </svg>
      </div>
    </div>
  );
}
