import {
  formatApiDate,
  formatDisplayDate,
  formatShortDisplayDate,
  parseApiDate,
  generateUpcomingDates,
} from '../src/features/amenities/utils/bookingDate';

describe('bookingDate utilities', () => {
  it('formats Date into YYYY-MM-DD using local calendar values', () => {
    const d = new Date(2026, 8, 12, 23, 45); // Sep 12, 2026 late night
    const apiDate = formatApiDate(d);
    expect(apiDate).toBe('2026-09-12');
  });

  it('parses YYYY-MM-DD safely into mid-day Date to prevent timezone rollover', () => {
    const d = parseApiDate('2026-11-20');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(10); // 0-indexed: 10 is November
    expect(d.getDate()).toBe(20);
    expect(d.getHours()).toBe(12);
  });

  it('formats YYYY-MM-DD into human-readable display date', () => {
    // 2026-09-12 is Saturday
    const formatted = formatDisplayDate('2026-09-12');
    expect(formatted).toBe('Sat, 12 Sep 2026');
  });

  it('formats short display date', () => {
    const formatted = formatShortDisplayDate('2026-09-12');
    expect(formatted).toBe('Sat, 12 Sep');
  });

  it('generates upcoming sequence of bookable calendar dates', () => {
    const count = 7;
    const dates = generateUpcomingDates(count);

    expect(dates).toHaveLength(count);
    expect(dates[0].isToday).toBe(true);
    expect(dates[1].isToday).toBe(false);

    // Format should strictly be YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    dates.forEach((item) => {
      expect(item.dateStr).toMatch(regex);
    });
  });
});
