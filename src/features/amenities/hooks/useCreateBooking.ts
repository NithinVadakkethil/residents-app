/**
 * Hook: useCreateBooking
 * Submits booking request with targeted cache invalidation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { amenitiesApi } from '../api/amenities.api';
import { amenityKeys } from '../api/amenities.keys';
import { CreateBookingPayloadDto, CreateBookingResponseDto } from '../api/amenities.dto';

interface UseCreateBookingOptions {
  assetId: string;
  onSuccess?: (data: CreateBookingResponseDto, payload: CreateBookingPayloadDto) => void;
  onError?: (error: unknown, payload: CreateBookingPayloadDto) => void;
}

export function useCreateBooking({ assetId, onSuccess, onError }: UseCreateBookingOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBookingPayloadDto) => {
      return await amenitiesApi.createBooking(assetId, payload);
    },
    onSuccess: (data, payload) => {
      // Invalidate slots for this asset and date
      queryClient.invalidateQueries({
        queryKey: amenityKeys.slots(assetId, payload.date),
      });
      // Invalidate asset list availability
      queryClient.invalidateQueries({
        queryKey: amenityKeys.lists(),
      });

      onSuccess?.(data, payload);
    },
    onError: (error, payload) => {
      // On 409 Conflict, invalidate slots immediately to refresh latest availability
      queryClient.invalidateQueries({
        queryKey: amenityKeys.slots(assetId, payload.date),
      });

      onError?.(error, payload);
    },
  });
}
