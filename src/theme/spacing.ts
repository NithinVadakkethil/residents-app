/**
 * Design Tokens: Spacing
 * Source of Truth: Stitch Design System (Project 13242428547386138499)
 */

export const spacing = {
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,

  // Layout aliases
  gutter: 16,
  margin: 16,
  marginMobile: 16,
  safeAreaTop: 44,
  safeAreaBottom: 34,
} as const;

export type SpacingToken = keyof typeof spacing;
