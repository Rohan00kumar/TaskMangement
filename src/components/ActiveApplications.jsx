import React from 'react';
import { ExternalLink, Calendar, Clock, FileText, Radio, ArrowRight } from 'lucide-react';
import { getDaysDiff, isRegistrationLive, formatDisplayDate } from '../utils/dateUtils';

export default function ActiveApplications({
  exams = [],
  onViewExam,
  onSeeAll
}) {
  // Filter ONLY active application forms where registration is open right now
  const liveApplications = exams.filter((exam) => {
    return isRegistrationLive(exam.registrationStart, exam.registrationEnd);
  });

  return (
    <div className="card-panel active-apps-panel">
      {/* Visual Hierarchy Header */}
      <div className="active-apps-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="live-pulse-badge">
            <Radio size={14} color="#20C978" />
            <span>Registration Live Now</span>
          </div>
          <span className="live-count-badge">
            {liveApplications.length} Open {liveApplications.length === 1 ? 'Drive' : 'Drives'}
          </span>
        </div>

        {onSeeAll && (
          <button
            type="button"
            className="btn-text-link"
            onClick={onSeeAll}
            title="Navigate to competitive examination hub"
          >
            <span>View All Exams</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      {/* Main Hierarchy Title */}
      <div style={{ marginTop: '10px', marginBottom: '14px' }}>
        <h3 className="section-title">Active Application Forms</h3>
        <span className="section-subtitle">
          Direct recruitment portals and examination applications currently accepting submissions
        </span>
      </div>

      {/* Live Application Cards Grid */}
      <div className="active-apps-grid">
        {liveApplications.map((exam) => {
          const daysToRegEnd = getDaysDiff(exam.registrationEnd);
          const daysToExam = getDaysDiff(exam.examDate);

          const catColorClass =
            exam.category === 'PSU' ? 'coral' :
            exam.category === 'Technical' ? 'tech' :
            exam.category === 'Offcampus' ? 'cyan' : 'non-tech';

          return (
            <div key={exam.id} className="active-app-card">
              {/* Card Top Meta */}
              <div className="active-app-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={`badge-tag ${catColorClass}`}>
                    {exam.category}
                  </span>
                  <span className="active-app-org">
                    {exam.organization}
                  </span>
                </div>

                <span className="deadline-urgent-tag">
                  <Clock size={11} />
                  <span>
                    {daysToRegEnd === 0
                      ? 'Closes Today'
                      : daysToRegEnd === 1
                      ? 'Closes Tomorrow'
                      : `Closes in ${daysToRegEnd} days`}
                  </span>
                </span>
              </div>

              {/* Title */}
              <h4 className="active-app-title">
                {exam.title}
              </h4>

              {/* Date Metadata Rows (No progress bars, clean typography) */}
              <div className="active-app-dates">
                <div className="date-metric-tile">
                  <span className="tile-sublabel">REGISTRATION DEADLINE</span>
                  <span className="tile-mainvalue deadline">
                    {formatDisplayDate(exam.registrationEnd)}
                  </span>
                </div>

                <div className="date-metric-tile">
                  <span className="tile-sublabel">EXAM SCHEDULED</span>
                  <span className="tile-mainvalue exam">
                    {formatDisplayDate(exam.examDate)}
                    {daysToExam !== null && daysToExam > 0 && ` (${daysToExam}d left)`}
                  </span>
                </div>
              </div>

              {/* Benchmark Row */}
              <div className="active-app-benchmarks">
                <span className="bench-pill">
                  Pattern: {exam.examPattern?.duration || '180m'} CBT
                </span>
                <span className="bench-pill target">
                  Target: {exam.targetMarks || 80}M / {exam.totalMarks || 100}M
                </span>
              </div>

              {/* Actions */}
              <div className="active-app-actions">
                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={() => onViewExam && onViewExam(exam)}
                  style={{ flex: 1, padding: '7px 12px', fontSize: '12px' }}
                >
                  <FileText size={13} />
                  <span>Details & Syllabus</span>
                </button>

                {exam.websiteUrl && (
                  <a
                    href={exam.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-action-outline"
                    title="Open Official Registration Portal"
                    style={{ padding: '7px 12px', fontSize: '12px', textDecoration: 'none' }}
                  >
                    <span>Apply Online</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {liveApplications.length === 0 && (
          <div className="active-apps-empty">
            <Calendar size={32} color="var(--primary)" />
            <span style={{ fontSize: '13px', fontWeight: '800', marginTop: '6px', color: 'var(--text-dark)' }}>
              No Application Forms Currently In Open Registration
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Check Target Exams for upcoming recruitment schedules or sync live open-source radars.
            </span>
            {onSeeAll && (
              <button type="button" className="btn-secondary" onClick={onSeeAll} style={{ marginTop: '12px' }}>
                Browse Target Exams
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

