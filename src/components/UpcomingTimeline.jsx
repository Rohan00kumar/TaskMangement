import React from 'react';
import { CheckCircle2, Circle, Plus, Clock } from 'lucide-react';

export default function UpcomingTimeline({
  events = [],
  currentDate = new Date(),
  selectedDay,
  onToggleEvent,
  onAddMilestone
}) {
  const displayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    selectedDay || currentDate.getDate()
  );

  const dateLabel = displayDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="card-panel upcoming-timeline-card">
      <div className="upcoming-header">
        <div>
          <h3 className="upcoming-title">Focus & Milestones</h3>
          <p className="upcoming-date-sub">{dateLabel}</p>
        </div>
        {onAddMilestone && (
          <button
            onClick={onAddMilestone}
            className="btn-add-mini"
            title="Add Milestone"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        )}
      </div>

      {/* Clean Timeline List */}
      <div className="timeline-clean-list">
        {events.map((ev) => {
          const accentColor =
            ev.accent === 'coral' ? '#FF754C' :
            ev.accent === 'cyan' ? '#00C5FF' :
            ev.accent === 'green' ? '#20C978' : '#6C5DD3';

          return (
            <div
              key={ev.id}
              className={`timeline-clean-item ${ev.completed ? 'completed' : ''}`}
              onClick={() => onToggleEvent && onToggleEvent(ev.id)}
            >
              <div className="timeline-item-left">
                <button
                  type="button"
                  className="check-toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleEvent) onToggleEvent(ev.id);
                  }}
                >
                  {ev.completed ? (
                    <CheckCircle2 size={18} color="#20C978" />
                  ) : (
                    <Circle size={18} color="#B2B3BD" />
                  )}
                </button>
                <div className="timeline-item-text">
                  <span className="timeline-item-title">{ev.title}</span>
                  <div className="timeline-item-meta">
                    <span className="time-badge">
                      <Clock size={10} />
                      {ev.time || 'Today'}
                    </span>
                    {ev.tag && <span className="timeline-tag">{ev.tag}</span>}
                  </div>
                </div>
              </div>

              <div
                className="timeline-accent-strip"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="timeline-empty-state">
            No milestones scheduled for this day. Click Add to schedule one!
          </div>
        )}
      </div>
    </div>
  );
}
