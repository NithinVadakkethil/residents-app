import {
  validateConsecutiveSlots,
  handleSlotToggle,
} from '../src/features/amenities/utils/slotSelection';
import { AmenitySlot } from '../src/features/amenities/types';

describe('slotSelection utilities', () => {
  const sampleSlots: AmenitySlot[] = [
    {
      id: 's1',
      startTime: '06:00',
      endTime: '07:00',
      formattedRange: '06:00 AM – 07:00 AM',
      isAvailable: true,
      status: 'AVAILABLE',
    },
    {
      id: 's2',
      startTime: '07:00',
      endTime: '08:00',
      formattedRange: '07:00 AM – 08:00 AM',
      isAvailable: true,
      status: 'AVAILABLE',
    },
    {
      id: 's3',
      startTime: '08:00',
      endTime: '09:00',
      formattedRange: '08:00 AM – 09:00 AM',
      isAvailable: true,
      status: 'AVAILABLE',
    },
    {
      id: 's4',
      startTime: '09:00',
      endTime: '10:00',
      formattedRange: '09:00 AM – 10:00 AM',
      isAvailable: false,
      status: 'BOOKED',
    },
    {
      id: 's5',
      startTime: '10:00',
      endTime: '11:00',
      formattedRange: '10:00 AM – 11:00 AM',
      isAvailable: true,
      status: 'AVAILABLE',
    },
  ];

  describe('validateConsecutiveSlots', () => {
    it('returns invalid when no slot is selected', () => {
      const result = validateConsecutiveSlots(sampleSlots, []);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Please select at least one time slot.');
    });

    it('validates single available slot successfully', () => {
      const result = validateConsecutiveSlots(sampleSlots, ['s2']);
      expect(result.isValid).toBe(true);
      expect(result.startTime).toBe('07:00');
      expect(result.endTime).toBe('08:00');
      expect(result.slotCount).toBe(1);
      expect(result.formattedRange).toBe('07:00 AM – 08:00 AM');
    });

    it('validates two consecutive slots successfully', () => {
      const result = validateConsecutiveSlots(sampleSlots, ['s1', 's2']);
      expect(result.isValid).toBe(true);
      expect(result.startTime).toBe('06:00');
      expect(result.endTime).toBe('08:00');
      expect(result.slotCount).toBe(2);
      expect(result.formattedRange).toBe('06:00 AM – 08:00 AM');
    });

    it('validates consecutive slots even when passed in reversed order', () => {
      const result = validateConsecutiveSlots(sampleSlots, ['s3', 's2']);
      expect(result.isValid).toBe(true);
      expect(result.startTime).toBe('07:00');
      expect(result.endTime).toBe('09:00');
      expect(result.slotCount).toBe(2);
      expect(result.formattedRange).toBe('07:00 AM – 09:00 AM');
    });

    it('rejects non-consecutive / disjoint slots with clear error', () => {
      // s2 (07:00-08:00) and s5 (10:00-11:00) are disjoint
      const result = validateConsecutiveSlots(sampleSlots, ['s2', 's5']);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'Only consecutive time slots can be booked together.'
      );
    });

    it('rejects selection containing a booked slot', () => {
      const result = validateConsecutiveSlots(sampleSlots, ['s3', 's4']);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'One or more selected slots are unavailable.'
      );
    });
  });

  describe('handleSlotToggle', () => {
    it('selects slot if none currently selected', () => {
      const selected = handleSlotToggle([], 's1', sampleSlots);
      expect(selected).toEqual(['s1']);
    });

    it('deselects slot when tapping the single selected slot', () => {
      const selected = handleSlotToggle(['s1'], 's1', sampleSlots);
      expect(selected).toEqual([]);
    });

    it('extends selection when tapping consecutive slot', () => {
      const selected = handleSlotToggle(['s1'], 's2', sampleSlots);
      expect(selected).toEqual(['s1', 's2']);
    });

    it('restarts selection with the new slot when tapping disjoint slot', () => {
      const selected = handleSlotToggle(['s1'], 's5', sampleSlots);
      expect(selected).toEqual(['s5']);
    });

    it('ignores taps on booked slots', () => {
      const selected = handleSlotToggle(['s1'], 's4', sampleSlots);
      expect(selected).toEqual(['s1']);
    });
  });
});
