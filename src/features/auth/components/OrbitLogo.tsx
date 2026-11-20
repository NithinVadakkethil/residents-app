/**
 * Orbit Logo Component (Native SVG)
 * Faithful recreation of Stitch brand mark from screens 01_Splash and 02_Login
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Ellipse, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors } from '../../../theme';

interface OrbitLogoProps {
  size?: number;
  variant?: 'splash' | 'header' | 'badge';
  color?: string;
  secondaryColor?: string;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({
  size = 64,
  variant = 'splash',
  color = colors.primaryFixed,
  secondaryColor = '#ffffff',
}) => {
  if (variant === 'splash') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor={colors.primaryFixed} stopOpacity={0.35} />
              <Stop offset="100%" stopColor={colors.primaryFixed} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          {/* Ambient Glow */}
          <Circle cx="32" cy="32" r="30" fill="url(#glow)" />
          {/* Outer Orbit Path */}
          <Circle
            cx="32"
            cy="32"
            r="27"
            stroke={color}
            strokeWidth="4.5"
            strokeDasharray="140, 30"
            strokeLinecap="round"
            opacity={0.95}
          />
          {/* Inner Tilted Orbit Ring */}
          <Ellipse
            cx="32"
            cy="32"
            rx="20"
            ry="10"
            stroke={secondaryColor}
            strokeWidth="3"
            strokeDasharray="80, 20"
            strokeLinecap="round"
            transform="rotate(-30, 32, 32)"
            opacity={0.9}
          />
          {/* Orbiting Satellite Node A */}
          <Circle cx="43" cy="22" r="4.5" fill={secondaryColor} />
          {/* Orbiting Satellite Node B */}
          <Circle cx="21" cy="42" r="2.5" fill={color} opacity={0.9} />
        </Svg>
      </View>
    );
  }

  // Header / Badge Variant
  const iconSize = size * 0.7;
  return (
    <View
      style={[
        styles.badgeContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.secondaryContainer,
        },
      ]}
    >
      <Svg width={iconSize} height={iconSize} viewBox="0 0 28 28" fill="none">
        <Circle
          cx="14"
          cy="14"
          r="11"
          stroke={colors.primary}
          strokeWidth="2.5"
          strokeDasharray="52, 16"
          strokeLinecap="round"
        />
        <Path
          d="M10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18"
          stroke={colors.primary}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
