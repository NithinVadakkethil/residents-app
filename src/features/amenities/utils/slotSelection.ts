/**
 * Consecutive Slot Selection & Validation Utilities
 * Ensures residents only submit continuous, consecutive booking intervals
 */

import { AmenitySlot } from '../types';

export interface SlotValidationResult {
  isValid: boolean;
  startTime: string;
  endTime: string;
  slotCount: number;
  formattedRange: string;
  errorMessage?: string;
}

/**
 * Normalizes time string "07:00:00" -> "07:00"
 */
export function normalizeTime(time: string): string {
  const parts = time.split(':');
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  }
  return time;
}

/**
 * Converts "07:00" to minutes from midnight for interval math
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map((val) => parseInt(val, 10));
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Formats "07:00" to "07:00 AM"
 */
export function formatTimeAmPm(time: string): string {
  const [hStr, mStr] = time.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // 0 becomes 12
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

/**
 * Validates whether the selected slot IDs form a valid, continuous consecutive range
 */
export function validateConsecutiveSlots(
  allSlots: AmenitySlot[],
  selectedSlotIds: string[]
): SlotValidationResult {
  if (selectedSlotIds.length === 0) {
    return {
      isValid: false,
      startTime: '',
      endTime: '',
      slotCount: 0,
      formattedRange: '',
      errorMessage: 'Please select at least one time slot.',
    };
  }

  // Filter selected slots and sort them by start time
  const selectedSlots = allSlots
    .filter((s) => selectedSlotIds.includes(s.id))
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  if (selectedSlots.length !== selectedSlotIds.length) {
    return {
      isValid: false,
      startTime: '',
      endTime: '',
      slotCount: 0,
      formattedRange: '',
      errorMessage: 'One or more selected slots are invalid.',
    };
  }

  // Verify none are booked or disabled
  for (const slot of selectedSlots) {
    if (!slot.isAvailable || slot.status === 'BOOKED' || slot.status === 'DISABLED') {
      return {
        isValid: false,
        startTime: '',
        endTime: '',
        slotCount: 0,
        formattedRange: '',
        errorMessage: 'One or more selected slots are unavailable.',
      };
    }
  }

  // Check consecutiveness
  for (let i = 0; i < selectedSlots.length - 1; i++) {
    const currentEnd = timeToMinutes(selectedSlots[i].endTime);
    const nextStart = timeToMinutes(selectedSlots[i + 1].startTime);

    if (currentEnd !== nextStart) {
      return {
        isValid: false,
        startTime: '',
        endTime: '',
        slotCount: 0,
        formattedRange: '',
        errorMessage: 'Only consecutive time slots can be booked together.',
      };
    }
  }

  const firstSlot = selectedSlots[0];
  const lastSlot = selectedSlots[selectedSlots.length - 1];
  const startTime = normalizeTime(firstSlot.startTime);
  const endTime = normalizeTime(lastSlot.endTime);
  const formattedRange = `${formatTimeAmPm(startTime)} – ${formatTimeAmPm(endTime)}`;

  return {
    isValid: true,
    startTime,
    endTime,
    slotCount: selectedSlots.length,
    formattedRange,
  };
}

/**
 * Handle user tapping a slot to toggle or extend selection.
 * If user taps an adjacent slot, extends consecutive range.
 * If user taps a disjoint slot, starts a new single-slot selection.
 */
export function handleSlotToggle(
  currentSelectedIds: string[],
  tappedSlotId: string,
  allSlots: AmenitySlot[]
): string[] {
  const slotMap = new Map(allSlots.map((s) => [s.id, s]));
  const tappedSlot = slotMap.get(tappedSlotId);

  if (!tappedSlot || !tappedSlot.isAvailable || tappedSlot.status === 'BOOKED') {
    return currentSelectedIds;
  }

  // If already selected, deselecting:
  if (currentSelectedIds.includes(tappedSlotId)) {
    if (currentSelectedIds.length <= 1) {
      return [];
    }
    // Remove slot and check if remaining are still consecutive
    const remaining = currentSelectedIds.filter((id) => id !== tappedSlotId);
    const validation = validateConsecutiveSlots(allSlots, remaining);
    if (validation.isValid) {
      return remaining;
    }
    // If removing middle breaks consecutiveness, reset to just the clicked slot
    return [tappedSlotId];
  }

  // If nothing selected yet, select tapped slot
  if (currentSelectedIds.length === 0) {
    return [tappedSlotId];
  }

  // Check if adding tapped slot maintains consecutiveness
  const potentialSelection = [...currentSelectedIds, tappedSlotId];
  const validation = validateConsecutiveSlots(allSlots, potentialSelection);

  if (validation.isValid) {
    return potentialSelection;
  }

  // If not consecutive, restart selection from tapped slot
  return [tappedSlotId];
}
