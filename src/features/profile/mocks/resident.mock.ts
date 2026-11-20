/**
 * Centralized Temporary Development Mock: Resident Profile
 * 
 * =========================================================================
 * ARCHITECTURAL NOTICE: TEMPORARY DEVELOPMENT MOCK
 * =========================================================================
 * This mock provides initial resident profile data matching
 * Stitch Project 13242428547386138499 (Screen 04_Home, 09_Profile).
 * When backend endpoint GET /tenant/profile is provided, replace calls
 * to this mock in `src/features/profile/api/profileApi.ts`.
 * =========================================================================
 */

export interface ResidentProfile {
  id: string;
  name: string;
  greetingName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  unreadNotificationsCount: number;
}

export const MOCK_RESIDENT_PROFILE: ResidentProfile = {
  id: 'res-arjun-941',
  name: 'Arjun N',
  greetingName: 'Arjun N',
  email: 'arjun@example.com',
  phone: '+1 (555) 234-5678',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  unreadNotificationsCount: 3,
};
