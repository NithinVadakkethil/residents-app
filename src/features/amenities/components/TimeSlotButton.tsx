/**
 * Time Slot Button Component
 * Source of Truth: Stitch Screen 08_Amenity_Details_Booking
 * 2-column slot button with Available, Selected, Booked and Disabled states
 */

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { AmenitySlot } from '../types';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface TimeSlotButtonProps {
  slot: AmenitySlot;
  isSelected: boolean;
  onPress: () => void;
}

export const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  slot,
  isSelected,
  onPress,
}) => {
  const isBooked = slot.status === 'BOOKED' || !slot.isAvailable;
  const isDisabled = slot.status === 'DISABLED';

  return (
    <Pressable
      onPress={onPress}
      disabled={isBooked || isDisabled}
      style={({ pressed }) => [
        styles.button,
        isSelected && styles.buttonSelected,
        isBooked && styles.buttonBooked,
        pressed && !isBooked && styles.buttonPressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{
        selected: isSelected,
        disabled: isBooked || isDisabled,
      }}
      accessibilityLabel={`${slot.formattedRange}, ${
        isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'
      }`}
    >
      <Text
        style={[
          styles.slotText,
          isSelected && styles.textSelected,
          isBooked && styles.textBooked,
        ]}
        numberOfLines={1}
      >
        {slot.formattedRange}
      </Text>
      {isBooked && (
        <Text style={styles.bookedBadgeText}>Booked</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    margin: 4,
    ...shadows.sm,
  },
  buttonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonBooked: {
    backgroundColor: '#F2F4F7',
    borderColor: '#EAECF0',
    opacity: 0.7,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  slotText: {
    ...typography.labelSm,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  textSelected: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  textBooked: {
    color: '#98A2B3',
    textDecorationLine: 'line-through',
  },
  bookedBadgeText: {
    fontSize: 9,
    lineHeight: 11,
    color: colors.error,
    fontWeight: '600',
    marginTop: 1,
  },
});
