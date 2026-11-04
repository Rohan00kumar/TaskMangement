import React, { useState } from 'react';
import { Plus, Award, ExternalLink, BookOpen, Star, Trash2, CheckCircle2, Clock } from 'lucide-react';

export default function CoursesView({
  courses = [],
  skills = [],
  onOpenAddCourse,
  onAddSkill,
  onDeleteCourse,
  onDeleteSkill
}) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Language');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Advanced'); // Beginner, Intermediate, Advanced, Expert

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    if (onAddSkill) {
      onAddSkill({
        id: `sk-${Date.now()}`,
        name: newSkillName.trim(),
        category: newSkillCategory,
        proficiency: newSkillProficiency
      });
    }
    setNewSkillName('');
  };

  // Helper for 4-tier dots
  const renderProficiencyDots = (prof) => {
    const levelMap = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
      Expert: 4
    };
    const activeDots = levelMap[prof] || 2;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        {[1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: dot <= activeDots ? 'var(--primary)' : 'var(--border)'
            }}
          />
        ))}
        <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--primary)', marginLeft: '4px' }}>
          {prof}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Skillset Matrix Section */}
      <div>
        <div className="view-header">
          <div className="view-title-wrap">
            <h2 className="view-main-title">Skills</h2>
          </div>
        </div>

        {/* Minimalist Add Skill Form */}
        <form
          onSubmit={handleCreateSkill}
          className="minimal-add-form"
          style={{ marginBottom: '18px' }}
        >
          <input
            type="text"
            required
            placeholder="Add skill (e.g. TypeScript, Redis, PyTorch, Docker)..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="form-input"
            style={{ flex: 2, minWidth: '180px' }}
          />

          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
            className="form-select"
            style={{ width: '150px' }}
          >
            <option value="Language">Language</option>
            <option value="Framework">Framework</option>
            <option value="Database">Database</option>
            <option value="DevOps & Cloud">DevOps & Cloud</option>
            <option value="Core CS">Core CS</option>
            <option value="Tool">Tool</option>
          </select>

          <select
            value={newSkillProficiency}
            onChange={(e) => setNewSkillProficiency(e.target.value)}
            className="form-select"
            style={{ width: '130px' }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px', whiteSpace: 'nowrap' }}>
            <Plus size={14} />
            <span>Add Skill</span>
          </button>
        </form>

        {/* Minimalist Skills Grid (No progress bars) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {skills.map((sk) => (
            <div
              key={sk.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dark)', display: 'block' }}>
                  {sk.name}
                </span>
                <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                  {sk.category || 'Competency'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderProficiencyDots(sk.proficiency || 'Intermediate')}
                <button
                  type="button"
                  onClick={() => onDeleteSkill && onDeleteSkill(sk.id)}
                  className="minimal-del-btn"
                  title="Remove Skill"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '12px' }}>
              No skills added yet. Add your first programming language or tool above!
            </div>
          )}
        </div>
      </div>

      {/* Courses & Certifications Section */}
      <div>
        <div className="view-header">
          <div className="view-title-wrap">
            <h2 className="view-main-title">Courses</h2>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddCourse}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>

        {/* Minimalist Course Cards Grid */}
        <div className="grid-cards">
          {courses.map((c) => {
            const isDone = c.status === 'completed' || Number(c.progress) === 100;

            return (
              <div key={c.id} className="exam-card-pro">
                <div className="exam-card-pro-top">
                  <span className="badge-tag tech">{c.platform || 'Online Course'}</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {c.certificateUrl && (
                      <a
                        href={c.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-arrow-btn"
                        title="View Verified Credential"
                      >
                        <Award size={13} color="#20C978" />
                      </a>
                    )}
                    <button
                      type="button"
                      className="icon-arrow-btn"
                      onClick={() => onDeleteCourse && onDeleteCourse(c.id)}
                      title="Delete Course"
                    >
                      <Trash2 size={13} color="#FF754C" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="exam-title-pro">{c.title}</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Instructor: <b>{c.instructor || 'Self-Paced'}</b> | {c.category || 'General'}
                  </p>
                </div>

                {/* Minimalist Status Badge Row (No chunky progress bar) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card-subtle)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isDone ? (
                      <CheckCircle2 size={14} color="#20C978" />
                    ) : (
                      <Clock size={14} color="var(--primary)" />
                    )}
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: isDone ? '#20C978' : 'var(--primary)' }}>
                      {isDone ? 'Curriculum Completed' : 'In Active Progress'}
                    </span>
                  </div>

                  <span className="minimal-topic-chip" style={{ fontSize: '10px' }}>
                    {c.category || 'Course'}
                  </span>
                </div>

                {c.keyLearnings && (
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dark)', background: 'var(--bg-card-subtle)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <b style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                      Key Architectural Takeaways:
                    </b>
                    {c.keyLearnings}
                  </div>
                )}
              </div>
            );
          })}

          {courses.length === 0 && (
            <div className="exam-empty-box">
              <BookOpen size={36} color="var(--primary)" />
              <h3 style={{ fontSize: '15px', fontWeight: '800', marginTop: '10px' }}>
                No courses tracked yet
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Track video courses, university specializations, and verified certificates.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenAddCourse}
                style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={14} />
                <span>Add Course</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
