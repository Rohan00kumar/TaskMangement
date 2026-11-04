import React from 'react';
import { ArrowRight, GraduationCap, Code2, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

export default function WorkProgress({ items = [], onSeeAll }) {
  return (
    <div className="card-panel">
      <div className="analytics-card-header">
        <h3 className="analytics-card-title">Active Focus & Tracked Items</h3>
        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      <div className="progress-cards-list">
        {items.slice(0, 4).map((item) => {
          const isExam = item.type === 'Target Exam';
          const isProject = item.type === 'Active Project';
          const Icon = isExam ? GraduationCap : isProject ? Code2 : BookOpen;

          return (
            <div key={item.id} className="mini-progress-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span className="mini-prog-type" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Icon size={12} />
                  <span>{item.type}</span>
                </span>

                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--pill-purple-bg)',
                    color: 'var(--primary)'
                  }}
                >
                  Active Focus
                </span>
              </div>

              <div className="mini-prog-title" style={{ marginTop: '4px' }}>{item.title}</div>

              {/* Minimalist Dates & Status (NO progress bars) */}
              <div className="mini-prog-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                <div className="mini-prog-dates" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>Timeline: <b>{item.startDate || 'Current'} → {item.endDate || 'Target'}</b></span>
                </div>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '12px' }}>
            No active targets yet. Add an exam or project to start tracking!
          </div>
        )}
      </div>
    </div>
  );
}
