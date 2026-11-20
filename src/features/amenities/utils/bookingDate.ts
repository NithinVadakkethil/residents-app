/**
 * Local Calendar Date Formatting Utilities
 * Prevents UTC timezone shift bugs when submitting booking dates.
 */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Format local Date to API date string: YYYY-MM-DD
 * Uses local getFullYear, getMonth, getDate to avoid UTC shift.
 */
export function formatApiDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string to local Date object (safely at midday)
 */
export function parseApiDate(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return new Date();
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day, 12, 0, 0);
}

/**
 * Format YYYY-MM-DD to human friendly string: "Fri, 12 Sep 2026"
 */
export function formatDisplayDate(dateStr: string): string {
  try {
    const date = parseApiDate(dateStr);
    const dayName = DAYS[date.getDay()];
    const dayNum = date.getDate();
    const monthName = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${dayNum} ${monthName} ${year}`;
  } catch {
    return dateStr;
  }
}

/**
 * Format YYYY-MM-DD to short display string: "Fri, 12 Sep"
 */
export function formatShortDisplayDate(dateStr: string): string {
  try {
    const date = parseApiDate(dateStr);
    const dayName = DAYS[date.getDay()];
    const dayNum = date.getDate();
    const monthName = MONTHS[date.getMonth()];
    return `${dayName}, ${dayNum} ${monthName}`;
  } catch {
    return dateStr;
  }
}

export interface SelectableCalendarDate {
  dateStr: string;     // "YYYY-MM-DD"
  displayDay: string;  // "Fri"
  displayDate: number; // 12
  monthLabel: string;  // "Sep"
  isToday: boolean;
}

/**
 * Generate list of upcoming bookable dates starting from today
 */
export function generateUpcomingDates(count: number = 14): SelectableCalendarDate[] {
  const dates: SelectableCalendarDate[] = [];
  const today = new Date();
  const todayStr = formatApiDate(today);

  for (let i = 0; i < count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 12, 0, 0);
    const dateStr = formatApiDate(d);
    dates.push({
      dateStr,
      displayDay: DAYS[d.getDay()],
      displayDate: d.getDate(),
      monthLabel: MONTHS[d.getMonth()],
      isToday: dateStr === todayStr,
    });
  }

  return dates;
}
