import React, { useState } from 'react';
import { X, GraduationCap, Rocket, BookOpen, Clock, Sparkles } from 'lucide-react';
import { OPEN_SYLLABUS_PRESETS, detectSyllabusPreset } from '../../services/openSyllabusService';

export default function AddTaskModal({
  isOpen,
  onClose,
  initialCategory = 'exam',
  onAddExam,
  onAddProject,
  onAddCourse,
  onAddTimelineEvent
}) {
  const [category, setCategory] = useState(initialCategory);

  // Exam state
  const [examTitle, setExamTitle] = useState('');
  const [examOrg, setExamOrg] = useState('');
  const [examCategory, setExamCategory] = useState('PSU'); // "PSU" | "Technical" | "Non Technical" | "Offcampus"
  const [examDate, setExamDate] = useState('2026-05-20');
  const [regStart, setRegStart] = useState('2026-03-01');
  const [regEnd, setRegEnd] = useState('2026-04-10');
  const [examMode, setExamMode] = useState('Online CBT (Computer Based Test)');
  const [duration, setDuration] = useState('180 Mins (3 Hours)');
  const [totalQuestions, setTotalQuestions] = useState('100 Questions');
  const [negativeMarking, setNegativeMarking] = useState('-0.33 per wrong answer');
  const [cutoffMarks, setCutoffMarks] = useState('65');
  const [targetMarks, setTargetMarks] = useState('85');
  const [examTotalMarks, setExamTotalMarks] = useState('100');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [examSubjects, setExamSubjects] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState('');

  // Auto-fill preset helper
  const handleApplyPreset = (preset) => {
    if (!preset) return;
    setExamTitle(preset.name);
    setExamOrg(preset.organization || '');
    setExamCategory(preset.category || 'Technical');
    setExamTotalMarks(String(preset.totalMarks || 100));
    setCutoffMarks(String(preset.cutoffMarks || 60));
    setTargetMarks(String(preset.targetMarks || 80));
    if (preset.examPattern) {
      setExamMode(preset.examPattern.mode || 'Online CBT');
      setDuration(preset.examPattern.duration || '180 Mins');
      setTotalQuestions(preset.examPattern.totalQuestions || '100 Qs');
      setNegativeMarking(preset.examPattern.negativeMarking || '-0.33 per wrong');
    }
    if (preset.subjects) {
      setExamSubjects(
        preset.subjects.map((s, idx) => ({
          id: `sub-${Date.now()}-${idx}`,
          name: s.name,
          weightage: s.weightage,
          status: s.status || 'in_progress'
        }))
      );
    }
  };

  // Project state
  const [projTitle, setProjTitle] = useState('');
  const [projType, setProjType] = useState('current');
  const [projDomain, setProjDomain] = useState('Full Stack');
  const [projTechStack, setProjTechStack] = useState('React, Node.js, PostgreSQL');
  const [projDifficulty, setProjDifficulty] = useState('Intermediate');
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');

  // Course state
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePlatform, setCoursePlatform] = useState('Coursera');
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseCategory, setCourseCategory] = useState('Web Development');
  const [courseProgress, setCourseProgress] = useState(0);

  // Timeline Event state
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('10:00 AM');
  const [eventAssignees, setEventAssignees] = useState('Self Focus');
  const [eventAccent, setEventAccent] = useState('blue');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === 'exam') {
      if (!examTitle.trim()) return;
      onAddExam({
        id: `exam-${Date.now()}`,
        title: examTitle.trim(),
        organization: examOrg.trim() || (examCategory === 'PSU' ? 'National PSU' : examCategory === 'Offcampus' ? 'Corporate Drive' : 'Exam Authority'),
        category: examCategory,
        examType: `${examCategory} Examination`,
        registrationStart: regStart,
        registrationEnd: regEnd,
        examDate,
        cutoffMarks: Number(cutoffMarks),
        targetMarks: Number(targetMarks),
        totalMarks: Number(examTotalMarks),
        examPattern: {
          mode: examMode,
          duration,
          totalQuestions,
          negativeMarking
        },
        marksDistribution: `Technical Core (70%), Aptitude & Foundations (30%)`,
        status: 'in_preparation',
        priority: 'high',
        websiteUrl: websiteUrl.trim(),
        subjects: examSubjects.length > 0 ? examSubjects : [
          {
            id: `sub-${Date.now()}-1`,
            name: 'Core Technical Discipline',
            weightage: 70,
            status: 'in_progress'
          },
          {
            id: `sub-${Date.now()}-2`,
            name: 'General Aptitude & Reasoning',
            weightage: 30,
            status: 'to_study'
          }
        ]
      });
    } else if (category === 'project') {
      if (!projTitle.trim()) return;
      onAddProject({
        id: `proj-${Date.now()}`,
        title: projTitle.trim(),
        projectType: projType,
        domain: projDomain,
        techStack: projTechStack,
        difficulty: projDifficulty,
        status: projType === 'current' ? 'in_progress' : 'ideation',
        githubUrl: projGithub,
        liveUrl: projLive,
        keyFeatures: 'Architecture design, modular clean code, responsive UI.',
        learningOutcomes: 'Practical application of modern frameworks and tools.'
      });
    } else if (category === 'course') {
      if (!courseTitle.trim()) return;
      onAddCourse({
        id: `course-${Date.now()}`,
        title: courseTitle.trim(),
        platform: coursePlatform,
        instructor: courseInstructor,
        category: courseCategory,
        progress: Number(courseProgress),
        status: Number(courseProgress) === 100 ? 'completed' : 'in_progress',
        keyLearnings: 'Key concepts mastered and implemented.'
      });
    } else if (category === 'event') {
      if (!eventTitle.trim()) return;
      onAddTimelineEvent({
        id: `ev-${Date.now()}`,
        title: eventTitle.trim(),
        time: eventTime,
        assignees: eventAssignees,
        accent: eventAccent,
        completed: false
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Add Item</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Category Picker Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[
            { id: 'exam', label: 'Target Exam', icon: GraduationCap },
            { id: 'project', label: 'Project', icon: Rocket },
            { id: 'course', label: 'Course', icon: BookOpen },
            { id: 'event', label: 'Schedule Event', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`tab-pill-btn ${isSel ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 4px',
                  fontSize: '11px'
                }}
                onClick={() => setCategory(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit}>
          {category === 'exam' && (
            <>
              {/* Open-Source Syllabus & Weightage Auto-Populator */}
              <div className="open-syllabus-autobar" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--primary)" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Auto-Fill Syllabus & Weightages from Open Database
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      Loads verified subjects, weightages, cutoff benchmarks, and patterns
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    className="form-select"
                    style={{ padding: '6px 10px', fontSize: '11px', width: 'auto', borderRadius: '14px' }}
                    value={selectedPresetId}
                    onChange={(e) => {
                      setSelectedPresetId(e.target.value);
                      const found = OPEN_SYLLABUS_PRESETS.find((p) => p.id === e.target.value);
                      if (found) handleApplyPreset(found);
                    }}
                  >
                    <option value="">Select Open-Source Exam Syllabus...</option>
                    {OPEN_SYLLABUS_PRESETS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {examSubjects.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--primary)' }}>
                    Auto-Loaded {examSubjects.length} Subjects:
                  </span>
                  {examSubjects.slice(0, 4).map((s) => (
                    <span key={s.id} className="minimal-weight-tag" style={{ fontSize: '10px' }}>
                      {s.name} ({s.weightage}%)
                    </span>
                  ))}
                  {examSubjects.length > 4 && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      +{examSubjects.length - 4} more
                    </span>
                  )}
                </div>
              )}

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Exam Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ISRO Scientist 'SC', TCS NQT, UPSC CSE..."
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Conducting Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. ISRO, TCS, UPSC, IIT Roorkee"
                    value={examOrg}
                    onChange={(e) => setExamOrg(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Major 4 Exam Categories */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Exam Category *</label>
                  <select
                    value={examCategory}
                    onChange={(e) => setExamCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="PSU">PSU Recruitment (ISRO, BARC, DRDO, ONGC)</option>
                    <option value="Technical">Technical & GATE (GATE CS/DA, AWS, LeetCode)</option>
                    <option value="Non Technical">Non-Technical Govt (UPSC, SSC CGL, Banking)</option>
                    <option value="Offcampus">Offcampus Drives (TCS NQT, HackWithInfy, Amazon)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Exam Scheduled Date</label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Registration Dates */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Registration Opening Date</label>
                  <input
                    type="date"
                    value={regStart}
                    onChange={(e) => setRegStart(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Registration Closing / Last Date</label>
                  <input
                    type="date"
                    value={regEnd}
                    onChange={(e) => setRegEnd(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Pattern Specifications */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Exam Mode & Platform</label>
                  <input
                    type="text"
                    placeholder="e.g. Online CBT / Offline OMR / Proctored"
                    value={examMode}
                    onChange={(e) => setExamMode(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 180 Mins (3h) / 120 Mins"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Total Questions</label>
                  <input
                    type="text"
                    placeholder="e.g. 65 MCQs & NATs / 100 Qs"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Negative Marking Scheme</label>
                  <input
                    type="text"
                    placeholder="e.g. -0.33 per wrong / No negative"
                    value={negativeMarking}
                    onChange={(e) => setNegativeMarking(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Marks & Cutoff Benchmarks */}
              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Total Marks</label>
                  <input
                    type="number"
                    value={examTotalMarks}
                    onChange={(e) => setExamTotalMarks(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Past Cutoff</label>
                  <input
                    type="number"
                    value={cutoffMarks}
                    onChange={(e) => setCutoffMarks(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Score</label>
                  <input
                    type="number"
                    value={targetMarks}
                    onChange={(e) => setTargetMarks(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Official Portal / Notification URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="form-input"
                />
              </div>
            </>
          )}

          {category === 'project' && (
            <>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Code Assistant, Decentralized Verifier..."
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Track Type</label>
                  <select
                    value={projType}
                    onChange={(e) => setProjType(e.target.value)}
                    className="form-select"
                  >
                    <option value="current">Active Portfolio Project</option>
                    <option value="future_idea">Future Project Idea</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Domain</label>
                  <input
                    type="text"
                    value={projDomain}
                    onChange={(e) => setProjDomain(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, Docker, PostgreSQL"
                  value={projTechStack}
                  onChange={(e) => setProjTechStack(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Live Preview URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projLive}
                    onChange={(e) => setProjLive(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </>
          )}

          {category === 'course' && (
            <>
              <div className="form-group">
                <label className="form-label">Course / Certification Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Machine Learning Specialization, Docker Deep Dive..."
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Platform</label>
                  <input
                    type="text"
                    value={coursePlatform}
                    onChange={(e) => setCoursePlatform(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Instructor</label>
                  <input
                    type="text"
                    value={courseInstructor}
                    onChange={(e) => setCourseInstructor(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Progress: {courseProgress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={courseProgress}
                  onChange={(e) => setCourseProgress(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>
            </>
          )}

          {category === 'event' && (
            <>
              <div className="form-group">
                <label className="form-label">Milestone / Focus Session Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph Algorithms Practice, OS Mock Test..."
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="form-select"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Assignees</label>
                  <input
                    type="text"
                    value={eventAssignees}
                    onChange={(e) => setEventAssignees(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Color Accent</label>
                  <select
                    value={eventAccent}
                    onChange={(e) => setEventAccent(e.target.value)}
                    className="form-select"
                  >
                    <option value="blue">Blue</option>
                    <option value="coral">Coral</option>
                    <option value="cyan">Cyan</option>
                    <option value="green">Green</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
