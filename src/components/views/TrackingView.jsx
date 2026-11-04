import React from 'react';
import { Target, Clock, CheckCircle2, Calendar as CalIcon, Flame, Sparkles } from 'lucide-react';

export default function TrackingView({ upcomingTimeline = [], onToggleTimelineEvent }) {
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const completedCount = upcomingTimeline.filter((t) => t.completed).length;
  const pendingCount = upcomingTimeline.length - completedCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div className="view-header">
        <div className="view-title-wrap">
          <h2 className="view-main-title">Focus Schedule & Milestone Tracking</h2>
          <p className="view-sub-desc">
            Time-blocked daily study sessions, exam countdown milestones, and sprint deliverables.
          </p>
        </div>
      </div>

      <div className="card-panel" style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
        {/* Schedule Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalIcon size={18} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)' }}>
                {todayFormatted}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {completedCount} Completed • {pendingCount} Pending Sessions
              </span>
            </div>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', background: 'var(--pill-purple-bg)', padding: '4px 12px', borderRadius: '20px' }}>
            ● Active Daily Sprint
          </span>
        </div>

        {/* Timeline Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {upcomingTimeline.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleTimelineEvent && onToggleTimelineEvent(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                background: item.completed ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                gap: '12px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px', flex: 1 }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: item.completed ? 'var(--pill-green-bg)' : 'var(--pill-purple-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {item.completed ? (
                    <CheckCircle2 size={17} color="#20C978" />
                  ) : (
                    <Clock size={17} color="var(--primary)" />
                  )}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '13.5px',
                      fontWeight: '800',
                      color: item.completed ? 'var(--text-muted)' : 'var(--text-dark)',
                      textDecoration: item.completed ? 'line-through' : 'none'
                    }}
                  >
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)' }}>
                      ⏱️ {item.time}
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      • {item.category || 'Focus Session'}
                    </span>
                    {item.tag && (
                      <span className="minimal-topic-chip" style={{ fontSize: '10px', padding: '1px 6px' }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '14px',
                  background: item.completed ? 'var(--pill-green-bg)' : 'var(--pill-coral-bg)',
                  color: item.completed ? '#20C978' : '#FF754C',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.completed ? '✓ Completed' : 'Pending Action'}
              </span>
            </div>
          ))}

          {upcomingTimeline.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)', fontSize: '12px' }}>
              No focus sessions scheduled for today. Add one using the "+ Add New Item" button!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
