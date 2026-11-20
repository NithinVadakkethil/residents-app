/**
 * Resident Service & Hub Navigation Types
 * Extensible data model supporting dynamic SaaS service configurations
 */

export type ResidentServiceKey =
  | 'MOVE_IN'
  | 'MOVE_OUT'
  | 'VISITOR_PASS'
  | 'MAINTENANCE'
  | 'ACCESS_CARD'
  | 'UNIT_VIEWING'
  | 'WORK_PERMIT'
  | 'AMENITIES'
  // Extensible future services
  | 'PARKING'
  | 'PARCEL'
  | 'HOUSEKEEPING'
  | 'LAUNDRY'
  | 'CAR_WASH'
  | 'CONCIERGE'
  | 'COMPLAINTS'
  | 'EMERGENCY';

export interface ResidentServiceConfig {
  key: ResidentServiceKey;
  label: string;
  iconName: string;
  backgroundColor: string;
  iconColor: string;
  route?: string;
  enabled: boolean;
  sortOrder: number;
}

export type HubItemKey =
  | 'MY_REQUESTS'
  | 'MY_BOOKINGS'
  | 'MY_UNITS'
  | 'ANNOUNCEMENTS'
  | 'EVENT_CALENDAR'
  | 'DOCUMENTS'
  | 'HELP_FAQS';

export interface HubItemConfig {
  key: HubItemKey;
  label: string;
  iconName: string;
  backgroundColor: string;
  iconColor: string;
  route?: string;
  enabled: boolean;
  sortOrder: number;
}
