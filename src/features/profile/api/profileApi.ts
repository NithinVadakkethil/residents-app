/**
 * Profile API Abstraction Layer
 * Communicates with backend endpoints or localized development mocks
 */

import { useQuery } from '@tanstack/react-query';
import { ResidentProfile, MOCK_RESIDENT_PROFILE } from '../mocks/resident.mock';

export const PROFILE_QUERY_KEY = ['resident', 'profile'] as const;

/**
 * Fetch authenticated resident profile
 */
export async function fetchResidentProfile(): Promise<ResidentProfile> {
  // Simulated network latency
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 300));

  // When backend endpoint GET /tenant/profile is ready:
  // const response = await apiClient.get<ResidentProfile>('/tenant/profile');
  // return response.data;

  return MOCK_RESIDENT_PROFILE;
}

/**
 * React Query hook for resident profile
 */
export function useResidentProfileQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchResidentProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
