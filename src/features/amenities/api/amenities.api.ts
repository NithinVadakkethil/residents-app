/**
 * Amenities Feature API Layer
 * Connects directly to backend resident endpoints:
 * - GET /assets
 * - GET /assets/{id}/slots
 * - POST /assets/{id}/bookings
 */

import { apiClient } from '../../../services/api/client';
import {
  AssetListParams,
  AssetListResponseDto,
  AssetSlotsResponseDto,
  CreateBookingPayloadDto,
  CreateBookingResponseDto,
} from './amenities.dto';

export const amenitiesApi = {
  /**
   * Fetch resident amenities / assets
   */
  async getAssets(params?: AssetListParams): Promise<AssetListResponseDto> {
    const response = await apiClient.get<AssetListResponseDto | any[]>('/assets', {
      params: {
        page: params?.page ?? 1,
        per_page: params?.per_page ?? 15,
        ...(params?.search ? { search: params.search } : {}),
      },
    });

    // Normalize if backend returns a direct array instead of paginated object
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        total: response.data.length,
        current_page: 1,
        last_page: 1,
      };
    }

    return response.data;
  },

  /**
   * Fetch available slots for an asset on a given date (YYYY-MM-DD)
   */
  async getAssetSlots(assetId: string, date: string): Promise<AssetSlotsResponseDto> {
    const response = await apiClient.get<AssetSlotsResponseDto | any[]>(
      `/assets/${assetId}/slots`,
      {
        params: { date },
      }
    );

    // Normalize if backend returns a direct array of slots
    if (Array.isArray(response.data)) {
      return { data: response.data };
    }

    return response.data;
  },

  /**
   * Submit booking for an asset
   */
  async createBooking(
    assetId: string,
    payload: CreateBookingPayloadDto
  ): Promise<CreateBookingResponseDto> {
    const response = await apiClient.post<CreateBookingResponseDto>(
      `/assets/${assetId}/bookings`,
      payload
    );
    return response.data;
  },
};
