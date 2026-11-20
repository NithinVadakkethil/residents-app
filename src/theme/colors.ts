/**
 * Design Tokens: Colors
 * Source of Truth: Stitch Design System (Project 13242428547386138499)
 */

export const colors = {
  // Brand & Primary
  primary: '#00514e',
  primaryContainer: '#006B67',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#97e8e3',
  primaryFixed: '#9ff1eb',
  primaryFixedDim: '#83d4cf',
  onPrimaryFixed: '#00201e',
  onPrimaryFixedVariant: '#00504d',

  // Secondary
  secondary: '#276865',
  secondaryContainer: '#acebe7',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#2c6c69',
  secondaryFixed: '#afeee9',
  secondaryFixedDim: '#93d2cd',
  onSecondaryFixed: '#00201e',
  onSecondaryFixedVariant: '#01504d',

  // Tertiary
  tertiary: '#3d4a4a',
  tertiaryContainer: '#556261',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#cfdddc',

  // Surfaces & Backgrounds
  background: '#f7f9ff',
  surface: '#ffffff',
  surfaceBright: '#f7f9ff',
  surfaceDim: '#d6dae1',
  surfaceVariant: '#dee3ea',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f0f4fb',
  surfaceContainer: '#eaeef5',
  surfaceContainerHigh: '#e4e8ef',
  surfaceContainerHighest: '#dee3ea',
  surfaceTint: '#006a66',

  // Dark Theme / Splash
  splashBackground: '#001716',
  splashBackgroundDeep: '#001413',

  // Content & Typography
  onBackground: '#171c21',
  onSurface: '#171c21',
  onSurfaceVariant: '#3e4948',
  inverseSurface: '#2c3136',
  inverseOnSurface: '#edf1f8',

  // Outlines & Borders
  outline: '#6e7978',
  outlineVariant: '#bec9c7',
  borderLight: '#E4E7EC',

  // Feedback & Status
  success: '#12B76A',
  successContainer: '#ECFDF3',
  onSuccess: '#027A48',

  warning: '#F79009',
  warningContainer: '#FFFAEB',
  onWarning: '#B54708',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  // Neutral Accents
  neutral50: '#F9FAFB',
  neutral100: '#F2F4F7',
  neutral200: '#E4E7EC',
  neutral300: '#D0D5DD',
  neutral400: '#98A2B3',
  neutral500: '#667085',
  neutral600: '#475467',
  neutral700: '#344054',
  neutral800: '#1D2939',
  neutral900: '#101828',
} as const;

export type ColorToken = keyof typeof colors;
