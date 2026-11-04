import React from 'react';
import { Search, Calendar, ChevronLeft, ChevronRight, Menu, Sun, Moon } from 'lucide-react';

export default function Header({
  activeTabTitle = 'Dashboard',
  searchTerm,
  setSearchTerm,
  currentDate = new Date(),
  viewDate = new Date(),
  selectedDay,
  theme = 'light',
  onToggleTheme,
  onPrevMonth,
  onNextMonth,
  onOpenMobileMenu
}) {
  // Format today's date or active selected date
  const displayDate = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    selectedDay || currentDate.getDate()
  );

  const fullDateStr = displayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const shortDateStr = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const monthYearStr = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="mobile-menu-toggle"
          onClick={onOpenMobileMenu}
          title="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="header-title">{activeTabTitle}</h1>
          <p className="header-subtitle">{fullDateStr}</p>
        </div>
      </div>

      <div className="header-center">
        <div className="search-pill-box">
          <Search size={16} color="#808191" />
          <input
            type="text"
            placeholder="Search exams, projects, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        {/* Theme Toggle Button (Light / Dark Mode) */}
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun size={16} color="#FFB800" />
          ) : (
            <Moon size={16} color="#6C5DD3" />
          )}
          <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <div className="date-chip">
          <Calendar size={14} color="#6C5DD3" />
          <span>Today: {shortDateStr}</span>
        </div>

        <div className="month-nav-box">
          <span>{monthYearStr}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="icon-arrow-btn" onClick={onPrevMonth} title="Previous Month">
              <ChevronLeft size={14} />
            </button>
            <button className="icon-arrow-btn" onClick={onNextMonth} title="Next Month">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
