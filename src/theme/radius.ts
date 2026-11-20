/**
 * Design Tokens: Border Radii
 * Source of Truth: Stitch Design System (Project 13242428547386138499)
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
