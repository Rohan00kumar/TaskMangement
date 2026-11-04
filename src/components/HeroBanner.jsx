import React from 'react';

export default function HeroBanner({ onAddExam, onAddProject }) {
  return (
    <div className="hero-welcome-banner">
      <div className="hero-banner-content">
        <p className="hero-tag" style={{ letterSpacing: '0.6px', fontWeight: '800' }}>CAREER & EXAM OPERATING SYSTEM</p>
        <h2 className="hero-title">PathFlow Intelligence Center</h2>
        <p className="hero-desc">
          Track competitive recruitment drives, full-stack software architectures, and time-blocked focus milestones in a unified workspace.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="hero-btn"
            onClick={onAddExam}
          >
            + Target Exam
          </button>
          <button
            type="button"
            className="hero-btn"
            style={{ background: 'var(--bg-card)', color: 'var(--primary)', border: '1px solid var(--border)' }}
            onClick={onAddProject}
          >
            + New Project
          </button>
        </div>
      </div>

      <div className="hero-banner-illustration">
        <svg
          width="260"
          height="145"
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
          <rect x="108" y="89" width="18" height="15" rx="3" fill="#D7F3F8" />
          <rect x="131" y="89" width="18" height="15" rx="3" fill="#20C978" />
          <path d="M135 96.5L138.5 100L145 93.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="154" y="89" width="18" height="15" rx="3" fill="#ECEBFE" />

          {/* Floating Sticky Note 1 */}
          <g filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.06))">
            <rect x="18" y="16" width="54" height="60" rx="6" fill="#FFFFFF" stroke="#EDEDF5" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="4.5" fill="#ECEBFE" />
            <path d="M26.5 28L28 29.5L30.5 27" stroke="#6C5DD3" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="28" x2="62" y2="28" stroke="#D1D2DE" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="28" cy="42" r="4.5" fill="#FFEAE5" />
            <line x1="38" y1="42" x2="58" y2="42" stroke="#D1D2DE" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="28" cy="56" r="4.5" fill="#E5F8ED" />
            <path d="M26.5 56L28 57.5L30.5 55" stroke="#20C978" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="56" x2="54" y2="56" stroke="#D1D2DE" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Floating Pill Status */}
          <rect x="180" y="24" width="62" height="18" rx="9" fill="#FFFFFF" stroke="#ECEBFE" strokeWidth="1.5" />
          <circle cx="189" cy="33" r="3.5" fill="#20C978" />
          <rect x="196" y="30.5" width="38" height="5" rx="2.5" fill="#808191" />

          {/* Illustrated Character */}
          <g>
            <path d="M200 145 C200 120, 218 108, 235 108 C252 108, 260 120, 260 145 Z" fill="#6C5DD3" />
            <rect x="226" y="94" width="14" height="16" rx="4" fill="#FAD4C0" />
            <ellipse cx="233" cy="80" rx="16" ry="18" fill="#FAD4C0" />
            
            <path d="M216 78 C216 60, 222 56, 236 56 C248 56, 252 64, 252 78 C252 82, 248 83, 248 80 C247 70, 240 68, 234 68 C226 68, 220 73, 220 84 Z" fill="#1C1E34" />
            <path d="M217 76 C215 88, 218 102, 222 104 C224 100, 222 84, 224 76 Z" fill="#1C1E34" />
            <path d="M248 76 C251 86, 250 96, 247 101 C245 96, 246 84, 244 76 Z" fill="#1C1E34" />
            
            <ellipse cx="228" cy="80" rx="1.8" ry="2.2" fill="#1C1E34" />
            <ellipse cx="239" cy="80" rx="1.8" ry="2.2" fill="#1C1E34" />
            <path d="M231 87 Q234 91 237 87" stroke="#D8785E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="225" cy="84" r="2.5" fill="#FFB7B2" opacity="0.6" />
            <circle cx="242" cy="84" r="2.5" fill="#FFB7B2" opacity="0.6" />

            <path d="M214 116 Q185 88 172 70" stroke="#FAD4C0" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="170" cy="68" r="4.5" fill="#FAD4C0" />

            <path d="M242 122 Q215 125 204 112" stroke="#FAD4C0" strokeWidth="8" strokeLinecap="round" fill="none" />
            <rect x="192" y="98" width="18" height="28" rx="4" fill="#3D405B" transform="rotate(-15 192 98)" />
            <rect x="195" y="101" width="13" height="21" rx="2" fill="#00C5FF" transform="rotate(-15 195 101)" />
          </g>

          <rect x="180" y="125" width="28" height="6" rx="3" fill="#F3A953" />
          <rect x="180" y="134" width="20" height="6" rx="3" fill="#5D5FEF" />
        </svg>
      </div>
    </div>
  );
}
