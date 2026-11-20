/**
 * Amenity Filter Chip Component
 * Source of Truth: Stitch Screen 07_Amenities
 */

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme';

interface AmenityFilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const AmenityFilterChip: React.FC<AmenityFilterChipProps> = ({
  label,
  isActive,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        isActive ? styles.chipActive : styles.chipInactive,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Filter by ${label}`}
    >
      <Text
        style={[
          styles.chipText,
          isActive ? styles.textActive : styles.textInactive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.full,
    marginRight: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: '#EAEFF2',
  },
  chipText: {
    ...typography.labelSm,
    fontSize: 13,
    lineHeight: 16,
  },
  textActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  textInactive: {
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
});
