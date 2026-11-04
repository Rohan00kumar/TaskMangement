import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Clock,
  RotateCw,
  Circle
} from 'lucide-react';
import { OPEN_SYLLABUS_PRESETS, detectSyllabusPreset } from '../../services/openSyllabusService';

export default function SubjectManagerModal({
  isOpen,
  onClose,
  exam,
  onUpdateExamSubjects
}) {
  if (!isOpen || !exam) return null;

  const [subjects, setSubjects] = useState(exam.subjects || []);
  const [subName, setSubName] = useState('');
  const [subCategory, setSubCategory] = useState(exam.category === 'Non Technical' ? 'General Foundations' : 'Core Technical Discipline');
  const [subWeight, setSubWeight] = useState(15);
  const [subStatus, setSubStatus] = useState('in_progress');
  const [selectedPresetId, setSelectedPresetId] = useState('');

  // Suggested preset based on exam title
  const detectedPreset = detectSyllabusPreset(exam.title || exam.category);

  // Stats computation
  const totalWeight = subjects.reduce((sum, s) => sum + (Number(s.weightage) || 0), 0);
  const completedCount = subjects.filter((s) => s.status === 'completed').length;
  const inProgressCount = subjects.filter((s) => s.status === 'in_progress').length;

  // Add subject
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!subName.trim()) return;

    const newSub = {
      id: `sub-${Date.now()}`,
      name: subName.trim(),
      category: subCategory,
      weightage: Number(subWeight) || 10,
      status: subStatus
    };

    const updated = [...subjects, newSub];
    setSubjects(updated);
    onUpdateExamSubjects(exam.id, updated);

    // Reset
    setSubName('');
    setSubWeight(15);
    setSubStatus('in_progress');
  };

  // Delete subject
  const handleDeleteSubject = (subId) => {
    const updated = subjects.filter((s) => s.id !== subId);
    setSubjects(updated);
    onUpdateExamSubjects(exam.id, updated);
  };

  // Quick cycle status: to_study -> in_progress -> completed -> revision -> to_study
  const handleCycleStatus = (subId) => {
    const order = ['to_study', 'in_progress', 'completed', 'revision'];
    const updated = subjects.map((s) => {
      if (s.id !== subId) return s;
      const currentIdx = order.indexOf(s.status || 'in_progress');
      const nextStatus = order[(currentIdx + 1) % order.length];
      return { ...s, status: nextStatus };
    });
    setSubjects(updated);
    onUpdateExamSubjects(exam.id, updated);
  };

  // Load from Open Source Syllabus Preset
  const handleLoadPreset = (preset) => {
    if (!preset || !preset.subjects) return;
    const mapped = preset.subjects.map((s, idx) => ({
      id: `sub-${Date.now()}-${idx}`,
      name: s.name,
      category: s.category || (exam.category === 'Non Technical' ? 'General Foundations' : 'Core Technical Discipline'),
      weightage: s.weightage,
      status: s.status || 'in_progress'
    }));
    setSubjects(mapped);
    onUpdateExamSubjects(exam.id, mapped);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card modal-fixed-frame"
        style={{ maxWidth: '680px', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Top Section: Header, Summary Stats, Auto-Fill Bar & Form NEVER Scroll Away */}
        <div className="modal-docked-top">
          {/* Modal Header */}
          <div className="modal-header">
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                SYLLABUS & TOPIC BREAKDOWN
              </span>
              <h3 className="modal-title" style={{ marginTop: '2px' }}>
                {exam.title}
              </h3>
            </div>
            <button className="modal-close-btn" onClick={onClose} title="Close">
              <X size={18} />
            </button>
          </div>

          {/* Minimalist Summary Counter Row */}
          <div className="subject-minimal-summary">
            <div className="summary-chip">
              <span className="summary-chip-label">TOTAL WEIGHT</span>
              <span className={`summary-chip-value ${totalWeight === 100 ? 'balanced' : ''}`}>
                {totalWeight}% {totalWeight === 100 ? '(Balanced)' : ''}
              </span>
            </div>

            <div className="summary-chip">
              <span className="summary-chip-label">STATUS BREAKDOWN</span>
              <span className="summary-chip-value">
                <span style={{ color: '#20C978' }}>{completedCount} Done</span> | <span style={{ color: 'var(--primary)' }}>{inProgressCount} Active</span>
              </span>
            </div>

            <div className="summary-chip">
              <span className="summary-chip-label">TOPICS</span>
              <span className="summary-chip-value">{subjects.length} Subjects</span>
            </div>
          </div>

          {/* Open-Source Syllabus Auto-Populate Bar */}
          <div className="open-syllabus-autobar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--primary)" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  Auto-Fill from Open Syllabus Database
                </span>
                <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                  {detectedPreset ? `Detected match: ${detectedPreset.name}` : 'Load official verified curriculum & weightages'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {detectedPreset && (
                <button
                  type="button"
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '14px' }}
                  onClick={() => handleLoadPreset(detectedPreset)}
                >
                  Apply {detectedPreset.name.split(' ')[0]} Preset
                </button>
              )}

              <select
                className="form-select"
                style={{ padding: '6px 10px', fontSize: '11px', width: 'auto', borderRadius: '14px' }}
                value={selectedPresetId}
                onChange={(e) => {
                  setSelectedPresetId(e.target.value);
                  const found = OPEN_SYLLABUS_PRESETS.find((p) => p.id === e.target.value);
                  if (found) handleLoadPreset(found);
                }}
              >
                <option value="">Select exam preset...</option>
                {OPEN_SYLLABUS_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pinned Add Subject Form (Permanently Visible - Never hidden by scrollbar) */}
          <form onSubmit={handleAddSubject} className="minimal-add-form">
            <input
              type="text"
              required
              placeholder="Topic / Subject name (e.g. Data Structures, OS, Reasoning)..."
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="form-input"
              style={{ flex: 2, minWidth: '160px' }}
            />

            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="form-select"
              style={{ width: '150px' }}
            >
              <option value="Core Technical Discipline">Core Technical</option>
              <option value="Engineering Mathematics">Mathematics</option>
              <option value="General Aptitude & Reasoning">Aptitude & Logic</option>
              <option value="Specialized Domain">Specialized</option>
            </select>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '80px' }}>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Weight"
                  value={subWeight}
                  onChange={(e) => setSubWeight(e.target.value)}
                  className="form-input"
                  style={{ paddingRight: '22px' }}
                  title="Weightage percentage"
                />
                <span style={{ position: 'absolute', right: '8px', top: '10px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>
                  %
                </span>
              </div>

              <select
                value={subStatus}
                onChange={(e) => setSubStatus(e.target.value)}
                className="form-select"
                style={{ width: '110px' }}
              >
                <option value="to_study">To Study</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="revision">Revision</option>
              </select>

              <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}>
                <Plus size={14} />
                <span>Add Topic</span>
              </button>
            </div>
          </form>
        </div>

        {/* Scrollable Subjects Area (Only this section scrolls smoothly) */}
        <div className="modal-scroll-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Active Curriculum Topics ({subjects.length})
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              Click status pill to toggle
            </span>
          </div>

          {subjects.map((s) => {
            const statusConfig = {
              to_study: { label: 'To Study', icon: Circle, color: 'var(--text-muted)', bg: 'var(--bg-card-subtle)' },
              in_progress: { label: 'In Progress', icon: Clock, color: 'var(--primary)', bg: 'var(--pill-purple-bg)' },
              completed: { label: 'Completed', icon: CheckCircle2, color: '#20C978', bg: 'var(--pill-green-bg)' },
              revision: { label: 'In Revision', icon: RotateCw, color: '#FF754C', bg: 'var(--pill-coral-bg)' }
            };
            const currentStatus = statusConfig[s.status] || statusConfig.in_progress;
            const StatusIcon = currentStatus.icon;

            return (
              <div key={s.id} className="minimal-subject-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <button
                    type="button"
                    className="status-toggle-pill"
                    onClick={() => handleCycleStatus(s.id)}
                    style={{ backgroundColor: currentStatus.bg, color: currentStatus.color }}
                    title="Click to cycle: To Study → In Progress → Completed → Revision"
                  >
                    <StatusIcon size={12} />
                    <span>{currentStatus.label}</span>
                  </button>

                  <span className="minimal-subject-name" title={s.name}>
                    {s.name}
                  </span>
                  {s.category && (
                    <span className="minimal-topic-chip" style={{ fontSize: '9.5px' }}>
                      {s.category}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span className="minimal-weight-tag">
                    {s.weightage}% Weight
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteSubject(s.id)}
                    className="minimal-del-btn"
                    title="Remove Subject"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {subjects.length === 0 && (
            <div className="minimal-empty-state">
              <BookOpen size={30} color="var(--text-muted)" />
              <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                No topics added yet. Use the open database preset above or add a topic!
              </p>
            </div>
          )}
        </div>

        {/* Pinned Bottom Footer (Always Visible) */}
        <div className="modal-docked-footer">
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Changes save automatically to workspace
          </span>
          <button type="button" className="btn-primary" onClick={onClose} style={{ padding: '8px 24px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
