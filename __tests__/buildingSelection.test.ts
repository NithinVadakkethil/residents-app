import { resolveBuildingSelection } from '../src/features/buildings/utils/buildingResolver';
import { ResidentBuilding } from '../src/features/buildings/types';

describe('Building Selection Resolution Logic', () => {
  const mockBldg1: ResidentBuilding = {
    id: 'bldg-1',
    name: 'Skyline Residency',
    tower: 'Tower A',
    unit: { id: 'u1', number: 'A-1203' },
  };

  const mockBldg2: ResidentBuilding = {
    id: 'bldg-2',
    name: 'Palm Heights',
    block: 'Block B',
    unit: { id: 'u2', number: 'B-804' },
  };

  it('handles 0 buildings gracefully with empty state flags', () => {
    const result = resolveBuildingSelection([], null);
    expect(result.hasNoBuildings).toBe(true);
    expect(result.selectedBuilding).toBeNull();
    expect(result.requiresSelection).toBe(false);

    // If there was an old persisted ID, it marks it to be cleared
    const resultWithStale = resolveBuildingSelection([], 'old-bldg');
    expect(resultWithStale.hasNoBuildings).toBe(true);
    expect(resultWithStale.shouldClear).toBe(true);
  });

  it('auto-selects the building when resident has exactly 1 building', () => {
    const result = resolveBuildingSelection([mockBldg1], null);
    expect(result.hasNoBuildings).toBe(false);
    expect(result.selectedBuildingId).toBe('bldg-1');
    expect(result.selectedBuilding?.name).toBe('Skyline Residency');
    expect(result.requiresSelection).toBe(false);
    expect(result.shouldPersist).toBe(true);
  });

  it('restores valid persisted building selection among multiple buildings', () => {
    const result = resolveBuildingSelection([mockBldg1, mockBldg2], 'bldg-2');
    expect(result.hasNoBuildings).toBe(false);
    expect(result.selectedBuildingId).toBe('bldg-2');
    expect(result.selectedBuilding?.name).toBe('Palm Heights');
    expect(result.requiresSelection).toBe(false);
    expect(result.shouldClear).toBe(false);
  });

  it('discards stale persisted building ID not belonging to resident and requires selection', () => {
    const result = resolveBuildingSelection([mockBldg1, mockBldg2], 'stale-bldg-99');
    expect(result.selectedBuildingId).toBeNull();
    expect(result.selectedBuilding).toBeNull();
    expect(result.requiresSelection).toBe(true);
    expect(result.shouldClear).toBe(true);
  });

  it('requires selection when resident has multiple buildings and no prior selection', () => {
    const result = resolveBuildingSelection([mockBldg1, mockBldg2], null);
    expect(result.selectedBuildingId).toBeNull();
    expect(result.selectedBuilding).toBeNull();
    expect(result.requiresSelection).toBe(true);
    expect(result.shouldClear).toBe(false);
  });
});
