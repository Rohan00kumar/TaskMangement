import React from 'react';
import HeroBanner from '../HeroBanner';
import StatCards from '../StatCards';
import WorkProgress from '../WorkProgress';
import CalendarCard from '../CalendarCard';
import UpcomingTimeline from '../UpcomingTimeline';

export default function DashboardView({
  stats,
  workProgress,
  upcomingTimeline,
  calendarDate,
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  onToggleTimelineEvent,
  onNavigateTab,
  onOpenAddModal
}) {
  return (
    <div className="dashboard-grid">
      {/* Left Column (Main Area 70%) */}
      <div className="dashboard-left-col">
        {/* Clean Hero Welcome Banner */}
        <HeroBanner
          onAddExam={() => onOpenAddModal('exam')}
          onAddProject={() => onOpenAddModal('project')}
        />

        {/* 4 Pastel Gradient Stat Pills */}
        <StatCards
          stats={stats}
          onSelectStat={(statId) => {
            if (statId === 'total') onNavigateTab('projects');
            if (statId === 'in_progress') onNavigateTab('tracking');
            if (statId === 'pending') onNavigateTab('exams');
            if (statId === 'completed') onNavigateTab('courses');
          }}
        />

        {/* Clean Active Focus List (Chart-free, Progress bar-free) */}
        <WorkProgress
          items={workProgress}
          onSeeAll={() => onNavigateTab('projects')}
        />
      </div>

      {/* Right Column (Calendar & Schedule 30%) */}
      <div className="dashboard-right-col">
        <CalendarCard
          viewDate={calendarDate}
          selectedDay={selectedDay}
          onSelectDay={onSelectDay}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
        />
        <UpcomingTimeline
          events={upcomingTimeline}
          currentDate={calendarDate}
          selectedDay={selectedDay}
          onToggleEvent={onToggleTimelineEvent}
          onAddMilestone={() => onOpenAddModal('event')}
        />
      </div>
    </div>
  );
}
