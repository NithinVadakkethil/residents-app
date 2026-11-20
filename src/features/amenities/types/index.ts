/**
 * Amenities & Booking Domain Types
 * Decoupled from backend JSON contracts
 */

export type AmenityCategoryFilter =
  | 'ALL'
  | 'SPORTS'
  | 'RECREATION'
  | 'INDOOR'
  | 'OTHERS';

export type AmenityAvailabilityStatus =
  | 'Available'
  | 'Limited Slots'
  | 'Unavailable';

export interface Amenity {
  id: string;
  name: string;
  category: string;
  location?: string;
  imageUrl?: string;
  isAvailable: boolean;
  availabilityLabel: AmenityAvailabilityStatus;
  capacity?: string;
  courtCount?: string;
  description?: string;
}

export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'DISABLED';

export interface AmenitySlot {
  id: string;
  startTime: string;     // "07:00"
  endTime: string;       // "08:00"
  formattedRange: string; // "07:00 AM – 08:00 AM"
  isAvailable: boolean;
  status: SlotStatus;
}

export interface BookingSubmissionPayload {
  assetId: string;
  date: string;         // "YYYY-MM-DD"
  startTime: string;    // "07:00"
  slots: number;        // consecutive count e.g. 1
  timeRangeText: string;
  amenityName: string;
  buildingName: string;
  unitNumber?: string;
}

export interface BookingConfirmation {
  referenceId?: string;
  amenityName: string;
  buildingName: string;
  unitNumber?: string;
  residentName: string;
  date: string;
  displayDate: string;
  timeWindow: string;
  imageUrl?: string;
}

export interface BookingConflictInfo {
  assetId: string;
  amenityName: string;
  buildingName: string;
  date: string;
  displayDate: string;
  attemptedTimeWindow: string;
  message?: string;
}
