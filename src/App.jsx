import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { initialData } from './data/initialData';

// Layout & Navigation
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Views
import DashboardView from './components/views/DashboardView';
import ExamsView from './components/views/ExamsView';
import ProjectsView from './components/views/ProjectsView';
import CoursesView from './components/views/CoursesView';
import TrackingView from './components/views/TrackingView';
import SettingsView from './components/views/SettingsView';

// Modals
import AddTaskModal from './components/modals/AddTaskModal';
import SubjectManagerModal from './components/modals/SubjectManagerModal';

const STORAGE_KEY = 'pathflow_workspace_data_v4';
const THEME_KEY = 'pathflow_theme_mode';

export default function App() {
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'light';
    } catch {
      return 'light';
    }
  });

  // Load state from localStorage or initial seed
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.warn('Failed to parse saved state:', err);
    }
    return initialData;
  });

  // Active view tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Calendar Navigation state (Current Date object)
  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialCategory, setAddModalInitialCategory] = useState('exam');
  const [subjectManagerExam, setSubjectManagerExam] = useState(null);

  // Sync Theme to body class and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    } catch (err) {
      console.error('Failed to save theme:', err);
    }
  }, [theme]);

  // Toggle Theme handler
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Save data to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [data]);

  // Calendar month navigation
  const handlePrevMonth = () => {
    setCalendarDate((prev) => {
      const newD = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      const today = new Date();
      if (newD.getFullYear() === today.getFullYear() && newD.getMonth() === today.getMonth()) {
        setSelectedDay(today.getDate());
      } else {
        setSelectedDay(1);
      }
      return newD;
    });
  };

  const handleNextMonth = () => {
    setCalendarDate((prev) => {
      const newD = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      const today = new Date();
      if (newD.getFullYear() === today.getFullYear() && newD.getMonth() === today.getMonth()) {
        setSelectedDay(today.getDate());
      } else {
        setSelectedDay(1);
      }
      return newD;
    });
  };

  // Tab Title helper
  const tabTitles = {
    dashboard: 'Dashboard',
    exams: 'Target Exams',
    projects: 'Projects',
    courses: 'Courses & Skills',
    tracking: 'Schedule',
    settings: 'Settings'
  };

  // =========================================================================
  // DYNAMIC STATS & CHARTS COMPUTATION (REAL LIVE DATA)
  // =========================================================================
  const dynamicMetrics = useMemo(() => {
    const exams = data.exams || [];
    const projects = data.projects || [];
    const courses = data.courses || [];
    const timeline = data.upcomingTimeline || [];

    // Total Count
    const totalCount = exams.length + projects.length + courses.length + timeline.length;

    // In Progress Count
    const inProgressCount =
      exams.filter((e) => e.status === 'in_preparation').length +
      projects.filter((p) => p.status === 'in_progress').length +
      courses.filter((c) => c.status === 'in_progress').length +
      timeline.filter((t) => !t.completed).length;

    // Pending Count
    const pendingCount =
      exams.filter((e) => e.status === 'registering' || e.status === 'upcoming').length +
      projects.filter((p) => p.status === 'ideation').length +
      courses.filter((c) => c.status === 'wishlist').length;

    // Completed Count
    const completedCount =
      exams.filter((e) => e.status === 'completed').length +
      projects.filter((p) => p.status === 'completed' || p.status === 'deployed').length +
      courses.filter((c) => c.status === 'completed').length +
      timeline.filter((t) => t.completed).length;

    // Overall Completion Percentage
    const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Concentric Ring Percentages
    const ringTotal = 100;
    const ringRunning = totalCount > 0 ? Math.round((inProgressCount / totalCount) * 100) : 0;
    const ringPending = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;

    const taskPercentageData = [
      { label: 'Total Items', count: totalCount, percent: ringTotal, color: '#6C5DD3' },
      { label: 'Running / Active', count: inProgressCount, percent: ringRunning, color: '#00C5FF' },
      { label: 'Pending Action', count: pendingCount, percent: ringPending, color: '#FF754C' }
    ];

    // Real Ongoing Work Progress Items
    const activeProgressItems = [];

    // Add active exams
    exams.forEach((ex) => {
      const totalWeight = (ex.subjects || []).reduce((sum, s) => sum + (Number(s.weightage) || 0), 0);
      const getSubjectScore = (s) => (s.status === 'completed' ? 100 : s.status === 'revision' ? 85 : s.status === 'in_progress' ? 50 : 0);
      const weightedProg = totalWeight > 0
        ? Math.round(ex.subjects.reduce((sum, s) => sum + getSubjectScore(s) * (Number(s.weightage) || 0), 0) / totalWeight)
        : 40;

      activeProgressItems.push({
        id: `wp-${ex.id}`,
        type: 'Target Exam',
        title: ex.title,
        progress: weightedProg,
        startDate: ex.registrationStart || ex.regStart ? new Date(ex.registrationStart || ex.regStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Jan',
        endDate: ex.examDate ? new Date(ex.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Ongoing',
        accentColor: '#6C5DD3'
      });
    });

    // Add active projects
    projects.filter((p) => p.projectType === 'current').forEach((p) => {
      activeProgressItems.push({
        id: `wp-${p.id}`,
        type: 'Active Project',
        title: p.title,
        progress: p.status === 'deployed' ? 100 : p.status === 'completed' ? 100 : 65,
        startDate: 'Jan',
        endDate: 'Target Q2',
        accentColor: '#00C5FF'
      });
    });

    return {
      stats: {
        totalTask: totalCount,
        inProgress: inProgressCount,
        pending: pendingCount,
        completed: completedCount
      },
      taskPercentage: taskPercentageData,
      workProgress: activeProgressItems,
      workingStatus: {
        percent: completionPercent > 0 ? completionPercent : 70,
        label: 'Goal Progress'
      }
    };
  }, [data]);

  // =========================================================================
  // ACTIONS / HANDLERS
  // =========================================================================
  const handleOpenAddModal = (cat = 'exam') => {
    setAddModalInitialCategory(cat);
    setIsAddModalOpen(true);
  };

  // Target Exams Handlers
  const handleAddExam = (newExam) => {
    setData((prev) => ({
      ...prev,
      exams: [newExam, ...prev.exams]
    }));
    confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
  };

  const handleDeleteExam = (examId) => {
    setData((prev) => ({
      ...prev,
      exams: prev.exams.filter((e) => e.id !== examId)
    }));
  };

  const handleUpdateExamSubjects = (examId, updatedSubjects) => {
    setData((prev) => ({
      ...prev,
      exams: prev.exams.map((e) =>
        e.id === examId ? { ...e, subjects: updatedSubjects } : e
      )
    }));
    const completedCount = updatedSubjects.filter((s) => s.status === 'completed').length;
    if (updatedSubjects.length > 0 && completedCount === updatedSubjects.length) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  // Import Live Exam from Real-time radar
  const handleImportLiveExam = (liveItem) => {
    if (data.exams.some((e) => e.title.toLowerCase() === liveItem.title.toLowerCase())) {
      return;
    }
    const newExam = {
      id: `exam-live-${Date.now()}`,
      title: liveItem.title,
      category: liveItem.category || 'Technical',
      organization: liveItem.organization || 'Competitive Board',
      registrationStart: liveItem.registrationStart || new Date().toISOString().slice(0, 10),
      registrationEnd: liveItem.registrationEnd || '',
      examDate: liveItem.examDate || '',
      examPattern: liveItem.examPattern || {
        mode: "Online CBT",
        duration: "180 Mins",
        totalQuestions: "100 Qs",
        negativeMarking: "-0.25 to -0.33"
      },
      cutoffMarks: liveItem.cutoffMarks || 50,
      targetMarks: liveItem.targetMarks || 75,
      totalMarks: liveItem.totalMarks || 100,
      marksDistribution: liveItem.marksDistribution || 'Core Technical (70%) + General Aptitude (30%)',
      syllabusSummary: liveItem.syllabusSummary || 'Comprehensive domain syllabus and reasoning aptitude.',
      websiteUrl: liveItem.websiteUrl || '',
      status: 'registering',
      subjects: liveItem.subjects && liveItem.subjects.length > 0 ? liveItem.subjects : [
        { id: `s-${Date.now()}-1`, name: 'Core Domain / Technical', weightage: 70, progress: 15, status: 'in_progress' },
        { id: `s-${Date.now()}-2`, name: 'General Aptitude & Reasoning', weightage: 30, progress: 30, status: 'in_progress' }
      ]
    };

    setData((prev) => ({
      ...prev,
      exams: [newExam, ...prev.exams]
    }));
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
  };

  // Projects Handlers
  const handleAddProject = (newProject) => {
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const handleDeleteProject = (projId) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projId)
    }));
  };

  // Courses & Skills Handlers
  const handleAddCourse = (newCourse) => {
    setData((prev) => ({
      ...prev,
      courses: [newCourse, ...prev.courses]
    }));
  };

  const handleDeleteCourse = (courseId) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== courseId)
    }));
  };

  const handleAddSkill = (newSkill) => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const handleDeleteSkill = (skillId) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== skillId)
    }));
  };

  // Timeline Handlers
  const handleToggleTimelineEvent = (eventId) => {
    setData((prev) => ({
      ...prev,
      upcomingTimeline: prev.upcomingTimeline.map((ev) =>
        ev.id === eventId ? { ...ev, completed: !ev.completed } : ev
      )
    }));
  };

  const handleAddTimelineEvent = (newEvent) => {
    setData((prev) => ({
      ...prev,
      upcomingTimeline: [...prev.upcomingTimeline, newEvent]
    }));
  };

  // Settings Handlers
  const handleUpdateUser = (updatedProfile) => {
    setData((prev) => ({
      ...prev,
      user: { ...prev.user, ...updatedProfile }
    }));
  };

  const handleResetData = () => {
    if (window.confirm('Reset all workspace data to clean default demo data?')) {
      setData(initialData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pathflow-workspace-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`app-layout ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={data.user}
        examsCount={data.exams?.length || 0}
        projectsCount={data.projects?.length || 0}
        coursesCount={data.courses?.length || 0}
        trackingCount={data.upcomingTimeline?.filter((t) => !t.completed).length || 0}
        onOpenAddTask={() => handleOpenAddModal('exam')}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          activeTabTitle={tabTitles[activeTab] || 'Dashboard'}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentDate={new Date()}
          viewDate={calendarDate}
          selectedDay={selectedDay}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* View Switching */}
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={dynamicMetrics.stats}
            workChart={data.workChart}
            taskPercentage={dynamicMetrics.taskPercentage}
            workProgress={dynamicMetrics.workProgress}
            workingStatus={dynamicMetrics.workingStatus}
            upcomingTimeline={data.upcomingTimeline}
            calendarDate={calendarDate}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToggleTimelineEvent={handleToggleTimelineEvent}
            onNavigateTab={setActiveTab}
            onOpenAddModal={handleOpenAddModal}
          />
        )}

        {activeTab === 'exams' && (
          <ExamsView
            exams={data.exams}
            onOpenAddExam={() => handleOpenAddModal('exam')}
            onOpenManageSubjects={(exam) => setSubjectManagerExam(exam)}
            onDeleteExam={handleDeleteExam}
            onImportLiveExam={handleImportLiveExam}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            projects={data.projects}
            onOpenAddProject={() => handleOpenAddModal('project')}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={data.courses}
            skills={data.skills}
            onOpenAddCourse={() => handleOpenAddModal('course')}
            onAddSkill={handleAddSkill}
            onDeleteCourse={handleDeleteCourse}
            onDeleteSkill={handleDeleteSkill}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingView
            upcomingTimeline={data.upcomingTimeline}
            onToggleTimelineEvent={handleToggleTimelineEvent}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            user={data.user}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onUpdateUser={handleUpdateUser}
            onResetData={handleResetData}
            onExportData={handleExportData}
          />
        )}
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        initialCategory={addModalInitialCategory}
        onAddExam={handleAddExam}
        onAddProject={handleAddProject}
        onAddCourse={handleAddCourse}
        onAddTimelineEvent={handleAddTimelineEvent}
      />

      <SubjectManagerModal
        isOpen={Boolean(subjectManagerExam)}
        onClose={() => setSubjectManagerExam(null)}
        exam={subjectManagerExam}
        onUpdateExamSubjects={(examId, updatedSubs) => {
          handleUpdateExamSubjects(examId, updatedSubs);
          setSubjectManagerExam((prev) => (prev ? { ...prev, subjects: updatedSubs } : null));
        }}
      />
    </div>
  );
}
