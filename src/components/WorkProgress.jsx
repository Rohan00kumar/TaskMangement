import React from 'react';

export default function WorkProgress({ items = [], onSeeAll }) {
  return (
    <div className="card-panel">
      <div className="analytics-card-header">
        <h3 className="analytics-card-title">Work Progress</h3>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              fontWeight: '700',
              color: '#6C5DD3',
              cursor: 'pointer'
            }}
          >
            See All →
          </button>
        )}
      </div>

      <div className="progress-cards-list">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="mini-progress-card">
            <div className="mini-prog-type">{item.type}</div>
            <div className="mini-prog-title">{item.title}</div>
            
            <div className="prog-bar-container">
              <div
                className="prog-bar-fill"
                style={{
                  width: `${item.progress}%`,
                  backgroundColor: item.accentColor || '#6C5DD3'
                }}
              />
            </div>

            <div className="mini-prog-footer">
              <span className="mini-prog-percent">{item.progress}% Complete</span>
              <div className="mini-prog-dates">
                <span>Start: <b>{item.startDate || 'Jan'}</b></span>
                <span>Target: <b>{item.endDate || 'Ongoing'}</b></span>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#808191', fontSize: '12px' }}>
            No active progress items yet. Add an exam or project to start tracking!
          </div>
        )}
      </div>
    </div>
  );
}
