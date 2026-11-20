/**
 * Multi-Building Store (Zustand)
 * Manages active building context, buildings list, and building switching
 * Source of Truth: Stitch Screen 06_Select_Building
 */

import { create } from 'zustand';
import { storageService, STORAGE_KEYS } from '../services/storage/storage';

export interface Building {
  id: string;
  name: string;
  community: string;
  unitCount: number;
  activeRequests: number;
  imageUrl?: string;
  isPrimary?: boolean;
}

export const INITIAL_BUILDINGS: Building[] = [
  {
    id: 'bldg-1',
    name: 'Tower 4 - The Pinnacle',
    community: 'Emerald Bay Residences',
    unitCount: 142,
    activeRequests: 2,
    isPrimary: true,
  },
  {
    id: 'bldg-2',
    name: 'Tower 2 - Horizon Heights',
    community: 'Emerald Bay Residences',
    unitCount: 98,
    activeRequests: 0,
    isPrimary: false,
  },
  {
    id: 'bldg-3',
    name: 'The Courtyard Villas',
    community: 'Palm Groves Gated Community',
    unitCount: 45,
    activeRequests: 1,
    isPrimary: false,
  },
];

interface BuildingState {
  buildings: Building[];
  selectedBuilding: Building;
  isLoading: boolean;
  selectBuilding: (building: Building) => Promise<void>;
  setBuildings: (buildings: Building[]) => void;
  initializeBuilding: () => Promise<void>;
}

export const useBuildingStore = create<BuildingState>((set, get) => ({
  buildings: INITIAL_BUILDINGS,
  selectedBuilding: INITIAL_BUILDINGS[0],
  isLoading: false,

  selectBuilding: async (building: Building) => {
    set({ selectedBuilding: building });
    await storageService.setItem(STORAGE_KEYS.SELECTED_BUILDING_ID, building.id);
  },

  setBuildings: (buildings: Building[]) => {
    set({ buildings });
  },

  initializeBuilding: async () => {
    try {
      const savedBuildingId = await storageService.getItem<string>(STORAGE_KEYS.SELECTED_BUILDING_ID);
      if (savedBuildingId) {
        const matching = get().buildings.find((b) => b.id === savedBuildingId);
        if (matching) {
          set({ selectedBuilding: matching });
        }
      }
    } catch {
      // Default to first building
    }
  },
}));
