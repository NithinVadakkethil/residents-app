/**
 * Native SVG Icons for Resident Services & Hub Navigation
 * Faithfully matches Google Stitch Material Symbols
 */

import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// 1. Move In (login)
export const MoveInIcon: React.FC<IconProps> = ({ size = 26, color = '#1E56A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M11 16L15 12L11 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 12H3" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M14 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

// 2. Move Out (logout)
export const MoveOutIcon: React.FC<IconProps> = ({ size = 26, color = '#1B7339' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 16L5 12L9 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 12H17" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M10 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

// 3. Visitor Pass (badge)
export const VisitorPassIcon: React.FC<IconProps> = ({ size = 26, color = '#6938B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="4" width="16" height="16" rx="3" stroke={color} strokeWidth="2.2" />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
    <Path d="M8 17C8 15.3431 9.79086 14 12 14C14.2091 14 16 15.3431 16 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 4. Maintenance (build / wrench)
export const MaintenanceIcon: React.FC<IconProps> = ({ size = 26, color = '#C05621' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// 5. Access Card (contactless)
export const AccessCardIcon: React.FC<IconProps> = ({ size = 26, color = '#0B7285' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="5" width="18" height="14" rx="2.5" stroke={color} strokeWidth="2.2" />
    <Path d="M7 15C8.5 13.5 8.5 10.5 7 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M10 16.5C12.5 14 12.5 10 10 7.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 6. Unit Viewing (domain / building)
export const UnitViewingIcon: React.FC<IconProps> = ({ size = 26, color = '#006B67' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 21V5C4 3.89543 4.89543 3 6 3H14C15.1046 3 16 3.89543 16 5V21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M16 9H18C19.1046 9 20 9.89543 20 11V21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M2 21H22" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M8 7H10M8 11H10M8 15H10" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 7. Work Permit (engineering)
export const WorkPermitIcon: React.FC<IconProps> = ({ size = 26, color = '#4338CA' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 4C8.68629 4 6 6.68629 6 10V14H18V10C18 6.68629 15.3137 4 12 4Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M4 14H20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Path d="M10 18H14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

// 8. Amenities Booking (tennis racquet / sports)
export const AmenitiesIcon: React.FC<IconProps> = ({ size = 26, color = '#C53030' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.2" />
    <Path d="M3.5 9C7 9.5 9.5 12 10 15.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M14 8.5C14.5 12 17 14.5 20.5 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

// Hub Icons
export const AssignmentCheckIcon: React.FC<IconProps> = ({ size = 24, color = '#1E56A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 14L11 16L15 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const EventAvailableIcon: React.FC<IconProps> = ({ size = 24, color = '#137A47' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M9 16L11 18L15 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ApartmentIcon: React.FC<IconProps> = ({ size = 24, color = '#6236A9' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M9 7H11M13 7H15M9 11H11M13 11H15M9 15H11M13 15H15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const CampaignIcon: React.FC<IconProps> = ({ size = 24, color = '#B84E18' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21A2 2 0 0 1 10.27 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CalendarMonthIcon: React.FC<IconProps> = ({ size = 24, color = '#B92B45' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="8" cy="14" r="1" fill={color} />
    <Circle cx="12" cy="14" r="1" fill={color} />
    <Circle cx="16" cy="14" r="1" fill={color} />
  </Svg>
);

export const FolderOpenIcon: React.FC<IconProps> = ({ size = 24, color = '#3B4CA8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 7V19C3 20.1046 3.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V9C19 7.89543 18.1046 7 17 7H11L9 5H5C3.89543 5 3 5.89543 3 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const QuizIcon: React.FC<IconProps> = ({ size = 24, color = '#087788' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M9.09 9A3 3 0 0 1 15 10C15 12 12 12.5 12 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="17" r="1" fill={color} />
  </Svg>
);

export const NotificationBellIcon: React.FC<IconProps> = ({ size = 20, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21A2 2 0 0 1 10.27 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, color = '#00514e' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckmarkIcon: React.FC<IconProps> = ({ size = 14, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4.5 12.75L10.5 18.75L19.5 5.25" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
