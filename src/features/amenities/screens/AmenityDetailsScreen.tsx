/**
 * Screen 08_Amenity_Details_Booking
 * Source of Truth: Stitch Screen 08_Amenity_Details_Booking (id: de61325320064bb1baf1e25482f646d8)
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAmenities } from '../hooks/useAmenities';
import { useAmenitySlots } from '../hooks/useAmenitySlots';
import { useCreateBooking } from '../hooks/useCreateBooking';
import { useCurrentBuilding } from '../../buildings/hooks/useCurrentBuilding';
import { useResidentProfileQuery } from '../../profile/api/profileApi';
import { DateSelector } from '../components/DateSelector';
import { TimeSlotButton } from '../components/TimeSlotButton';
import { AppImage } from '../../../components/common/AppImage';
import { AppButton } from '../../../components/common/AppButton';
import { BackArrowIcon } from '../../../components/common/Icons';
import { formatApiDate, formatDisplayDate } from '../utils/bookingDate';
import {
  validateConsecutiveSlots,
  handleSlotToggle,
} from '../utils/slotSelection';
import {
  BookingConfirmation,
  BookingConflictInfo,
} from '../types';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface AmenityDetailsScreenProps {
  assetId: string;
  assetName?: string;
  onBack: () => void;
  onBookingSuccess: (confirmation: BookingConfirmation) => void;
  onBookingConflict: (conflict: BookingConflictInfo) => void;
}

export const AmenityDetailsScreen: React.FC<AmenityDetailsScreenProps> = ({
  assetId,
  assetName,
  onBack,
  onBookingSuccess,
  onBookingConflict,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    formatApiDate(new Date())
  );
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const { selectedBuilding, selectedUnit } = useCurrentBuilding();
  const { data: profile } = useResidentProfileQuery();

  // Fetch amenity catalog to get details
  const { amenities } = useAmenities();
  const amenity = useMemo(() => {
    return (
      amenities.find((a) => a.id === assetId) || {
        id: assetId,
        name: assetName || 'Community Amenity',
        category: 'Indoor',
        isAvailable: true,
        availabilityLabel: 'Available' as const,
        courtCount: '2 Courts',
        capacity: 'Max 4 per slot',
        description:
          'Well maintained resident amenity with premium facilities and lighting. Access requires resident confirmation.',
      }
    );
  }, [amenities, assetId, assetName]);

  // Fetch slots for this asset and selected date
  const {
    slots,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
    error: slotsError,
    refetch: refetchSlots,
  } = useAmenitySlots(assetId, selectedDate);

  // Validate consecutive slot selection
  const slotValidation = useMemo(() => {
    return validateConsecutiveSlots(slots, selectedSlotIds);
  }, [slots, selectedSlotIds]);

  // Booking mutation
  const createBookingMutation = useCreateBooking({
    assetId,
    onSuccess: (data, payload) => {
      const referenceId =
        data.reference_id ||
        data.code ||
        data.data?.reference_id ||
        (data.id ? `REF-${data.id}` : undefined);

      onBookingSuccess({
        referenceId,
        amenityName: amenity.name,
        buildingName: selectedBuilding?.name || 'Community Residence',
        unitNumber: selectedUnit?.number,
        residentName: profile?.name || 'Resident',
        date: payload.date,
        displayDate: formatDisplayDate(payload.date),
        timeWindow: slotValidation.formattedRange,
        imageUrl: amenity.imageUrl,
      });
    },
    onError: (err: any, payload) => {
      // Check for 409 Conflict
      if (err?.status === 409 || err?.code === 'CONFLICT') {
        onBookingConflict({
          assetId,
          amenityName: amenity.name,
          buildingName: selectedBuilding?.name || 'Community Residence',
          date: payload.date,
          displayDate: formatDisplayDate(payload.date),
          attemptedTimeWindow: slotValidation.formattedRange,
          message:
            err?.message ||
            'This time slot was just booked by another resident. Please select another time.',
        });
        return;
      }

      // Check for 422 Validation Error
      if (err?.status === 422 || err?.code === 'VALIDATION_ERROR') {
        setSubmissionError(
          err?.message ||
            'This booking cannot be completed with the selected options. Please review your date and time.'
        );
        return;
      }

      // Check for 429 Rate Limit
      if (err?.status === 429 || err?.code === 'RATE_LIMITED') {
        setSubmissionError('Too many attempts. Please try again shortly.');
        return;
      }

      // Server / Network error
      setSubmissionError(
        err?.message ||
          'Unable to complete booking at this time. Please check your connection and try again.'
      );
    },
  });

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSelectedSlotIds([]); // Reset slot selection when date changes
    setSubmissionError(null);
  };

  const handleSlotPress = (slotId: string) => {
    setSubmissionError(null);
    const updated = handleSlotToggle(selectedSlotIds, slotId, slots);
    setSelectedSlotIds(updated);
  };

  const handleBookNow = () => {
    if (!slotValidation.isValid) {
      Alert.alert('Invalid Selection', slotValidation.errorMessage || 'Please select valid consecutive slots.');
      return;
    }

    setSubmissionError(null);
    createBookingMutation.mutate({
      date: selectedDate,
      start_time: slotValidation.startTime,
      slots: slotValidation.slotCount,
    });
  };

  // Group slots into 2-column rows
  const slotRows = useMemo(() => {
    const rows: (typeof slots)[] = [];
    for (let i = 0; i < slots.length; i += 2) {
      rows.push(slots.slice(i, i + 2));
    }
    return rows;
  }, [slots]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Stitch 08 Navigation Bar */}
      <View style={styles.navBar}>
        <Pressable
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <BackArrowIcon size={24} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.navTitle} numberOfLines={1}>
          {amenity.name}
        </Text>
        <View style={styles.navPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
      >
        {/* Stitch Hero Visual Section */}
        <View style={styles.heroContainer}>
          <AppImage
            uri={
              amenity.imageUrl ||
              'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
            }
            containerStyle={styles.heroImageContainer}
            style={styles.heroImage}
          />
          {/* Gallery badge */}
          <View style={styles.galleryBadge}>
            <Text style={styles.galleryBadgeText}>📷 1/5</Text>
          </View>
        </View>

        {/* Content Container */}
        <View style={styles.contentBody}>
          {/* Title & Availability Badge */}
          <View style={styles.titleRow}>
            <Text style={styles.amenityTitle}>{amenity.name}</Text>
            <View style={styles.availableBadge}>
              <Text style={styles.availableBadgeText}>
                {amenity.availabilityLabel}
              </Text>
            </View>
          </View>

          {/* Quick Metadata Row */}
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>🏟 {amenity.category}</Text>
            {amenity.courtCount && (
              <Text style={styles.metaItem}>•  {amenity.courtCount}</Text>
            )}
            {amenity.capacity && (
              <Text style={styles.metaItem}>•  {amenity.capacity}</Text>
            )}
          </View>

          {/* Description Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Description</Text>
            <Text style={styles.descriptionText}>
              {amenity.description ||
                'Well maintained resident amenity with premium facilities and lighting. Rackets and equipment are subject to building rules.'}
            </Text>
          </View>

          {/* Date Selection Section */}
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />

          {/* Time Slot Selection Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Select Time Slot</Text>

            {isSlotsLoading ? (
              <View style={styles.slotsLoadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.slotsLoadingText}>Checking live slot availability...</Text>
              </View>
            ) : isSlotsError ? (
              <View style={styles.slotsErrorContainer}>
                <Text style={styles.slotsErrorTitle}>Failed to load slots</Text>
                <Text style={styles.slotsErrorText}>
                  {(slotsError as any)?.message || 'Server error loading availability.'}
                </Text>
                <AppButton
                  title="Retry Slots"
                  variant="outline"
                  onPress={() => refetchSlots()}
                  style={styles.retrySlotsBtn}
                />
              </View>
            ) : slots.length === 0 ? (
              <View style={styles.noSlotsContainer}>
                <Text style={styles.noSlotsTitle}>No slots available</Text>
                <Text style={styles.noSlotsText}>
                  There are no bookable times for {formatDisplayDate(selectedDate)}. Please choose another date.
                </Text>
              </View>
            ) : (
              <View style={styles.slotsGrid}>
                {slotRows.map((row, rowIndex) => (
                  <View key={`row-${rowIndex}`} style={styles.slotRow}>
                    {row.map((slot) => {
                      const isSelected = selectedSlotIds.includes(slot.id);
                      return (
                        <TimeSlotButton
                          key={slot.id}
                          slot={slot}
                          isSelected={isSelected}
                          onPress={() => handleSlotPress(slot.id)}
                        />
                      );
                    })}
                    {/* Placeholder spacer if odd number of slots */}
                    {row.length === 1 && <View style={styles.slotSpacer} />}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Capacity Notice */}
          <View style={styles.capacityNotice}>
            <Text style={styles.capacityNoticeTitle}>Capacity</Text>
            <Text style={styles.capacityNoticeText}>
              👥 {amenity.capacity || 'Max 4 people per slot'}
            </Text>
          </View>

          {/* Error Banner if submission failed */}
          {submissionError && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{submissionError}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View
        style={[
          styles.stickyFooter,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <AppButton
          title={
            createBookingMutation.isPending
              ? 'Booking...'
              : slotValidation.isValid
              ? `Book ${slotValidation.formattedRange}`
              : 'Book Now'
          }
          variant="primary"
          onPress={handleBookNow}
          disabled={!slotValidation.isValid || createBookingMutation.isPending}
          isLoading={createBookingMutation.isPending}
          style={styles.bookButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  navBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.surfaceContainerLowest,
  },
  backButton: {
    padding: spacing['2xs'],
    marginLeft: -4,
  },
  navTitle: {
    ...typography.headlineSm,
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    maxWidth: 260,
  },
  navPlaceholder: {
    width: 28,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    width: '100%',
    height: 210,
    position: 'relative',
    backgroundColor: colors.surfaceContainerHigh,
  },
  heroImageContainer: {
    width: '100%',
    height: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  galleryBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  galleryBadgeText: {
    ...typography.labelSm,
    fontSize: 12,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  contentBody: {
    padding: spacing.margin,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  amenityTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: '800',
    color: colors.onSurface,
    flex: 1,
    marginRight: spacing.sm,
  },
  availableBadge: {
    backgroundColor: '#ECFDF3',
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#D1FADF',
  },
  availableBadgeText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: '700',
    color: '#12B76A',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metaItem: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  sectionBlock: {
    marginBottom: spacing.md,
  },
  sectionHeading: {
    ...typography.headlineSm,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  descriptionText: {
    ...typography.bodySm,
    fontSize: 12.5,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  slotsLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  slotsLoadingText: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  slotsErrorContainer: {
    backgroundColor: '#FEF3F2',
    padding: spacing.md,
    borderRadius: radius.xl,
    alignItems: 'center',
  },
  slotsErrorTitle: {
    ...typography.labelMd,
    color: colors.error,
    fontWeight: '700',
    marginBottom: 4,
  },
  slotsErrorText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  retrySlotsBtn: {
    minWidth: 120,
    height: 38,
  },
  noSlotsContainer: {
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.md,
    borderRadius: radius.xl,
    alignItems: 'center',
  },
  noSlotsTitle: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '700',
    marginBottom: 4,
  },
  noSlotsText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  slotsGrid: {
    marginTop: 4,
  },
  slotRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  slotSpacer: {
    flex: 1,
    margin: 4,
  },
  capacityNotice: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  capacityNoticeTitle: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  capacityNoticeText: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  errorBanner: {
    backgroundColor: '#FEE4E2',
    borderWidth: 1,
    borderColor: '#FDA29B',
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  errorBannerText: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.error,
    lineHeight: 16,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    ...shadows.lg,
  },
  bookButton: {
    width: '100%',
    height: 48,
    borderRadius: radius.xl,
  },
});
