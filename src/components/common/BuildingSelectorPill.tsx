/**
 * Building Selector Pill
 * Reusable pill allowing resident to switch between properties / units
 * Source of Truth: Stitch Screen 04_Home, 06_Select_Building
 */

import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useCurrentBuilding } from '../../features/buildings/hooks/useCurrentBuilding';
import { colors, radius, typography, spacing, shadows } from '../../theme';
import { BuildingIcon, ChevronDownIcon } from './Icons';

interface BuildingSelectorPillProps {
  onPress?: () => void;
}

export const BuildingSelectorPill: React.FC<BuildingSelectorPillProps> = ({
  onPress,
}) => {
  const { selectedBuilding, selectedUnit } = useCurrentBuilding();

  const buildingName = selectedBuilding?.name || 'Select Property';
  const subText = selectedUnit?.number
    ? `Unit ${selectedUnit.number}`
    : selectedBuilding?.tower
      ? `Tower ${selectedBuilding.tower}`
      : selectedBuilding?.address || 'Tap to select';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Selected building: ${buildingName}`}
    >
      <View style={styles.iconCircle}>
        <BuildingIcon size={16} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.buildingName} numberOfLines={1}>
          {buildingName}
        </Text>
        <Text style={styles.communityName} numberOfLines={1}>
          {subText}
        </Text>
      </View>
      <ChevronDownIcon size={14} color={colors.outline} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
    maxWidth: 240,
    ...shadows.sm,
  },
  pressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing['2xs'],
  },
  buildingName: {
    ...typography.labelSm,
    color: colors.onSurface,
  },
  communityName: {
    ...typography.labelXs,
    color: colors.onSurfaceVariant,
    fontSize: 9,
    lineHeight: 11,
  },
});
