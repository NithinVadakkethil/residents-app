/**
 * Amenity Card Component
 * Source of Truth: Stitch Screen 07_Amenities
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Amenity } from '../types';
import { AppImage } from '../../../components/common/AppImage';
import { ChevronRightIcon } from '../../../components/common/ServiceIcons';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface AmenityCardProps {
  amenity: Amenity;
  onPress: () => void;
}

export const AmenityCard: React.FC<AmenityCardProps> = ({ amenity, onPress }) => {
  const isAvailable = amenity.isAvailable;
  const isLimited = amenity.availabilityLabel === 'Limited Slots';

  const badgeBg = isAvailable
    ? isLimited
      ? '#FEF0C7'
      : '#ECFDF3'
    : '#F2F4F7';

  const badgeTextColor = isAvailable
    ? isLimited
      ? '#B54708'
      : '#027A48'
    : colors.outline;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${amenity.name}, ${amenity.category}, ${amenity.availabilityLabel}`}
    >
      <View style={styles.contentLeft}>
        {/* Amenity Thumbnail */}
        <AppImage
          uri={amenity.imageUrl}
          containerStyle={styles.imageContainer}
          style={styles.image}
        />

        {/* Info Column */}
        <View style={styles.infoColumn}>
          <Text style={styles.title} numberOfLines={1}>
            {amenity.name}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {amenity.category}
          </Text>

          {/* Availability Pill */}
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeTextColor }]}>
              {amenity.availabilityLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Chevron */}
      <View style={styles.chevronContainer}>
        <ChevronRightIcon size={16} color={colors.outline} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(232, 236, 239, 0.8)',
    padding: spacing.sm,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  cardPressed: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primary,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.headlineSm,
    fontSize: 14.5,
    lineHeight: 18,
    color: colors.onSurface,
    fontWeight: '700',
  },
  category: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: radius.full,
    marginTop: 5,
  },
  badgeText: {
    ...typography.labelSm,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '600',
  },
  chevronContainer: {
    paddingRight: spacing.xs,
  },
});
