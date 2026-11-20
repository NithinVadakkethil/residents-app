/**
 * Amenity and Slot DTO Mappers
 * Converts raw backend JSON into strongly-typed domain models
 */

import { AssetDto, SlotDto } from '../api/amenities.dto';
import { Amenity, AmenitySlot, AmenityAvailabilityStatus, SlotStatus } from '../types';
import { normalizeTime, formatTimeAmPm } from './slotSelection';

/**
 * Resolves category string from AssetDto
 */
function resolveCategory(dto: AssetDto): string {
  if (typeof dto.category === 'object' && dto.category?.name) {
    return dto.category.name;
  }
  if (typeof dto.category === 'string') {
    return dto.category;
  }
  if (dto.location) {
    return dto.location;
  }
  return 'Recreation';
}

/**
 * Resolves availability status label for Stitch badge
 */
function resolveAvailabilityStatus(dto: AssetDto): AmenityAvailabilityStatus {
  if (dto.status === 'limited' || dto.status === 'limited_slots') {
    return 'Limited Slots';
  }
  if (dto.is_available === false || dto.is_active === false || dto.status === 'inactive') {
    return 'Unavailable';
  }
  return 'Available';
}

/**
 * Map backend AssetDto to domain Amenity model
 */
export function mapAssetDtoToAmenity(dto: AssetDto): Amenity {
  const id = String(dto.id);
  const name = dto.name || dto.title || 'Community Amenity';
  const category = resolveCategory(dto);
  const availabilityLabel = resolveAvailabilityStatus(dto);
  const isAvailable = availabilityLabel !== 'Unavailable';

  const imageUrl =
    dto.image_url ||
    dto.thumbnail_url ||
    dto.image ||
    undefined;

  const capacity = dto.capacity || dto.max_capacity
    ? `Max ${dto.capacity || dto.max_capacity} per slot`
    : undefined;

  const courtCount = dto.court_count
    ? `${dto.court_count} Courts`
    : undefined;

  const description = dto.description || dto.details || undefined;

  return {
    id,
    name,
    category,
    location: dto.location || undefined,
    imageUrl,
    isAvailable,
    availabilityLabel,
    capacity,
    courtCount,
    description,
  };
}

/**
 * Map backend SlotDto to domain AmenitySlot model
 */
export function mapSlotDtoToAmenitySlot(dto: SlotDto, index: number): AmenitySlot {
  const id = dto.id ? String(dto.id) : `slot-${index}-${dto.start_time}`;
  const startTime = normalizeTime(dto.start_time);
  const endTime = normalizeTime(dto.end_time);

  const formattedStart = formatTimeAmPm(startTime);
  const formattedEnd = formatTimeAmPm(endTime);
  const formattedRange = `${formattedStart} – ${formattedEnd}`;

  // Check if slot is available
  let status: SlotStatus = 'AVAILABLE';
  if (dto.status === 'booked' || dto.is_booked === true || dto.available === false || dto.is_available === false) {
    status = 'BOOKED';
  } else if (dto.status === 'disabled') {
    status = 'DISABLED';
  }

  const isAvailable = status === 'AVAILABLE';

  return {
    id,
    startTime,
    endTime,
    formattedRange,
    isAvailable,
    status,
  };
}
