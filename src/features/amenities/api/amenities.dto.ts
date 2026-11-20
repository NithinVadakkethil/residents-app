/**
 * Amenities API DTOs (Data Transfer Objects)
 * Endpoints:
 * - GET /assets (Resident assets catalog)
 * - GET /assets/{id}/slots (Date slot availability)
 * - POST /assets/{id}/bookings (Create booking)
 */

export interface AssetListParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface AssetCategoryDto {
  id?: string | number;
  name?: string;
  slug?: string;
}

export interface AssetBuildingDto {
  id?: string | number;
  name?: string;
}

export interface AssetDto {
  id: string | number;
  name: string;
  title?: string;
  category?: AssetCategoryDto | string | null;
  location?: string | null;
  building?: AssetBuildingDto | string | null;
  building_id?: string | number | null;
  image_url?: string | null;
  thumbnail_url?: string | null;
  image?: string | null;
  is_active?: boolean;
  is_available?: boolean;
  status?: string;
  capacity?: number | string | null;
  max_capacity?: number | string | null;
  court_count?: number | string | null;
  description?: string | null;
  details?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AssetPaginationMetaDto {
  current_page?: number;
  from?: number | null;
  last_page?: number;
  per_page?: number;
  to?: number | null;
  total?: number;
}

export interface AssetListResponseDto {
  data: AssetDto[];
  meta?: AssetPaginationMetaDto;
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
}

export interface SlotDto {
  id?: string | number;
  start_time: string; // e.g. "06:00:00" or "06:00"
  end_time: string;   // e.g. "07:00:00" or "07:00"
  is_available?: boolean;
  available?: boolean;
  is_booked?: boolean;
  status?: 'available' | 'booked' | 'disabled' | string;
  capacity_left?: number;
}

export interface AssetSlotsResponseDto {
  data?: SlotDto[];
  slots?: SlotDto[];
}

export interface CreateBookingPayloadDto {
  date: string;       // "YYYY-MM-DD"
  start_time: string; // "HH:MM" e.g. "07:00"
  slots: number;      // consecutive count e.g. 1 or 2
}

export interface CreateBookingResponseDto {
  id?: string | number;
  booking_id?: string | number;
  reference_id?: string;
  code?: string;
  status?: string;
  message?: string;
  data?: {
    id?: string | number;
    reference_id?: string;
    code?: string;
    date?: string;
    start_time?: string;
    slots?: number;
  };
}
