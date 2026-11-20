/**
 * Hook: useAmenitySlots
 * Queries available and booked slots for a specific date
 */

import { useQuery } from '@tanstack/react-query';
import { amenitiesApi } from '../api/amenities.api';
import { amenityKeys } from '../api/amenities.keys';
import { mapSlotDtoToAmenitySlot } from '../utils/amenityMapper';
import { AmenitySlot } from '../types';

export interface UseAmenitySlotsResult {
  slots: AmenitySlot[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  isFetching: boolean;
}

export function useAmenitySlots(assetId: string, date: string): UseAmenitySlotsResult {
  const isEnabled = Boolean(assetId && date);

  const query = useQuery({
    queryKey: amenityKeys.slots(assetId, date),
    queryFn: async () => {
      const response = await amenitiesApi.getAssetSlots(assetId, date);
      return response;
    },
    enabled: isEnabled,
    staleTime: 1000 * 30, // 30 seconds for live availability
    retry: 1,
  });

  const rawSlots = query.data?.data || query.data?.slots || [];
  const slots = rawSlots.map(mapSlotDtoToAmenitySlot);

  return {
    slots,
    isLoading: query.isLoading && isEnabled,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
