/**
 * useCurrentBuilding Hook
 * Reusable hook providing selected building context and operations
 */

import { useEffect, useMemo } from 'react';
import { useBuildingStore } from '../../../store/useBuildingStore';
import { useResidentBuildingsQuery } from '../api/buildingApi';
import { resolveBuildingSelection } from '../utils/buildingResolver';
import { ResidentBuilding, ResidentUnit } from '../types';

export interface UseCurrentBuildingResult {
  selectedBuilding: ResidentBuilding | null;
  selectedUnit: ResidentUnit | null;
  buildings: ResidentBuilding[];
  isLoading: boolean;
  isError: boolean;
  requiresSelection: boolean;
  hasNoBuildings: boolean;
  selectBuilding: (buildingId: string) => Promise<void>;
  refetch: () => Promise<any>;
}

export function useCurrentBuilding(): UseCurrentBuildingResult {
  const {
    selectedBuildingId,
    isHydrated,
    setSelectedBuildingId,
    clearSelectedBuilding,
    hydrateSelectedBuildingId,
  } = useBuildingStore();

  const {
    data: buildings = [],
    isLoading: isQueryLoading,
    isError,
    refetch,
  } = useResidentBuildingsQuery();

  // Ensure persisted storage is read on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateSelectedBuildingId();
    }
  }, [isHydrated, hydrateSelectedBuildingId]);

  const resolution = useMemo(() => {
    if (!isHydrated) {
      return null;
    }
    return resolveBuildingSelection(buildings, selectedBuildingId);
  }, [buildings, selectedBuildingId, isHydrated]);

  // Execute side effects (auto-select or clear stale ID)
  useEffect(() => {
    if (!resolution) return;

    if (resolution.shouldPersist && resolution.selectedBuildingId) {
      setSelectedBuildingId(resolution.selectedBuildingId);
    } else if (resolution.shouldClear) {
      clearSelectedBuilding();
    }
  }, [resolution, setSelectedBuildingId, clearSelectedBuilding]);

  const selectedBuilding = resolution?.selectedBuilding ?? null;
  const selectedUnit = selectedBuilding?.unit ?? null;
  const requiresSelection = resolution?.requiresSelection ?? false;
  const hasNoBuildings = resolution?.hasNoBuildings ?? false;
  const isLoading = !isHydrated || isQueryLoading;

  const selectBuilding = async (buildingId: string) => {
    await setSelectedBuildingId(buildingId);
  };

  return {
    selectedBuilding,
    selectedUnit,
    buildings,
    isLoading,
    isError,
    requiresSelection,
    hasNoBuildings,
    selectBuilding,
    refetch,
  };
}
