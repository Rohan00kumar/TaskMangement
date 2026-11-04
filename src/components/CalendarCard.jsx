import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarCard({
  viewDate = new Date(),
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  markedDays = []
}) {
  const safeDate = viewDate instanceof Date ? viewDate : new Date(viewDate);
  const year = safeDate.getFullYear();
  const month = safeDate.getMonth();

  const monthYearLabel = safeDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Calculate days in month & first weekday
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Build grid items
  const gridItems = [];

  // 1. Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    gridItems.push({
      day: daysInPrevMonth - i,
      muted: true
    });
  }

  // 2. Current month days
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDateNum = today.getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === todayDateNum;
    const isSelected = selectedDay === d;
    const isMarked = markedDays.includes(d);

    gridItems.push({
      day: d,
      muted: false,
      isToday,
      isSelected,
      isMarked
    });
  }

  // 3. Next month leading days to fill exact grid rows (multiples of 7)
  const totalSlots = Math.ceil(gridItems.length / 7) * 7;
  const paddingNeeded = totalSlots - gridItems.length;
  for (let i = 1; i <= paddingNeeded; i++) {
    gridItems.push({
      day: i,
      muted: true
    });
  }

  return (
    <div className="card-panel calendar-card">
      <div className="calendar-header">
        <h4 className="calendar-month-title">{monthYearLabel}</h4>
        <div className="calendar-arrows">
          <button className="icon-arrow-btn" onClick={onPrevMonth} title="Previous Month">
            <ChevronLeft size={14} />
          </button>
          <button className="icon-arrow-btn" onClick={onNextMonth} title="Next Month">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekdays.map((w, idx) => (
          <div key={idx} className="cal-weekday">
            {w}
          </div>
        ))}

        {gridItems.map((item, idx) => {
          let classes = 'cal-day';
          if (item.muted) classes += ' muted';
          if (item.isSelected) classes += ' active';
          else if (item.isToday) classes += ' today-badge';

          return (
            <div
              key={idx}
              className={classes}
              onClick={() => {
                if (!item.muted && onSelectDay) {
                  onSelectDay(item.day);
                }
              }}
            >
              <span>{item.day}</span>
              {item.isMarked && !item.muted && (
                <span className="cal-event-dot" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
