/**
 * Greeting Utility
 * Calculates time-appropriate greeting for resident home header
 * Source of Truth: Stitch Screen 04_Home ("Good Evening, Arjun N")
 */

export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning,';
  }
  if (hour >= 12 && hour < 17) {
    return 'Good Afternoon,';
  }
  return 'Good Evening,';
}
