import React from 'react';
import {
  X,
  Calendar,
  Clock,
  Target,
  ExternalLink,
  Award,
  CheckCircle2,
  Circle,
  FileText,
  AlertCircle,
  Layers,
  Video,
  RotateCw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { getDaysDiff, formatDisplayDate } from '../../utils/dateUtils';

export default function ExamDetailModal({
  isOpen,
  onClose,
  exam,
  onOpenManageSubjects
}) {
  if (!isOpen || !exam) return null;

  const daysToExam = getDaysDiff(exam.examDate);
  const daysToRegEnd = getDaysDiff(exam.registrationEnd || exam.regEnd);
  const targetBuffer = (exam.targetMarks || 0) - (exam.cutoffMarks || 0);

  // Subjects statistics
  const subjects = exam.subjects || [];
  const totalWeight = subjects.reduce((sum, s) => sum + (Number(s.weightage) || 0), 0);
  const completedCount = subjects.filter((s) => s.status === 'completed').length;
  const inProgressCount = subjects.filter((s) => s.status === 'in_progress').length;

  // Category-wise Syllabus Grouping
  const categorizedSubjects = subjects.reduce((acc, sub) => {
    const cat = sub.category || (exam.category === 'Non Technical' ? 'General Foundations' : 'Core Discipline');
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(sub);
    return acc;
  }, {});

  const catColor =
    exam.category === 'PSU' ? '#FF754C' :
    exam.category === 'Technical' ? '#6C5DD3' :
    exam.category === 'Offcampus' ? '#00C5FF' : '#20C978';

  const catBg =
    exam.category === 'PSU' ? 'var(--pill-coral-bg)' :
    exam.category === 'Technical' ? 'var(--pill-purple-bg)' :
    exam.category === 'Offcampus' ? 'var(--pill-cyan-bg)' : 'var(--pill-green-bg)';

  const pattern = exam.examPattern || {
    mode: "Online CBT (Computer Based Test)",
    duration: "180 Mins",
    totalQuestions: "65-100 Questions",
    negativeMarking: "-0.33 per wrong answer"
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        style={{ maxWidth: '820px', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  backgroundColor: catBg,
                  color: catColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {exam.category}
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
                {exam.organization || exam.examType || 'National Examination'}
              </span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)', lineHeight: '1.3' }}>
              {exam.title}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Timeline Stepper */}
        <div className="exam-blueprint-timeline">
          <div className="timeline-step">
            <span className="step-label">REGISTRATION OPENS</span>
            <span className="step-value">{formatDisplayDate(exam.registrationStart || exam.regStart)}</span>
          </div>
          <div className="timeline-step-arrow">→</div>
          <div className="timeline-step active">
            <span className="step-label">REGISTRATION CLOSES</span>
            <span className="step-value" style={{ color: '#FF754C', fontWeight: '800' }}>
              {formatDisplayDate(exam.registrationEnd || exam.regEnd)}
              {daysToRegEnd !== null && ` (${daysToRegEnd >= 0 ? `${daysToRegEnd}d left` : 'Window Closed'})`}
            </span>
          </div>
          <div className="timeline-step-arrow">→</div>
          <div className="timeline-step target">
            <span className="step-label">EXAM SCHEDULED</span>
            <span className="step-value" style={{ color: 'var(--primary)', fontWeight: '800' }}>
              {formatDisplayDate(exam.examDate)}
              {daysToExam !== null && ` (${daysToExam >= 0 ? `${daysToExam}d countdown` : 'Concluded'})`}
            </span>
          </div>
        </div>

        {/* Exam Pattern & Mode Specifications */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '10px' }}>
            Pattern & Evaluation Specifications
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div className="pattern-spec-box">
              <span className="spec-label">EXAM MODE</span>
              <span className="spec-value">{pattern.mode || 'Online CBT'}</span>
            </div>
            <div className="pattern-spec-box">
              <span className="spec-label">DURATION</span>
              <span className="spec-value">{pattern.duration || '180 Mins'}</span>
            </div>
            <div className="pattern-spec-box">
              <span className="spec-label">TOTAL QUESTIONS</span>
              <span className="spec-value">{pattern.totalQuestions || '100 Qs'}</span>
            </div>
            <div className="pattern-spec-box">
              <span className="spec-label">NEGATIVE MARKING</span>
              <span className="spec-value" style={{ color: '#FF754C' }}>
                {pattern.negativeMarking || '-0.33 per wrong'}
              </span>
            </div>
          </div>
        </div>

        {/* Score Benchmark Metrics (No chunky progress bars) */}
        <div className="minimal-cutoff-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                SCORE BENCHMARKS
              </span>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Cutoff Benchmark vs Target Score
              </h4>
            </div>
            <span className="minimal-safety-pill">
              Buffer: +{targetBuffer > 0 ? targetBuffer : 0} Marks Safety Margin
            </span>
          </div>

          <div className="minimal-score-stats">
            <div className="score-stat-item">
              <span className="score-stat-lbl">Qualifying Cutoff</span>
              <span className="score-stat-val" style={{ color: '#FF754C' }}>
                {exam.cutoffMarks || '—'} <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ {exam.totalMarks || 100}</span>
              </span>
            </div>
            <div className="score-stat-divider" />
            <div className="score-stat-item">
              <span className="score-stat-lbl">Target Score Goal</span>
              <span className="score-stat-val" style={{ color: '#20C978' }}>
                {exam.targetMarks || '—'} <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ {exam.totalMarks || 100}</span>
              </span>
            </div>
            <div className="score-stat-divider" />
            <div className="score-stat-item">
              <span className="score-stat-lbl">Preparation Status</span>
              <span className="score-stat-val" style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>
                {(exam.status || 'in_preparation').replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            CATEGORY-WISE SYLLABUS & MARKS WEIGHTAGE BREAKDOWN
            =================================================================== */}
        <div className="category-syllabus-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Category-Wise Syllabus & Weightage Breakdown
              </h4>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {subjects.length} Topics across {Object.keys(categorizedSubjects).length} Academic Categories | Total Weight: {totalWeight}%
              </span>
            </div>

            {onOpenManageSubjects && (
              <button
                type="button"
                className="btn-add-mini"
                onClick={() => {
                  onClose();
                  onOpenManageSubjects(exam);
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <Layers size={13} />
                <span>Customize Topics</span>
              </button>
            )}
          </div>

          {/* Render Each Category Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(categorizedSubjects).map(([categoryName, subList]) => {
              const catTotalWeight = subList.reduce((sum, s) => sum + (Number(s.weightage) || 0), 0);

              return (
                <div key={categoryName} className="syllabus-category-card">
                  {/* Category Header */}
                  <div className="syllabus-category-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={14} color="var(--primary)" />
                      <span className="syllabus-category-title">
                        {categoryName}
                      </span>
                    </div>
                    <span className="syllabus-category-weight-badge">
                      {catTotalWeight}% Total Weight
                    </span>
                  </div>

                  {/* Subtopics List */}
                  <div className="syllabus-topics-list">
                    {subList.map((s) => {
                      const statusBadge =
                        s.status === 'completed'
                          ? { label: 'Completed', bg: 'var(--pill-green-bg)', color: '#20C978' }
                          : s.status === 'to_study'
                          ? { label: 'To Study', bg: 'var(--bg-card-subtle)', color: 'var(--text-muted)' }
                          : s.status === 'revision'
                          ? { label: 'In Revision', bg: 'var(--pill-coral-bg)', color: '#FF754C' }
                          : { label: 'In Progress', bg: 'var(--pill-purple-bg)', color: 'var(--primary)' };

                      return (
                        <div key={s.id} className="minimal-subject-tile">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                            <span
                              style={{
                                fontSize: '10.5px',
                                fontWeight: '700',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                backgroundColor: statusBadge.bg,
                                color: statusBadge.color,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {statusBadge.label}
                            </span>
                            <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)' }}>
                              {s.name}
                            </span>
                          </div>

                          <span className="minimal-weight-tag">
                            {s.weightage}% Weight
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {subjects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                No syllabus topics assigned yet. Click "Customize Topics" to auto-load standard syllabus.
              </div>
            )}
          </div>
        </div>

        {/* Syllabus Scope Overview */}
        {exam.syllabusSummary && (
          <div style={{ background: 'var(--bg-card-subtle)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '6px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              OFFICIAL SYLLABUS SCOPE
            </span>
            <p style={{ fontSize: '12px', color: 'var(--text-dark)', marginTop: '4px', lineHeight: '1.5' }}>
              {exam.syllabusSummary}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
          {exam.youtubeUrl && (
            <a
              href={exam.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#FF0000', borderColor: 'rgba(255,0,0,0.2)' }}
              title="Watch Preparation Strategy Guide"
            >
              <Video size={14} color="#FF0000" />
              <span>Watch Prep & Strategy Guide</span>
            </a>
          )}

          {exam.websiteUrl && (
            <a
              href={exam.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <ExternalLink size={14} />
              <span>Official Application Portal</span>
            </a>
          )}

          <button type="button" className="btn-primary" onClick={onClose} style={{ marginLeft: 'auto' }}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
