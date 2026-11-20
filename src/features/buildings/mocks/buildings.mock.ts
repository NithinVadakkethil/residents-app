/**
 * Centralized Temporary Development Mock: Resident Buildings
 * 
 * =========================================================================
 * ARCHITECTURAL NOTICE: TEMPORARY DEVELOPMENT MOCK
 * =========================================================================
 * This mock provides initial multi-property resident data matching
 * Stitch Project 13242428547386138499 (Screen 06_Select_Building).
 * When backend endpoint GET /tenant/buildings is provided, replace calls
 * to this mock in `src/features/buildings/api/buildingApi.ts`.
 * =========================================================================
 */

import { ResidentBuilding } from '../types';

export const MOCK_BUILDINGS: ResidentBuilding[] = [
  {
    id: 'bldg-skyline-a',
    name: 'Skyline Residency',
    tower: 'Tower A',
    address: '123 Greenway Blvd, Riverside, CA 90210',
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    unit: {
      id: 'unit-a1203',
      number: 'A-1203',
      floor: 12,
    },
    activeRequestsCount: 1,
    activeBookingsCount: 2,
  },
  {
    id: 'bldg-palm-b',
    name: 'Palm Heights',
    block: 'Block B',
    address: '456 Palm Avenue, Riverside, CA 90210',
    imageUrl:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
    unit: {
      id: 'unit-b804',
      number: 'B-804',
      floor: 8,
    },
    activeRequestsCount: 0,
    activeBookingsCount: 0,
  },
  {
    id: 'bldg-maple-c',
    name: 'Maple Grove',
    tower: 'Tower C',
    address: '789 Maple Drive, Riverside, CA 90210',
    imageUrl:
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=400&q=80',
    unit: {
      id: 'unit-c501',
      number: 'C-501',
      floor: 5,
    },
    activeRequestsCount: 2,
    activeBookingsCount: 1,
  },
  {
    id: 'bldg-lakeside-d',
    name: 'Lakeside View',
    tower: 'Tower D',
    address: '321 Lakeview Road, Riverside, CA 90210',
    imageUrl:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
    unit: {
      id: 'unit-d1002',
      number: 'D-1002',
      floor: 10,
    },
    activeRequestsCount: 0,
    activeBookingsCount: 0,
  },
];
