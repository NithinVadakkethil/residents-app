/**
 * Screen 04_Home
 * Source of Truth: Stitch Screen 04_Home (id: 792b02a24cbb46359e8f66861614e08b)
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { BuildingSelectorPill } from '../../../components/common/BuildingSelectorPill';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

export const HomeScreen: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Screen backgroundColor={colors.background} statusBarStyle="dark-content">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar with Building Selector */}
        <View style={styles.headerBar}>
          <BuildingSelectorPill />
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>{user?.unitNumber || 'Apt 1402'}</Text>
          </View>
        </View>

        {/* Resident Greeting Card */}
        <View style={styles.greetingCard}>
          <Text style={styles.greetingTitle}>
            Hello, {user?.name?.split(' ')[0] || 'Resident'} 👋
          </Text>
          <Text style={styles.greetingSubtitle}>
            Welcome to your digital residence portal. Manage requests, book amenities, and connect with your community.
          </Text>
        </View>

        {/* Quick Resident Services Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resident Services</Text>
        </View>

        <View style={styles.servicesGrid}>
          {[
            { id: '1', title: 'Amenities', subtitle: 'Pool, Gym & Courts', badge: 'Book' },
            { id: '2', title: 'Maintenance', subtitle: 'Repairs & Plumbing', badge: 'Active' },
            { id: '3', title: 'Visitor Pass', subtitle: 'Pre-authorize Entry', badge: 'Gate' },
            { id: '4', title: 'Move In / Out', subtitle: 'Permits & Elevators', badge: 'Pass' },
          ].map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>{service.badge}</Text>
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing['3xl'],
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  unitBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  unitText: {
    ...typography.labelSm,
    color: colors.onSecondaryContainer,
    fontWeight: '700',
  },
  greetingCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius['2xl'],
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  greetingTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  greetingSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 6,
    lineHeight: 20,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },
  badgeText: {
    ...typography.labelXs,
    color: colors.primary,
  },
  serviceTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
  },
  serviceSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
