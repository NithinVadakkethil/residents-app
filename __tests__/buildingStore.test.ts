import { useBuildingStore, INITIAL_BUILDINGS } from '../src/store/useBuildingStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Building Store (Multi-Building Context)', () => {
  beforeEach(() => {
    useBuildingStore.setState({
      buildings: INITIAL_BUILDINGS,
      selectedBuilding: INITIAL_BUILDINGS[0],
      isLoading: false,
    });
  });

  it('initializes with default primary building', () => {
    const { selectedBuilding, buildings } = useBuildingStore.getState();
    expect(selectedBuilding.id).toBe('bldg-1');
    expect(selectedBuilding.name).toBe('Tower 4 - The Pinnacle');
    expect(buildings.length).toBe(3);
  });

  it('switches active building context correctly', async () => {
    const targetBuilding = INITIAL_BUILDINGS[1]; // Horizon Heights
    await useBuildingStore.getState().selectBuilding(targetBuilding);

    const updated = useBuildingStore.getState().selectedBuilding;
    expect(updated.id).toBe('bldg-2');
    expect(updated.name).toBe('Tower 2 - Horizon Heights');
  });

  it('allows updating buildings list dynamically', () => {
    const newBuildings = [
      {
        id: 'bldg-99',
        name: 'Skyline Penthouse Suites',
        community: 'Marina Gate',
        unitCount: 24,
        activeRequests: 0,
      },
    ];

    useBuildingStore.getState().setBuildings(newBuildings);
    expect(useBuildingStore.getState().buildings.length).toBe(1);
    expect(useBuildingStore.getState().buildings[0].name).toBe('Skyline Penthouse Suites');
  });
});
