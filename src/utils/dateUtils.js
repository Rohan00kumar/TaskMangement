// Dynamic date utilities for correlated future and live schedules

/**
 * Returns an ISO date string (YYYY-MM-DD) offset by `days` from today.
 * e.g. getRelativeDate(10) -> date 10 days in future
 *      getRelativeDate(-5) -> date 5 days in past
 */
export const getRelativeDate = (days = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

/**
 * Calculate difference in calendar days from today.
 * Positive = future, 0 = today, Negative = past
 */
export const getDaysDiff = (dateStr) => {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Check if an application registration window is currently live (open right now).
 */
export const isRegistrationLive = (regStart, regEnd) => {
  if (!regEnd) return false;
  const daysToEnd = getDaysDiff(regEnd);
  if (daysToEnd === null || daysToEnd < 0) return false;
  
  if (regStart) {
    const daysToStart = getDaysDiff(regStart);
    if (daysToStart !== null && daysToStart > 0) return false; // hasn't opened yet
  }
  
  return true; // registration is currently open!
};

/**
 * Cleanly format date without bullets or confusing symbols.
 */
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'TBA';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

