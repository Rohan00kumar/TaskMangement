import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  Target,
  ExternalLink,
  Plus,
  BookOpen,
  Trash2,
  RefreshCw,
  Radio,
  FileText,
  Layers,
  Sparkles,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  Check,
  Building2,
  Briefcase,
  Compass,
  Cpu,
  Search,
  Video,
  Monitor,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import ExamDetailModal from '../modals/ExamDetailModal';
import { fetchLiveUpcomingExams } from '../../services/liveExamsService';

export default function ExamsView({
  exams = [],
  onOpenAddExam,
  onOpenManageSubjects,
  onDeleteExam,
  onImportLiveExam
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingOnly, setUpcomingOnly] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedExamDetail, setSelectedExamDetail] = useState(null);
  
  // Real-time Live API State
  const [liveFeed, setLiveFeed] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState('Just now');

  // Load real-time live open source exam feeds on mount
  useEffect(() => {
    loadLiveFeeds();
  }, []);

  const loadLiveFeeds = async () => {
    setIsSyncing(true);
    try {
      const items = await fetchLiveUpcomingExams();
      setLiveFeed(items);
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.warn("Live feed sync error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Calculate days to date (handles future, today, and past dates)
  const getDays = (dateStr) => {
    if (!dateStr) return null;
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Filter exams by category, search query, and future-only toggle
  const filteredExams = exams.filter((exam) => {
    const matchesCat = selectedCategory === 'All' ? true : exam.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ? true : (
      (exam.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (exam.organization || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (exam.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If upcomingOnly is active, exclude exams whose examDate is in the past
    if (upcomingOnly && exam.examDate) {
      const days = getDays(exam.examDate);
      if (days !== null && days < 0) return false;
    }

    return matchesCat && matchesSearch;
  });

  // Filter live feeds
  const filteredLiveFeed = liveFeed.filter((item) => {
    if (!searchQuery.trim()) return true;
    return (
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.organization || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Category counts
  const psuCount = exams.filter((e) => e.category === 'PSU').length;
  const techCount = exams.filter((e) => e.category === 'Technical').length;
  const govtCount = exams.filter((e) => e.category === 'Non Technical').length;
  const offcampusCount = exams.filter((e) => e.category === 'Offcampus').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Real-time Live Radar & Sync Bar */}
      <div className="live-radar-bar">
        <div className="radar-status-indicator">
          <span className="radar-pulse-dot" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio size={14} color="#20C978" />
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dark)' }}>
              LIVE EXAM RADAR ACTIVE
            </span>
          </div>
          <span className="radar-synced-time">• Synced: {lastSyncedTime}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-sync-live"
            onClick={loadLiveFeeds}
            disabled={isSyncing}
            title="Fetch latest open-source examination & contest updates"
          >
            <RefreshCw size={13} className={isSyncing ? 'spin-anim' : ''} />
            <span>{isSyncing ? 'Syncing Feeds...' : 'Sync Live Feeds'}</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddExam}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            <span>Add Exam</span>
          </button>
        </div>
      </div>

      {/* Main Header & Metrics */}
      <div className="view-header" style={{ marginBottom: '4px' }}>
        <div className="view-title-wrap">
          <h2 className="view-main-title">Target Exams</h2>
        </div>
      </div>

      {/* 4 Metric Counter Badges */}
      <div className="exam-hub-counters-grid">
        <div className="hub-counter-box psu">
          <span className="counter-val">{psuCount}</span>
          <span className="counter-lbl">PSU Recruitments</span>
        </div>
        <div className="hub-counter-box tech">
          <span className="counter-val">{techCount}</span>
          <span className="counter-lbl">Technical & GATE</span>
        </div>
        <div className="hub-counter-box govt">
          <span className="counter-val">{govtCount}</span>
          <span className="counter-lbl">Non-Tech Govt</span>
        </div>
        <div className="hub-counter-box offcampus">
          <span className="counter-val">{offcampusCount}</span>
          <span className="counter-lbl">Offcampus Drives</span>
        </div>
      </div>

      {/* Search & Navigation Bar */}
      <div className="category-control-bar">
        {/* Category Navigation Pills */}
        <div className="category-pills-row">
          {[
            { id: 'All', label: 'All Exams', count: exams.length },
            { id: 'PSU', label: 'PSU', icon: Building2, count: psuCount },
            { id: 'Technical', label: 'Technical & GATE', icon: Cpu, count: techCount },
            { id: 'Non Technical', label: 'Non-Tech Govt', icon: Compass, count: govtCount },
            { id: 'Offcampus', label: 'Offcampus Drives', icon: Briefcase, count: offcampusCount },
            { id: 'Live', label: 'Live Stream', icon: Radio, count: liveFeed.length, isLive: true }
          ].map((cat) => {
            const Icon = cat.icon;
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`cat-nav-pill ${isSel ? 'active' : ''} ${cat.isLive ? 'live-tab' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {Icon && <Icon size={14} />}
                <span>{cat.label}</span>
                <span className="cat-count-badge">{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Right side controls: Future-Only Toggle, Search input & Grid/Table switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {selectedCategory !== 'Live' && (
            <button
              type="button"
              className={`cat-nav-pill ${upcomingOnly ? 'active' : ''}`}
              onClick={() => setUpcomingOnly(!upcomingOnly)}
              style={{ fontSize: '11.5px', padding: '6px 12px' }}
              title="Filter to upcoming & future target exams only"
            >
              <Calendar size={13} />
              <span>{upcomingOnly ? 'Future & Upcoming' : 'Include Archived'}</span>
            </button>
          )}

          <div className="minimal-search-box">
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search exam, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="minimal-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="minimal-search-clear"
              >
                ×
              </button>
            )}
          </div>

          {selectedCategory !== 'Live' && (
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid Cards View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table Comparison View"
              >
                <TableIcon size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          SECTION A: LIVE RADAR STREAM (REAL-TIME UPDATES FEED)
          ===================================================================== */}
      {selectedCategory === 'Live' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="live-feed-banner">
            <Radio size={18} color="#20C978" />
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: '800', color: 'var(--text-dark)', fontSize: '13px' }}>
                Open-Source Opportunities Radar
              </span>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Live updates for PSU recruitments, competitive contests, and hiring drives.
              </p>
            </div>
          </div>

          <div className="grid-cards">
            {filteredLiveFeed.map((item) => {
              const isAlreadyTracked = exams.some((e) => e.title.toLowerCase() === item.title.toLowerCase());
              const daysToExam = getDays(item.examDate);
              const daysToReg = getDays(item.registrationEnd);

              return (
                <div key={item.id} className="live-exam-card">
                  <div className="live-card-top">
                    <span className={`badge-tag ${item.category === 'PSU' ? 'coral' : item.category === 'Technical' ? 'tech' : item.category === 'Offcampus' ? 'cyan' : 'non-tech'}`}>
                      {item.category}
                    </span>
                    <span className="live-alert-pill">
                      {item.liveAlert || 'Notification Active'}
                    </span>
                  </div>

                  <h3 className="exam-title-pro" style={{ marginTop: '4px' }}>{item.title}</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.organization} • {item.examType}
                  </p>

                  {/* Dates Box */}
                  <div className="live-dates-box">
                    <div>
                      <span className="live-date-label">REGISTRATION DEADLINE</span>
                      <span className="live-date-val" style={{ color: '#FF754C' }}>
                        {item.registrationEnd || 'Announced'} {daysToReg !== null ? `(${daysToReg}d left)` : ''}
                      </span>
                    </div>
                    <div>
                      <span className="live-date-label">EXAM DATE</span>
                      <span className="live-date-val" style={{ color: 'var(--primary)' }}>
                        {item.examDate || 'Scheduled'} {daysToExam !== null ? `(${daysToExam}d left)` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Minimalist Specs summary (No progress bars) */}
                  <div className="live-pattern-summary">
                    <span>Pattern: <b>{item.examPattern?.duration || '180m'}</b> CBT</span>
                    <span>Total Marks: <b>{item.totalMarks}M</b></span>
                    <span>Cutoff: <b>{item.cutoffMarks}M</b></span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ flex: 1, padding: '7px 12px', fontSize: '12px' }}
                      onClick={() => {
                        if (onImportLiveExam) {
                          onImportLiveExam(item);
                        }
                      }}
                      disabled={isAlreadyTracked}
                    >
                      {isAlreadyTracked ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                          <Check size={13} /> Tracking in Exams
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                          <Plus size={13} /> Track Exam
                        </span>
                      )}
                    </button>

                    {item.youtubeUrl && (
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-arrow-btn"
                        title="Watch Prep Video & Notification Guide"
                        style={{ color: '#FF0000' }}
                      >
                        <Video size={14} color="#FF0000" />
                      </a>
                    )}

                    {item.websiteUrl && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-arrow-btn"
                        title="Official Portal"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION B: USER'S TARGET EXAMS (MINIMALIST GRID VIEW - NO PROGRESS BARS)
          ===================================================================== */}
      {selectedCategory !== 'Live' && viewMode === 'grid' && (
        <div className="grid-cards">
          {filteredExams.map((exam) => {
            const daysToExam = getDays(exam.examDate);
            const daysToRegEnd = getDays(exam.registrationEnd || exam.regEnd);
            const targetBuffer = (exam.targetMarks || 0) - (exam.cutoffMarks || 0);

            // Minimalist Subject counts
            const subjects = exam.subjects || [];
            const totalWeight = subjects.reduce((sum, s) => sum + (Number(s.weightage) || 0), 0);
            const completedSubs = subjects.filter((s) => s.status === 'completed').length;
            const inProgressSubs = subjects.filter((s) => s.status === 'in_progress').length;

            const catColorClass =
              exam.category === 'PSU' ? 'coral' :
              exam.category === 'Technical' ? 'tech' :
              exam.category === 'Offcampus' ? 'cyan' : 'non-tech';

            const pattern = exam.examPattern || {
              mode: "Online CBT",
              duration: "180 Mins",
              totalQuestions: "65-100 Qs",
              negativeMarking: "-0.33 per wrong"
            };

            return (
              <div key={exam.id} className="exam-card-pro">
                {/* Pro Card Header */}
                <div className="exam-card-pro-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className={`badge-tag ${catColorClass}`}>
                      {exam.category}
                    </span>
                    <span className="exam-org-tag">
                      {exam.organization || exam.examType || 'Competitive'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {exam.youtubeUrl && (
                      <a
                        href={exam.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-arrow-btn"
                        title="Watch Prep Video & Strategy"
                        style={{ color: '#FF0000' }}
                      >
                        <Video size={13} color="#FF0000" />
                      </a>
                    )}
                    {exam.websiteUrl && (
                      <a
                        href={exam.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-arrow-btn"
                        title="Official Application Portal"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <button
                      type="button"
                      className="icon-arrow-btn"
                      onClick={() => onDeleteExam && onDeleteExam(exam.id)}
                      title="Delete Exam"
                    >
                      <Trash2 size={13} color="#FF754C" />
                    </button>
                  </div>
                </div>

                {/* Exam Title & Registration Status */}
                <div>
                  <h3 className="exam-title-pro">{exam.title}</h3>
                  <div className="exam-reg-status-pill">
                    {daysToRegEnd !== null && daysToRegEnd > 0 ? (
                      <span style={{ color: '#20C978' }}>
                        Registration Open ({daysToRegEnd}d left)
                      </span>
                    ) : daysToRegEnd === 0 ? (
                      <span style={{ color: '#FF754C' }}>
                        Registration Closes Today
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>
                        Registration Window Closed
                      </span>
                    )}
                  </div>
                </div>

                {/* Date Grid */}
                <div className="exam-date-pro-grid">
                  <div className="date-tile">
                    <span className="date-tile-lbl">REG OPENS</span>
                    <span className="date-tile-val">{exam.registrationStart || exam.regStart || 'Announced'}</span>
                  </div>
                  <div className="date-tile">
                    <span className="date-tile-lbl">LAST DATE</span>
                    <span className="date-tile-val" style={{ color: '#FF754C' }}>
                      {exam.registrationEnd || exam.regEnd || 'TBA'}
                    </span>
                  </div>
                  <div className="date-tile countdown">
                    <span className="date-tile-lbl">COUNTDOWN</span>
                    <span
                      className={`date-tile-val ${daysToExam !== null && daysToExam <= 0 ? '' : 'target'}`}
                      style={daysToExam !== null && daysToExam < 0 ? { color: 'var(--text-muted)' } : {}}
                    >
                      {daysToExam !== null
                        ? daysToExam > 0
                          ? `${daysToExam} Days Left`
                          : daysToExam === 0
                          ? 'Exam Today!'
                          : 'Concluded'
                        : 'Scheduled'}
                    </span>
                  </div>
                </div>

                {/* Exam Pattern Specs Chips */}
                <div className="pattern-chips-row">
                  <span className="pattern-chip">
                    <Monitor size={12} /> {pattern.mode || 'Online CBT'}
                  </span>
                  <span className="pattern-chip">
                    <Clock size={12} /> {pattern.duration || '180m'}
                  </span>
                  <span className="pattern-chip">
                    <HelpCircle size={12} /> {pattern.totalQuestions || '100 Qs'}
                  </span>
                  <span className="pattern-chip" style={{ color: '#FF754C' }}>
                    <AlertTriangle size={12} /> {pattern.negativeMarking || '-0.33 Neg'}
                  </span>
                </div>

                {/* Minimalist Cutoff Benchmark vs Target Score (Clean text pill, NO chunky progress bar) */}
                <div className="minimal-card-score-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cutoff:</span>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      {exam.cutoffMarks || '—'}M
                    </span>
                    <span style={{ color: 'var(--border)' }}>|</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target:</span>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#20C978' }}>
                      {exam.targetMarks || '—'}M
                    </span>
                  </div>

                  <span className="minimal-safety-tag">
                    +{targetBuffer > 0 ? targetBuffer : 0}M Buffer
                  </span>
                </div>

                {/* Minimalist Syllabus & Topics Summary (Clean Chips, NO progress bars) */}
                <div className="minimal-card-syllabus-block">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Syllabus Topics ({subjects.length})
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      <b style={{ color: '#20C978' }}>{completedSubs} Done</b> • <b style={{ color: 'var(--primary)' }}>{inProgressSubs} Active</b>
                    </span>
                  </div>

                  {/* Clean Topic Pills Preview */}
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {subjects.slice(0, 3).map((s) => (
                      <span
                        key={s.id}
                        className="minimal-topic-chip"
                        style={{
                          backgroundColor: s.status === 'completed' ? 'var(--pill-green-bg)' : 'var(--bg-card-subtle)',
                          color: s.status === 'completed' ? 'var(--pill-green-text)' : 'var(--text-dark)'
                        }}
                      >
                        {s.name} ({s.weightage}%)
                      </span>
                    ))}
                    {subjects.length > 3 && (
                      <span className="minimal-topic-chip more" onClick={() => setSelectedExamDetail(exam)}>
                        +{subjects.length - 3} more
                      </span>
                    )}
                    {subjects.length === 0 && (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        No topics assigned yet.
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="exam-card-pro-actions">
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => setSelectedExamDetail(exam)}
                  >
                    <FileText size={13} />
                    <span>View Blueprint</span>
                  </button>

                  <button
                    type="button"
                    className="btn-action-primary"
                    onClick={() => onOpenManageSubjects && onOpenManageSubjects(exam)}
                  >
                    <Layers size={13} />
                    <span>Syllabus Topics</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredExams.length === 0 && (
            <div className="exam-empty-box">
              <GraduationCap size={40} color="var(--primary)" />
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginTop: '12px' }}>
                No target exams found in {selectedCategory}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '400px', marginTop: '4px' }}>
                Add your target PSU, Technical, Non-Technical Govt, or Offcampus exam, or browse the Live Radar Stream to track live notifications.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button type="button" className="btn-primary" onClick={onOpenAddExam} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={14} />
                  <span>Add Exam</span>
                </button>
                <button type="button" className="btn-secondary" onClick={() => setSelectedCategory('Live')}>
                  Browse Live Stream
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          SECTION C: COMPARATIVE MATRIX (TABLE VIEW - MINIMALIST)
          ===================================================================== */}
      {selectedCategory !== 'Live' && viewMode === 'table' && (
        <div className="card-panel" style={{ padding: '0', overflowX: 'auto' }}>
          <table className="exam-matrix-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Exam & Organization</th>
                <th>Reg. Deadline</th>
                <th>Exam Date</th>
                <th>Pattern</th>
                <th>Cutoff vs Target</th>
                <th>Topics Covered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => {
                const daysToExam = getDays(exam.examDate);
                const daysToReg = getDays(exam.registrationEnd || exam.regEnd);
                const subjects = exam.subjects || [];
                const completedSubs = subjects.filter((s) => s.status === 'completed').length;

                return (
                  <tr key={exam.id}>
                    <td>
                      <span className={`badge-tag ${exam.category === 'PSU' ? 'coral' : exam.category === 'Technical' ? 'tech' : exam.category === 'Offcampus' ? 'cyan' : 'non-tech'}`}>
                        {exam.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '800', color: 'var(--text-dark)', fontSize: '13px' }}>
                          {exam.title}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                          {exam.organization || exam.examType || 'National'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#FF754C' }}>
                        {exam.registrationEnd || exam.regEnd || 'Announced'}
                      </span>
                      {daysToReg !== null && (
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                          {daysToReg} days left
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>
                        {exam.examDate || 'Scheduled'}
                      </span>
                      {daysToExam !== null && (
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                          {daysToExam}d countdown
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', color: 'var(--text-dark)', fontWeight: '600' }}>
                        {exam.examPattern?.duration || '180m'} CBT
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', fontWeight: '700' }}>
                        <span style={{ color: '#FF754C' }}>{exam.cutoffMarks || '—'}</span> / <span style={{ color: '#20C978' }}>{exam.targetMarks || '—'}</span>
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-dark)' }}>
                        {completedSubs}/{subjects.length} Topics
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="icon-arrow-btn"
                          onClick={() => setSelectedExamDetail(exam)}
                          title="View Blueprint"
                        >
                          <FileText size={13} />
                        </button>
                        <button
                          type="button"
                          className="icon-arrow-btn"
                          onClick={() => onOpenManageSubjects && onOpenManageSubjects(exam)}
                          title="Manage Subjects"
                        >
                          <Layers size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Full Examination Blueprint Detail Modal */}
      <ExamDetailModal
        isOpen={Boolean(selectedExamDetail)}
        onClose={() => setSelectedExamDetail(null)}
        exam={selectedExamDetail}
        onOpenManageSubjects={onOpenManageSubjects}
      />
    </div>
  );
}
