/**
 * Hook: useAmenities
 * Queries resident amenities via TanStack Query
 */

import { useQuery } from '@tanstack/react-query';
import { amenitiesApi } from '../api/amenities.api';
import { amenityKeys } from '../api/amenities.keys';
import { AssetListParams } from '../api/amenities.dto';
import { mapAssetDtoToAmenity } from '../utils/amenityMapper';
import { Amenity } from '../types';

export interface UseAmenitiesResult {
  amenities: Amenity[];
  total: number;
  currentPage: number;
  lastPage: number;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  isFetching: boolean;
}

export function useAmenities(params?: AssetListParams): UseAmenitiesResult {
  const query = useQuery({
    queryKey: amenityKeys.list(params as Record<string, unknown>),
    queryFn: async () => {
      const response = await amenitiesApi.getAssets(params);
      return response;
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
    retry: 1,
  });

  const rawData = query.data?.data || [];
  const amenities = rawData.map(mapAssetDtoToAmenity);

  return {
    amenities,
    total: query.data?.total || amenities.length,
    currentPage: query.data?.current_page || 1,
    lastPage: query.data?.last_page || 1,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
