/**
 * Resident Services Configuration
 * Source of Truth: Stitch Screen 04_Home
 */

import { ResidentServiceConfig } from '../types/services';

export const DEFAULT_RESIDENT_SERVICES: ResidentServiceConfig[] = [
  {
    key: 'MOVE_IN',
    label: 'Move In',
    iconName: 'login',
    backgroundColor: '#E6F0FA',
    iconColor: '#1E56A0',
    route: 'MoveIn',
    enabled: true,
    sortOrder: 1,
  },
  {
    key: 'MOVE_OUT',
    label: 'Move Out',
    iconName: 'logout',
    backgroundColor: '#EBF7EE',
    iconColor: '#1B7339',
    route: 'MoveOut',
    enabled: true,
    sortOrder: 2,
  },
  {
    key: 'VISITOR_PASS',
    label: 'Visitor Pass',
    iconName: 'badge',
    backgroundColor: '#F3EDFB',
    iconColor: '#6938B8',
    route: 'VisitorPass',
    enabled: true,
    sortOrder: 3,
  },
  {
    key: 'MAINTENANCE',
    label: 'Maintenance',
    iconName: 'build',
    backgroundColor: '#FEF3EB',
    iconColor: '#C05621',
    route: 'Maintenance',
    enabled: true,
    sortOrder: 4,
  },
  {
    key: 'ACCESS_CARD',
    label: 'Access Card',
    iconName: 'contactless',
    backgroundColor: '#E5F7F6',
    iconColor: '#0B7285',
    route: 'AccessCard',
    enabled: true,
    sortOrder: 5,
  },
  {
    key: 'UNIT_VIEWING',
    label: 'Unit Viewing',
    iconName: 'domain',
    backgroundColor: '#E6F4F1',
    iconColor: '#006B67',
    route: 'UnitViewing',
    enabled: true,
    sortOrder: 6,
  },
  {
    key: 'WORK_PERMIT',
    label: 'Work Permit',
    iconName: 'engineering',
    backgroundColor: '#EEF2FF',
    iconColor: '#4338CA',
    route: 'WorkPermit',
    enabled: true,
    sortOrder: 7,
  },
  {
    key: 'AMENITIES',
    label: 'Amenities Booking',
    iconName: 'sports_tennis',
    backgroundColor: '#FDF0EE',
    iconColor: '#C53030',
    route: 'Amenities',
    enabled: true,
    sortOrder: 8,
  },
];

/**
 * Filter and sort services enabled for a specific building/property
 */
export function getActiveServices(
  buildingServiceKeys?: string[]
): ResidentServiceConfig[] {
  if (!buildingServiceKeys || buildingServiceKeys.length === 0) {
    return DEFAULT_RESIDENT_SERVICES.filter((s) => s.enabled).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }

  const enabledSet = new Set(buildingServiceKeys);
  return DEFAULT_RESIDENT_SERVICES.filter(
    (service) => service.enabled && enabledSet.has(service.key)
  ).sort((a, b) => a.sortOrder - b.sortOrder);
}
