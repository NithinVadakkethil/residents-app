/**
 * Screen 12_Booking_Success
 * Source of Truth: Stitch Screen 12_Booking_Success (id: 23c8c42f5d7645fdae85a2a79a2dbb6f)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BookingConfirmation } from '../types';
import { AppImage } from '../../../components/common/AppImage';
import { AppButton } from '../../../components/common/AppButton';
import { CloseIcon, CalendarIcon, ClockIcon } from '../../../components/common/Icons';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface BookingSuccessScreenProps {
  confirmation: BookingConfirmation;
  onViewMyBookings: () => void;
  onBackToHome: () => void;
}

export const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({
  confirmation,
  onViewMyBookings,
  onBackToHome,
}) => {
  const insets = useSafeAreaInsets();

  const referenceId = confirmation.referenceId || 'WSMM-BKN-101';
  const unitText = confirmation.unitNumber ? `Unit ${confirmation.unitNumber}` : 'Resident';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Navigation / Modal Dismiss Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerPlaceholder} />
        <View style={styles.passGeneratedBadge}>
          <View style={styles.pulsingDot} />
          <Text style={styles.passGeneratedText}>PASS GENERATED</Text>
        </View>
        <Pressable
          onPress={onBackToHome}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Close confirmation"
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
        {/* Celebratory Check Circle & Headline */}
        <View style={styles.celebratorySection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill={colors.primary}
                />
              </Svg>
            </View>
          </View>
          <Text style={styles.headline}>Booking Confirmed!</Text>
          <Text style={styles.subheadline}>
            Your reservation has been confirmed. A digital pass has been sent to your registered resident email.
          </Text>
        </View>

        {/* Digital Access Ticket / Summary Card */}
        <View style={styles.ticketCard}>
          {/* Card Top: Facility Visual & Identity */}
          <View style={styles.ticketTopRow}>
            <AppImage
              uri={confirmation.imageUrl}
              containerStyle={styles.facilityThumbnail}
              style={styles.thumbnailImage}
            />
            <View style={styles.facilityInfo}>
              <View style={styles.badgeRow}>
                <View style={styles.confirmedPill}>
                  <Text style={styles.confirmedPillText}>Confirmed</Text>
                </View>
                <Text style={styles.courtTagText}>📍 Facility Pass</Text>
              </View>
              <Text style={styles.amenityName} numberOfLines={1}>
                {confirmation.amenityName}
              </Text>
              <Text style={styles.buildingContext} numberOfLines={1}>
                {confirmation.buildingName}
              </Text>
            </View>
          </View>

          {/* Ticket Tear Effect Cutouts */}
          <View style={styles.tearContainer}>
            <View style={styles.cutoutLeft} />
            <View style={styles.dashedDivider} />
            <View style={styles.cutoutRight} />
          </View>

          {/* Card Body: Reservation Attributes Grid */}
          <View style={styles.attributesGrid}>
            <View style={styles.attributeRow}>
              {/* Date */}
              <View style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>Date</Text>
                <View style={styles.attributeValueRow}>
                  <CalendarIcon size={14} color={colors.primary} />
                  <Text style={styles.attributeValueText} numberOfLines={1}>
                    {confirmation.displayDate}
                  </Text>
                </View>
              </View>

              {/* Time Window */}
              <View style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>Time Window</Text>
                <View style={styles.attributeValueRow}>
                  <ClockIcon size={14} color={colors.primary} />
                  <Text style={styles.attributeValueText} numberOfLines={1}>
                    {confirmation.timeWindow}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.attributeRow, styles.attributeRowBorder]}>
              {/* Booked For */}
              <View style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>Booked For</Text>
                <Text style={styles.attributeValueText} numberOfLines={1}>
                  {confirmation.residentName}
                </Text>
                <Text style={styles.unitSubtext}>{unitText}</Text>
              </View>

              {/* Reference ID */}
              <View style={styles.attributeItem}>
                <Text style={styles.attributeLabel}>Reference ID</Text>
                <Text style={styles.referenceIdText} numberOfLines={1}>
                  {referenceId}
                </Text>
                <Text style={styles.verifiedSubtext}>✓ Verified • Resident</Text>
              </View>
            </View>

            {/* Smart Turnstile QR Token Container */}
            <View style={styles.qrContainer}>
              <View style={styles.qrBox}>
                <Svg width={96} height={96} viewBox="0 0 110 110" fill={colors.primary}>
                  <Path d="M10 10h30v30H10zM16 16v18h18V16zM22 22h6v6h-6z" />
                  <Path d="M70 10h30v30H70zM76 16v18h18V16zM82 22h6v6h-6z" />
                  <Path d="M10 70h30v30H10zM16 76v18h18V76zM22 82h6v6h-6z" />
                  <Path d="M46 10h6v6h-6zM58 10h6v6h-6zM46 22h6v6h-6zM58 22h6v6h-6zM46 34h6v6h-6zM58 34h6v6h-6zM10 46h6v6h-6zM22 46h6v6h-6zM34 46h6v6h-6zM46 46h6v6h-6zM70 46h6v6h-6zM82 46h6v6h-6zM94 46h6v6h-6zM10 58h6v6h-6zM34 58h6v6h-6zM58 58h6v6h-6zM70 58h6v6h-6zM94 58h6v6h-6zM46 70h6v6h-6zM58 70h6v6h-6zM70 70h6v6h-6zM82 70h6v6h-6zM46 82h6v6h-6zM70 82h6v6h-6zM94 82h6v6h-6zM46 94h6v6h-6zM58 94h6v6h-6zM82 94h6v6h-6z" />
                </Svg>
              </View>
              <Text style={styles.qrHelpText}>
                Scan this digital pass at the Amenity Reception or Smart Gate
              </Text>
            </View>
          </View>
        </View>

        {/* Facility Advisory Note */}
        <View style={styles.advisoryCard}>
          <Text style={styles.advisoryIcon}>ℹ️</Text>
          <Text style={styles.advisoryText}>
            Please arrive 5 minutes prior to your reserved slot. Clean athletic footwear is required inside the amenity zone.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <AppButton
            title="View My Bookings"
            variant="primary"
            onPress={onViewMyBookings}
            style={styles.primaryAction}
          />
          <AppButton
            title="Back to Home"
            variant="outline"
            onPress={onBackToHome}
            style={styles.secondaryAction}
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    paddingVertical: spacing.xs,
  },
  headerPlaceholder: {
    width: 36,
  },
  passGeneratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  passGeneratedText: {
    ...typography.labelSm,
    fontSize: 11,
    letterSpacing: 0.8,
    fontWeight: '700',
    color: colors.primary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.xs,
  },
  celebratorySection: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  iconCircleOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(172, 235, 231, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconCircleInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  headline: {
    ...typography.headlineLg,
    fontSize: 22,
    fontWeight: '800',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 6,
  },
  subheadline: {
    ...typography.bodySm,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 18,
  },
  ticketCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  ticketTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    gap: spacing.md,
  },
  facilityThumbnail: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  facilityInfo: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  confirmedPill: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  confirmedPillText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  courtTagText: {
    ...typography.labelSm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  amenityName: {
    ...typography.headlineSm,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  buildingContext: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  tearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 20,
    backgroundColor: colors.surfaceContainerLowest,
  },
  cutoutLeft: {
    width: 16,
    height: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#F7F9FF',
    marginLeft: -2,
  },
  dashedDivider: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    marginHorizontal: spacing.xs,
  },
  cutoutRight: {
    width: 16,
    height: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#F7F9FF',
    marginRight: -2,
  },
  attributesGrid: {
    padding: spacing.md,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  attributeRowBorder: {
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerLow,
  },
  attributeItem: {
    flex: 1,
  },
  attributeLabel: {
    ...typography.labelSm,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    marginBottom: 3,
  },
  attributeValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attributeValueText: {
    ...typography.labelMd,
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.onSurface,
  },
  unitSubtext: {
    ...typography.bodySm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  referenceIdText: {
    ...typography.labelMd,
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: 0.5,
  },
  verifiedSubtext: {
    ...typography.bodySm,
    fontSize: 10,
    color: colors.primary,
    marginTop: 1,
    fontWeight: '600',
  },
  qrContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  qrBox: {
    padding: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
    ...shadows.sm,
  },
  qrHelpText: {
    ...typography.labelSm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  advisoryCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  advisoryIcon: {
    fontSize: 16,
  },
  advisoryText: {
    ...typography.bodySm,
    fontSize: 11.5,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 16,
  },
  actionButtonsContainer: {
    gap: spacing.xs,
  },
  primaryAction: {
    width: '100%',
    height: 48,
    borderRadius: radius.xl,
  },
  secondaryAction: {
    width: '100%',
    height: 48,
    borderRadius: radius.xl,
  },
});
