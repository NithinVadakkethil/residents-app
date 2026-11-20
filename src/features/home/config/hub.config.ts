/**
 * Resident Hub Navigation Configuration
 * Source of Truth: Stitch Screen 04_Home ("Go To" Section)
 */

import { HubItemConfig } from '../types/services';

export const DEFAULT_HUB_ITEMS: HubItemConfig[] = [
  {
    key: 'MY_REQUESTS',
    label: 'My Requests',
    iconName: 'assignment_turned_in',
    backgroundColor: '#E8F1FC',
    iconColor: '#1E56A0',
    route: 'Requests',
    enabled: true,
    sortOrder: 1,
  },
  {
    key: 'MY_BOOKINGS',
    label: 'My Bookings',
    iconName: 'event_available',
    backgroundColor: '#E8F8F0',
    iconColor: '#137A47',
    route: 'Bookings',
    enabled: true,
    sortOrder: 2,
  },
  {
    key: 'MY_UNITS',
    label: 'My Units',
    iconName: 'apartment',
    backgroundColor: '#F4ECFD',
    iconColor: '#6236A9',
    route: 'SelectBuilding',
    enabled: true,
    sortOrder: 3,
  },
  {
    key: 'ANNOUNCEMENTS',
    label: 'Announcements',
    iconName: 'campaign',
    backgroundColor: '#FEF1E7',
    iconColor: '#B84E18',
    route: 'Announcements',
    enabled: true,
    sortOrder: 4,
  },
  {
    key: 'EVENT_CALENDAR',
    label: 'Event Calendar',
    iconName: 'calendar_month',
    backgroundColor: '#FDECEF',
    iconColor: '#B92B45',
    route: 'Events',
    enabled: true,
    sortOrder: 5,
  },
  {
    key: 'DOCUMENTS',
    label: 'Documents',
    iconName: 'folder_open',
    backgroundColor: '#EEF2FC',
    iconColor: '#3B4CA8',
    route: 'Documents',
    enabled: true,
    sortOrder: 6,
  },
  {
    key: 'HELP_FAQS',
    label: 'Help & FAQs',
    iconName: 'quiz',
    backgroundColor: '#E5F7F8',
    iconColor: '#087788',
    route: 'Help',
    enabled: true,
    sortOrder: 7,
  },
];
