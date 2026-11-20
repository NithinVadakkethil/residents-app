/**
 * Building API Abstraction Layer
 * Communicates with backend endpoints or localized development mocks
 */

import { useQuery } from '@tanstack/react-query';
import { ResidentBuilding } from '../types';
import { MOCK_BUILDINGS } from '../mocks/buildings.mock';

export const BUILDINGS_QUERY_KEY = ['resident', 'buildings'] as const;

/**
 * Fetch list of properties linked to authenticated resident
 */
export async function fetchResidentBuildings(): Promise<ResidentBuilding[]> {
  // Simulated network latency
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 300));

  // When backend endpoint GET /tenant/buildings is ready:
  // const response = await apiClient.get<ResidentBuilding[]>('/tenant/buildings');
  // return response.data;

  return MOCK_BUILDINGS;
}

/**
 * React Query hook for resident buildings
 */
export function useResidentBuildingsQuery() {
  return useQuery({
    queryKey: BUILDINGS_QUERY_KEY,
    queryFn: fetchResidentBuildings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
