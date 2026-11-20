/**
 * Screen 11_My_Bookings
 * Source of Truth: Stitch Screen 11_My_Bookings (id: 48d0df628f8f4304856fa1e428fe566f)
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface BookingItem {
  id: string;
  amenityName: string;
  slot: string;
  date: string;
  status: 'Confirmed' | 'Pending';
}

const SAMPLE_BOOKINGS: BookingItem[] = [
  {
    id: 'BK-4091',
    amenityName: 'Rooftop Infinity Pool',
    slot: '07:00 AM - 08:30 AM',
    date: 'Tomorrow, 20 Nov',
    status: 'Confirmed',
  },
  {
    id: 'BK-4082',
    amenityName: 'Tennis Court B',
    slot: '06:00 PM - 07:00 PM',
    date: 'Saturday, 22 Nov',
    status: 'Confirmed',
  },
  {
    id: 'BK-4075',
    amenityName: 'Residents Clubhouse Lounge',
    slot: '04:00 PM - 08:00 PM',
    date: 'Sunday, 23 Nov',
    status: 'Pending',
  },
];

export const BookingsScreen: React.FC = () => {
  return (
    <Screen backgroundColor={colors.background} statusBarStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Bookings</Text>
          <Text style={styles.subtitle}>Reserved community amenities & recreational slots</Text>
        </View>

        <FlatList
          data={SAMPLE_BOOKINGS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.amenityName}>{item.amenityName}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === 'Confirmed'
                          ? colors.successContainer
                          : colors.warningContainer,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          item.status === 'Confirmed'
                            ? colors.onSuccess
                            : colors.onWarning,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.slotText}>⏰ {item.slot}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.dateText}>📅 {item.date}</Text>
                <Text style={styles.bookingId}>{item.id}</Text>
              </View>
            </View>
          )}
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
  amenityName: {
    ...typography.headlineSm,
    color: colors.onSurface,
    fontSize: 16,
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
  slotText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    ...typography.labelSm,
    color: colors.primary,
  },
  bookingId: {
    ...typography.labelSm,
    color: colors.outline,
  },
});
