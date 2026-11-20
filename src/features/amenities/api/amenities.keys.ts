/**
 * Centralized Query Keys for Amenities & Bookings
 */

export const amenityKeys = {
  all: ['amenities'] as const,
  lists: () => [...amenityKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...amenityKeys.lists(), { ...(filters || {}) }] as const,
  details: () => [...amenityKeys.all, 'detail'] as const,
  detail: (assetId: string) => [...amenityKeys.details(), assetId] as const,
  slotsAll: () => [...amenityKeys.all, 'slots'] as const,
  slots: (assetId: string, date: string) =>
    [...amenityKeys.slotsAll(), assetId, date] as const,
};
