/**
 * Screen 13_Booking_Conflict
 * Source of Truth: Stitch Screen 13_Booking_Conflict (id: de96b029ce63447fbbab6d1588eb50b5)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BookingConflictInfo, BookingConfirmation } from '../types';
import { useAmenitySlots } from '../hooks/useAmenitySlots';
import { useCreateBooking } from '../hooks/useCreateBooking';
import { AppButton } from '../../../components/common/AppButton';
import { BackArrowIcon, CloseIcon, ClockIcon } from '../../../components/common/Icons';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface BookingConflictScreenProps {
  conflict: BookingConflictInfo;
  onBackToAmenity: () => void;
  onBackToAmenitiesList: () => void;
  onBookingSuccess: (confirmation: BookingConfirmation) => void;
}

export const BookingConflictScreen: React.FC<BookingConflictScreenProps> = ({
  conflict,
  onBackToAmenity,
  onBackToAmenitiesList,
  onBookingSuccess,
}) => {
  const insets = useSafeAreaInsets();

  // Query refreshed live slots for the conflict date
  const { slots, refetch: refetchSlots } = useAmenitySlots(
    conflict.assetId,
    conflict.date
  );

  // Filter available slots
  const availableSlots = slots.filter((s) => s.isAvailable && s.status === 'AVAILABLE');

  // Currently selected replacement slot
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(() =>
    availableSlots.length > 0 ? availableSlots[0].id : null
  );

  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  // Booking mutation for alternative slot
  const createBookingMutation = useCreateBooking({
    assetId: conflict.assetId,
    onSuccess: (data, payload) => {
      onBookingSuccess({
        referenceId: data.reference_id || data.code || 'BKN-RES',
        amenityName: conflict.amenityName,
        buildingName: conflict.buildingName,
        residentName: 'Resident',
        date: payload.date,
        displayDate: conflict.displayDate,
        timeWindow: selectedSlot?.formattedRange || payload.start_time,
      });
    },
    onError: () => {
      // Refresh slots again on repeated conflict
      refetchSlots();
    },
  });

  const handleBookAlternative = () => {
    if (!selectedSlot) {
      onBackToAmenity();
      return;
    }

    createBookingMutation.mutate({
      date: conflict.date,
      start_time: selectedSlot.startTime,
      slots: 1,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top App Navigation Bar */}
      <View style={styles.navBar}>
        <Pressable
          onPress={onBackToAmenity}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Back to amenity details"
        >
          <BackArrowIcon size={20} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.navTitle}>Slot Unavailable</Text>
        <Pressable
          onPress={onBackToAmenitiesList}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Close conflict screen"
        >
          <CloseIcon size={18} color={colors.onSurface} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.lg },
        ]}
      >
        {/* Hero Warning Visual & Reassurance */}
        <View style={styles.heroSection}>
          <View style={styles.warningCircle}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"
                fill={colors.error}
              />
            </Svg>
          </View>

          {/* Stitch 409 Pill */}
          <View style={styles.conflictPill}>
            <View style={styles.pulsingRedDot} />
            <Text style={styles.conflictPillText}>HTTP 409 · Just Taken</Text>
          </View>

          <Text style={styles.headline}>This Slot Was Just Booked</Text>
          <Text style={styles.subheadline}>
            Another resident completed booking for this court seconds ago. We’ve kept your reservation active and refreshed the live schedule below.
          </Text>
        </View>

        {/* Conflict Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <View style={styles.facilityIconCircle}>
              <Text style={styles.facilityEmoji}>🏸</Text>
            </View>
            <View style={styles.facilityDetails}>
              <Text style={styles.summaryAmenityName} numberOfLines={1}>
                {conflict.amenityName}
              </Text>
              <Text style={styles.summaryBuildingText} numberOfLines={1}>
                {conflict.buildingName}
              </Text>
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{conflict.displayDate}</Text>
            </View>
          </View>

          {/* Attempted Slot Indicator */}
          <View style={styles.attemptedSlotRow}>
            <View style={styles.attemptedSlotLeft}>
              <ClockIcon size={18} color={colors.error} />
              <View>
                <Text style={styles.attemptedLabel}>Attempted Slot</Text>
                <Text style={styles.attemptedTimeText}>
                  {conflict.attemptedTimeWindow}
                </Text>
              </View>
            </View>
            <View style={styles.takenBadge}>
              <Text style={styles.takenBadgeText}>Taken</Text>
            </View>
          </View>
        </View>

        {/* Real-time Alternative Slots Section */}
        <View style={styles.alternativesSection}>
          <View style={styles.alternativesHeaderRow}>
            <View>
              <Text style={styles.alternativesTitle}>Available Alternatives</Text>
              <Text style={styles.alternativesSubtitle}>
                Recommended available slots on {conflict.displayDate}
              </Text>
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>⚡ Live</Text>
            </View>
          </View>

          {/* Alternative Slots List */}
          <View style={styles.alternativeList}>
            {availableSlots.length === 0 ? (
              <View style={styles.noAlternativesBox}>
                <Text style={styles.noAlternativesText}>
                  No remaining slots are available today. Tap below to choose another date.
                </Text>
              </View>
            ) : (
              availableSlots.slice(0, 5).map((slot, index) => {
                const isSelected = slot.id === selectedSlotId;
                return (
                  <Pressable
                    key={slot.id}
                    onPress={() => setSelectedSlotId(slot.id)}
                    style={({ pressed }) => [
                      styles.slotOption,
                      isSelected && styles.slotOptionSelected,
                      pressed && styles.slotOptionPressed,
                    ]}
                  >
                    <View style={styles.slotOptionLeft}>
                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.radioCircleSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioDot} />}
                      </View>
                      <View>
                        <View style={styles.slotOptionTimeRow}>
                          <Text style={styles.slotOptionTime}>
                            {slot.formattedRange}
                          </Text>
                          {index === 0 && (
                            <View style={styles.adjacentBadge}>
                              <Text style={styles.adjacentBadgeText}>Next Slot</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.slotOptionCourtInfo}>
                          Available for reservation
                        </Text>
                      </View>
                    </View>
                    <View style={styles.freeBadge}>
                      <Text style={styles.freeBadgeText}>Select</Text>
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        </View>

        {/* Community Courtesy Note */}
        <View style={styles.holdNoteCard}>
          <Text style={styles.holdNoteIcon}>⏱</Text>
          <Text style={styles.holdNoteText}>
            Selected replacement slot will be held while you complete this confirmation.
          </Text>
        </View>

        {/* Sticky Actions */}
        <View style={styles.actionsContainer}>
          {availableSlots.length > 0 && selectedSlot ? (
            <AppButton
              title={
                createBookingMutation.isPending
                  ? 'Booking...'
                  : `Book ${selectedSlot.formattedRange}`
              }
              variant="primary"
              onPress={handleBookAlternative}
              isLoading={createBookingMutation.isPending}
              disabled={createBookingMutation.isPending}
              style={styles.confirmButton}
            />
          ) : (
            <AppButton
              title="Choose Another Date"
              variant="primary"
              onPress={onBackToAmenity}
              style={styles.confirmButton}
            />
          )}

          <AppButton
            title="Back to All Amenities"
            variant="outline"
            onPress={onBackToAmenitiesList}
            style={styles.secondaryButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
  },
  navBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  scrollContent: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.md,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  warningCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFDAD6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  conflictPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFDAD6',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
    gap: 6,
    marginBottom: 8,
  },
  pulsingRedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
  },
  conflictPillText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: '700',
    color: colors.error,
  },
  headline: {
    ...typography.headlineLg,
    fontSize: 20,
    fontWeight: '800',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 6,
  },
  subheadline: {
    ...typography.bodySm,
    fontSize: 12.5,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 310,
  },
  summaryCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
    gap: spacing.sm,
  },
  facilityIconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(172, 235, 231, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityEmoji: {
    fontSize: 22,
  },
  facilityDetails: {
    flex: 1,
  },
  summaryAmenityName: {
    ...typography.headlineSm,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  summaryBuildingText: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  dateBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  dateBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  attemptedSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF0F0',
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  attemptedSlotLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  attemptedLabel: {
    ...typography.labelSm,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  attemptedTimeText: {
    ...typography.bodyMd,
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
    textDecorationLine: 'line-through',
  },
  takenBadge: {
    backgroundColor: '#FFDAD6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  takenBadgeText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: '700',
    color: colors.error,
  },
  alternativesSection: {
    marginBottom: spacing.md,
  },
  alternativesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  alternativesTitle: {
    ...typography.headlineSm,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  alternativesSubtitle: {
    ...typography.bodySm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  liveBadge: {
    backgroundColor: 'rgba(172, 235, 231, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  liveBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  alternativeList: {
    gap: 8,
    marginTop: spacing.xs,
  },
  noAlternativesBox: {
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  noAlternativesText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  slotOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  slotOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(172, 235, 231, 0.15)',
  },
  slotOptionPressed: {
    opacity: 0.9,
  },
  slotOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.onPrimary,
  },
  slotOptionTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  slotOptionTime: {
    ...typography.labelMd,
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  adjacentBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  adjacentBadgeText: {
    ...typography.labelSm,
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary,
  },
  slotOptionCourtInfo: {
    ...typography.bodySm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  freeBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  freeBadgeText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  holdNoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  holdNoteIcon: {
    fontSize: 16,
  },
  holdNoteText: {
    ...typography.bodySm,
    fontSize: 11.5,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 16,
  },
  actionsContainer: {
    gap: spacing.xs,
  },
  confirmButton: {
    width: '100%',
    height: 48,
    borderRadius: radius.xl,
  },
  secondaryButton: {
    width: '100%',
    height: 44,
    borderRadius: radius.xl,
  },
});
