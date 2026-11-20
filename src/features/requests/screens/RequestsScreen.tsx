/**
 * Screen 05_My_Requests
 * Source of Truth: Stitch Screen 05_My_Requests (id: 48dbde14725d43d58434851493035f0f)
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface RequestItem {
  id: string;
  category: string;
  title: string;
  status: 'In Progress' | 'Completed' | 'Pending Approval';
  date: string;
}

const SAMPLE_REQUESTS: RequestItem[] = [
  {
    id: 'REQ-2026-089',
    category: 'Maintenance',
    title: 'AC cooling issue in master bedroom',
    status: 'In Progress',
    date: 'Today, 2:30 PM',
  },
  {
    id: 'REQ-2026-082',
    category: 'Access Card',
    title: 'Replacement parking access RFID card',
    status: 'Pending Approval',
    date: 'Yesterday, 11:15 AM',
  },
  {
    id: 'REQ-2026-071',
    category: 'Visitor Pass',
    title: 'Guest pre-approval for weekend gathering',
    status: 'Completed',
    date: '15 Nov 2026',
  },
];

export const RequestsScreen: React.FC = () => {
  const getStatusColor = (status: RequestItem['status']) => {
    switch (status) {
      case 'In Progress':
        return { bg: colors.warningContainer, text: colors.onWarning };
      case 'Completed':
        return { bg: colors.successContainer, text: colors.onSuccess };
      case 'Pending Approval':
      default:
        return { bg: colors.secondaryContainer, text: colors.onSecondaryContainer };
    }
  };

  return (
    <Screen backgroundColor={colors.background} statusBarStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Requests</Text>
          <Text style={styles.subtitle}>Track and manage your resident service tickets</Text>
        </View>

        <FlatList
          data={SAMPLE_REQUESTS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const badge = getStatusColor(item.status);
            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.statusText, { color: badge.text }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.ticketId}>{item.id}</Text>
                  <Text style={styles.ticketDate}>{item.date}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: spacing['3xl'],
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryText: {
    ...typography.labelXs,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusText: {
    ...typography.labelXs,
    fontWeight: '700',
  },
  cardTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketId: {
    ...typography.labelSm,
    color: colors.outline,
  },
  ticketDate: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
});
