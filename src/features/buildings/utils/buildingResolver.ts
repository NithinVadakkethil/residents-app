/**
 * Building Selection Resolution Logic
 * 
 * Rules:
 * 1. 0 buildings: Show empty / support state (hasNoBuildings: true)
 * 2. 1 building: Auto-select it immediately
 * 3. 2+ buildings:
 *    - If valid persisted ID exists in the resident's buildings -> restore it
 *    - If persisted ID is invalid / no longer belongs to resident -> discard it, require selection
 *    - If no persisted selection -> require user selection
 */

import { ResidentBuilding } from '../types';

export interface ResolutionResult {
  selectedBuildingId: string | null;
  selectedBuilding: ResidentBuilding | null;
  requiresSelection: boolean;
  hasNoBuildings: boolean;
  shouldPersist: boolean;
  shouldClear: boolean;
}

export function resolveBuildingSelection(
  buildings: ResidentBuilding[] | undefined | null,
  persistedBuildingId: string | null
): ResolutionResult {
  // Case 1: 0 buildings linked to resident
  if (!buildings || buildings.length === 0) {
    return {
      selectedBuildingId: null,
      selectedBuilding: null,
      requiresSelection: false,
      hasNoBuildings: true,
      shouldPersist: false,
      shouldClear: Boolean(persistedBuildingId),
    };
  }

  // Case 2: Exactly 1 building linked to resident
  if (buildings.length === 1) {
    const single = buildings[0];
    const isAlreadyPersisted = persistedBuildingId === single.id;
    return {
      selectedBuildingId: single.id,
      selectedBuilding: single,
      requiresSelection: false,
      hasNoBuildings: false,
      shouldPersist: !isAlreadyPersisted,
      shouldClear: false,
    };
  }

  // Case 3: Multiple buildings (2+)
  if (persistedBuildingId) {
    const matching = buildings.find((b) => b.id === persistedBuildingId);
    if (matching) {
      // Valid persisted selection restored
      return {
        selectedBuildingId: matching.id,
        selectedBuilding: matching,
        requiresSelection: false,
        hasNoBuildings: false,
        shouldPersist: false,
        shouldClear: false,
      };
    }
    // Invalid / stale persisted ID discarded
    return {
      selectedBuildingId: null,
      selectedBuilding: null,
      requiresSelection: true,
      hasNoBuildings: false,
      shouldPersist: false,
      shouldClear: true,
    };
  }

  // Multiple buildings with no previous selection
  return {
    selectedBuildingId: null,
    selectedBuilding: null,
    requiresSelection: true,
    hasNoBuildings: false,
    shouldPersist: false,
    shouldClear: false,
  };
}
