/**
 * Design Tokens: Typography
 * Source of Truth: Stitch Design System (Project 13242428547386138499)
 */

import { Platform, TextStyle } from 'react-native';

const sansFontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

const monoFontFamily = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const typography: Record<string, TextStyle> = {
  // Hero Display: 28px / 36px line-height, bold
  displayHero: {
    fontFamily: sansFontFamily,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.56,
    fontWeight: '700',
  },

  // Display Splash Orbit Title: 34px / 38px line-height, bold
  displaySplash: {
    fontFamily: sansFontFamily,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1,
    fontWeight: '700',
  },

  // Large Headlines: 22px / 28px line-height, bold
  headlineLg: {
    fontFamily: sansFontFamily,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.33,
    fontWeight: '700',
  },

  // Medium Headlines: 18px / 24px line-height, semibold
  headlineMd: {
    fontFamily: sansFontFamily,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
    fontWeight: '600',
  },

  // Small Headlines: 16px / 22px line-height, semibold
  headlineSm: {
    fontFamily: sansFontFamily,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeight: '600',
  },

  // Large Body: 16px / 24px line-height, regular
  bodyLg: {
    fontFamily: sansFontFamily,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400',
  },

  // Medium Body: 14px / 20px line-height, regular
  bodyMd: {
    fontFamily: sansFontFamily,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '400',
  },

  // Small Body: 12px / 16px line-height, regular
  bodySm: {
    fontFamily: sansFontFamily,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.12,
    fontWeight: '400',
  },

  // Large Labels / Buttons: 15px / 20px line-height, semibold
  labelLg: {
    fontFamily: sansFontFamily,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.075,
    fontWeight: '600',
  },

  // Medium Labels: 13px / 18px line-height, semibold
  labelMd: {
    fontFamily: sansFontFamily,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.13,
    fontWeight: '600',
  },

  // Small Labels: 11px / 14px line-height, semibold
  labelSm: {
    fontFamily: sansFontFamily,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.22,
    fontWeight: '600',
  },

  // Micro Labels / Tags: 10px / 12px line-height, bold
  labelXs: {
    fontFamily: sansFontFamily,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.3,
    fontWeight: '700',
  },

  // OTP Numeric Matrix: 22px / 28px, Space Grotesk / Monospace bold
  monoOtp: {
    fontFamily: monoFontFamily,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 1.1,
    fontWeight: '700',
  },
} as const;

export type TypographyToken = keyof typeof typography;
