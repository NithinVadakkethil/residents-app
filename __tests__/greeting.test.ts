import { getGreeting } from '../src/utils/greeting';

describe('Greeting Utility', () => {
  it('returns "Good Morning," for hours between 5:00 and 11:59', () => {
    const morningDate = new Date(2026, 10, 20, 8, 30);
    expect(getGreeting(morningDate)).toBe('Good Morning,');

    const earlyMorning = new Date(2026, 10, 20, 5, 0);
    expect(getGreeting(earlyMorning)).toBe('Good Morning,');
  });

  it('returns "Good Afternoon," for hours between 12:00 and 16:59', () => {
    const noon = new Date(2026, 10, 20, 12, 0);
    expect(getGreeting(noon)).toBe('Good Afternoon,');

    const afternoon = new Date(2026, 10, 20, 15, 45);
    expect(getGreeting(afternoon)).toBe('Good Afternoon,');
  });

  it('returns "Good Evening," for hours between 17:00 and 4:59', () => {
    const evening = new Date(2026, 10, 20, 18, 0);
    expect(getGreeting(evening)).toBe('Good Evening,');

    const night = new Date(2026, 10, 20, 22, 15);
    expect(getGreeting(night)).toBe('Good Evening,');

    const lateNight = new Date(2026, 10, 20, 2, 0);
    expect(getGreeting(lateNight)).toBe('Good Evening,');
  });
});
