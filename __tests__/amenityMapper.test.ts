import {
  mapAssetDtoToAmenity,
  mapSlotDtoToAmenitySlot,
} from '../src/features/amenities/utils/amenityMapper';
import { AssetDto, SlotDto } from '../src/features/amenities/api/amenities.dto';

describe('amenityMapper', () => {
  describe('mapAssetDtoToAmenity', () => {
    it('maps complete AssetDto with all fields properly', () => {
      const dto: AssetDto = {
        id: 42,
        name: 'Badminton Court',
        category: { id: 1, name: 'Indoor Sports' },
        location: 'Clubhouse Wing B',
        image_url: 'https://example.com/badminton.jpg',
        is_active: true,
        is_available: true,
        capacity: 4,
        court_count: 2,
        description: 'Indoor wooden court',
      };

      const result = mapAssetDtoToAmenity(dto);

      expect(result.id).toBe('42');
      expect(result.name).toBe('Badminton Court');
      expect(result.category).toBe('Indoor Sports');
      expect(result.location).toBe('Clubhouse Wing B');
      expect(result.imageUrl).toBe('https://example.com/badminton.jpg');
      expect(result.isAvailable).toBe(true);
      expect(result.availabilityLabel).toBe('Available');
      expect(result.capacity).toBe('Max 4 per slot');
      expect(result.courtCount).toBe('2 Courts');
      expect(result.description).toBe('Indoor wooden court');
    });

    it('gracefully handles missing and fallback fields', () => {
      const dto: AssetDto = {
        id: 'pool-1',
        name: 'Swimming Pool',
        status: 'limited_slots',
      };

      const result = mapAssetDtoToAmenity(dto);

      expect(result.id).toBe('pool-1');
      expect(result.name).toBe('Swimming Pool');
      expect(result.category).toBe('Recreation');
      expect(result.availabilityLabel).toBe('Limited Slots');
      expect(result.isAvailable).toBe(true);
      expect(result.capacity).toBeUndefined();
      expect(result.courtCount).toBeUndefined();
    });

    it('maps unavailable/inactive assets correctly', () => {
      const dto: AssetDto = {
        id: 'gym-9',
        name: 'Fitness Gym',
        is_available: false,
      };

      const result = mapAssetDtoToAmenity(dto);

      expect(result.availabilityLabel).toBe('Unavailable');
      expect(result.isAvailable).toBe(false);
    });
  });

  describe('mapSlotDtoToAmenitySlot', () => {
    it('formats 24h start and end times into 12h AM/PM slot range', () => {
      const slotDto: SlotDto = {
        id: 'slot-1',
        start_time: '07:00:00',
        end_time: '08:00:00',
        is_available: true,
      };

      const result = mapSlotDtoToAmenitySlot(slotDto, 0);

      expect(result.id).toBe('slot-1');
      expect(result.startTime).toBe('07:00');
      expect(result.endTime).toBe('08:00');
      expect(result.formattedRange).toBe('07:00 AM – 08:00 AM');
      expect(result.status).toBe('AVAILABLE');
      expect(result.isAvailable).toBe(true);
    });

    it('formats afternoon/evening times correctly', () => {
      const slotDto: SlotDto = {
        id: 'slot-2',
        start_time: '16:30',
        end_time: '18:00',
        is_available: true,
      };

      const result = mapSlotDtoToAmenitySlot(slotDto, 1);

      expect(result.startTime).toBe('16:30');
      expect(result.endTime).toBe('18:00');
      expect(result.formattedRange).toBe('04:30 PM – 06:00 PM');
    });

    it('maps booked slot status correctly', () => {
      const slotDto: SlotDto = {
        id: 'slot-3',
        start_time: '10:00:00',
        end_time: '11:00:00',
        status: 'booked',
        is_available: false,
      };

      const result = mapSlotDtoToAmenitySlot(slotDto, 2);

      expect(result.status).toBe('BOOKED');
      expect(result.isAvailable).toBe(false);
    });
  });
});
