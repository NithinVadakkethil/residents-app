/**
 * Selected Building Client Store (Zustand)
 * Owns ONLY client-side building selection ID state
 * Server data belongs to TanStack Query.
 */

import { create } from 'zustand';
import { storageService, STORAGE_KEYS } from '../services/storage/storage';

export interface BuildingState {
  selectedBuildingId: string | null;
  isHydrated: boolean;
  setSelectedBuildingId: (buildingId: string) => Promise<void>;
  clearSelectedBuilding: () => Promise<void>;
  hydrateSelectedBuildingId: () => Promise<string | null>;
}

export const useBuildingStore = create<BuildingState>((set) => ({
  selectedBuildingId: null,
  isHydrated: false,

  setSelectedBuildingId: async (buildingId: string) => {
    set({ selectedBuildingId: buildingId });
    await storageService.setItem(STORAGE_KEYS.SELECTED_BUILDING_ID, buildingId);
  },

  clearSelectedBuilding: async () => {
    set({ selectedBuildingId: null });
    await storageService.removeItem(STORAGE_KEYS.SELECTED_BUILDING_ID);
  },

  hydrateSelectedBuildingId: async () => {
    try {
      const persistedId = await storageService.getItem<string>(
        STORAGE_KEYS.SELECTED_BUILDING_ID
      );
      set({ selectedBuildingId: persistedId, isHydrated: true });
      return persistedId;
    } catch {
      set({ selectedBuildingId: null, isHydrated: true });
      return null;
    }
  },
}));
