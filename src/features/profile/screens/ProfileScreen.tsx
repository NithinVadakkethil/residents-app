/**
 * Screen 09_Profile
 * Source of Truth: Stitch Screen 09_Profile (id: 4893818e61e04130be6281e59e3dd82c)
 */

import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { AppButton } from '../../../components/common/AppButton';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of Orbit Resident?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <Screen backgroundColor={colors.background} statusBarStyle="dark-content">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>

        {/* Profile Identity Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>
              {user?.name
                ? user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : 'AM'}
            </Text>
          </View>

          <Text style={styles.userName}>{user?.name || 'Arjun Mehta'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'arjun@example.com'}</Text>

          <View style={styles.residencePill}>
            <Text style={styles.residenceText}>
              {user?.unitNumber || 'Apt 1402'} • {user?.buildingName || 'Tower 4 - The Pinnacle'}
            </Text>
          </View>
        </View>

        {/* Account Details Box */}
        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mobile Phone</Text>
            <Text style={styles.detailValue}>{user?.phone || '+971 50 123 4567'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Resident Status</Text>
            <Text style={[styles.detailValue, { color: colors.success }]}>Active Resident</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Building</Text>
            <Text style={styles.detailValue}>{user?.buildingName || 'Tower 4 - The Pinnacle'}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutWrapper}>
          <AppButton
            title="Log Out"
            variant="outline"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  header: {
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius['2xl'],
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
    marginBottom: spacing.lg,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarInitials: {
    ...typography.headlineLg,
    color: colors.onSecondaryContainer,
  },
  userName: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  userEmail: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  residencePill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: spacing.md,
  },
  residenceText: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '600',
  },
  detailsBox: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
    marginBottom: spacing.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  detailLabel: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  detailValue: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceContainer,
    marginVertical: 4,
  },
  logoutWrapper: {
    marginTop: spacing.md,
  },
  logoutButton: {
    borderColor: colors.error,
  },
});
