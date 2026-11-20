import { useBuildingStore } from '../src/store/useBuildingStore';
import { storageService, STORAGE_KEYS } from '../src/services/storage/storage';

// Mock StorageService
jest.mock('../src/services/storage/storage', () => ({
  storageService: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  STORAGE_KEYS: {
    SELECTED_BUILDING_ID: '@orbit_resident/selected_building_id',
  },
}));

describe('Selected Building Client Store (Zustand)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useBuildingStore.setState({
      selectedBuildingId: null,
      isHydrated: false,
    });
  });

  it('initializes with null selectedBuildingId and unhydrated state', () => {
    const state = useBuildingStore.getState();
    expect(state.selectedBuildingId).toBeNull();
    expect(state.isHydrated).toBe(false);
  });

  it('updates selectedBuildingId and persists to storage', async () => {
    (storageService.setItem as jest.Mock).mockResolvedValue(true);

    await useBuildingStore.getState().setSelectedBuildingId('bldg-skyline-a');

    expect(useBuildingStore.getState().selectedBuildingId).toBe('bldg-skyline-a');
    expect(storageService.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.SELECTED_BUILDING_ID,
      'bldg-skyline-a'
    );
  });

  it('clears selectedBuildingId and removes it from storage', async () => {
    useBuildingStore.setState({ selectedBuildingId: 'bldg-skyline-a' });
    (storageService.removeItem as jest.Mock).mockResolvedValue(true);

    await useBuildingStore.getState().clearSelectedBuilding();

    expect(useBuildingStore.getState().selectedBuildingId).toBeNull();
    expect(storageService.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.SELECTED_BUILDING_ID
    );
  });

  it('hydrates selectedBuildingId from persistent storage', async () => {
    (storageService.getItem as jest.Mock).mockResolvedValue('bldg-palm-b');

    const result = await useBuildingStore.getState().hydrateSelectedBuildingId();

    expect(result).toBe('bldg-palm-b');
    expect(useBuildingStore.getState().selectedBuildingId).toBe('bldg-palm-b');
    expect(useBuildingStore.getState().isHydrated).toBe(true);
  });
});
