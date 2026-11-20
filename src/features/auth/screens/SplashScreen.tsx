/**
 * Screen 01_Splash
 * Source of Truth: Stitch Screen 01_Splash (id: 4dc7be39fb7a40b09c6aa347a9310039)
 * 
 * Aesthetics:
 * - Deep luxury nocturnal teal background (#001716)
 * - Orbit Brand Mark with radial glow
 * - "Orbit" (34px bold) & "RESIDENT" (tracking 0.22em uppercase)
 * - "A Better Community / A Brighter Tomorrow"
 * - Bottom triad: "Live • Belong • Thrive"
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { OrbitLogo } from '../components/OrbitLogo';
import { colors, spacing, typography } from '../../../theme';
import { useAuthStore } from '../../../store/useAuthStore';
import { useBuildingStore } from '../../../store/useBuildingStore';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { initializeSession } = useAuthStore();
  const { hydrateSelectedBuildingId } = useBuildingStore();

  useEffect(() => {
    const bootstrap = async () => {
      await Promise.all([
        initializeSession(),
        hydrateSelectedBuildingId(),
      ]);

      // Allow luxury splash branding to show briefly
      const timer = setTimeout(() => {
        onFinish();
      }, 1600);

      return () => clearTimeout(timer);
    };

    bootstrap();
  }, [initializeSession, hydrateSelectedBuildingId, onFinish]);

  return (
    <Screen
      backgroundColor={colors.splashBackground}
      statusBarStyle="light-content"
      contentContainerStyle={styles.container}
    >
      {/* Center Branding Stack */}
      <View style={styles.centerContent}>
        {/* Glowing Orbit Brand Mark */}
        <View style={styles.logoWrapper}>
          <OrbitLogo size={80} variant="splash" />
        </View>

        {/* Orbit Title */}
        <Text style={styles.title}>Orbit</Text>

        {/* Resident Subtitle */}
        <Text style={styles.subtitle}>RESIDENT</Text>

        {/* Tagline Statements */}
        <View style={styles.taglineBox}>
          <Text style={styles.taglineText}>A Better Community</Text>
          <Text style={styles.taglineText}>A Brighter Tomorrow</Text>
        </View>
      </View>

      {/* Bottom Values Triad */}
      <View style={styles.bottomContent}>
        <View style={styles.triadRow}>
          <Text style={styles.triadItem}>Live</Text>
          <View style={styles.triadDot} />
          <Text style={styles.triadItem}>Belong</Text>
          <View style={styles.triadDot} />
          <Text style={styles.triadItem}>Thrive</Text>
        </View>

        {/* Home Indicator Accent */}
        <View style={styles.bottomBarIndicator} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -spacing.xl,
  },
  logoWrapper: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.displaySplash,
    color: colors.onPrimary,
    letterSpacing: -1,
  },
  subtitle: {
    ...typography.headlineSm,
    fontSize: 15,
    letterSpacing: 3.5,
    color: colors.secondaryFixed,
    marginTop: 2,
    marginBottom: spacing.lg,
    opacity: 0.95,
  },
  taglineBox: {
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  taglineText: {
    ...typography.headlineSm,
    fontSize: 16,
    lineHeight: 22,
    color: colors.surfaceBright,
    fontWeight: '500',
    opacity: 0.95,
    letterSpacing: 0.2,
  },
  bottomContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: spacing.xs,
  },
  triadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  triadItem: {
    ...typography.labelMd,
    color: colors.secondaryFixed,
    letterSpacing: 1,
    opacity: 0.9,
  },
  triadDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondaryFixedDim,
    opacity: 0.6,
  },
  bottomBarIndicator: {
    width: 128,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginTop: spacing.lg,
    marginBottom: 4,
  },
});
