/**
 * Building Domain Models
 * Represents properties and units for residential SaaS platform
 */

export interface ResidentUnit {
  id: string;
  number: string;
  type?: string;
  floor?: number | string;
}

export interface ResidentBuilding {
  id: string;
  name: string;
  tower?: string;
  block?: string;
  address?: string;
  imageUrl?: string;
  unit?: ResidentUnit;
  units?: ResidentUnit[];
  activeRequestsCount?: number;
  activeBookingsCount?: number;
}

export interface BuildingSelectionResult {
  selectedBuilding: ResidentBuilding | null;
  selectedUnit: ResidentUnit | null;
  hasMultipleBuildings: boolean;
  requiresSelection: boolean;
}
