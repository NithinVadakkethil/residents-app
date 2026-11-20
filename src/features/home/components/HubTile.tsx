/**
 * Reusable Hub Tile Component
 * Source of Truth: Stitch Screen 04_Home ("Go To" Resident Hub)
 */

import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { HubItemConfig } from '../types/services';
import {
  AssignmentCheckIcon,
  EventAvailableIcon,
  ApartmentIcon,
  CampaignIcon,
  CalendarMonthIcon,
  FolderOpenIcon,
  QuizIcon,
} from '../../../components/common/ServiceIcons';
import { colors, radius, typography } from '../../../theme';

interface HubTileProps {
  item: HubItemConfig;
  onPress: (item: HubItemConfig) => void;
}

export const HubTile: React.FC<HubTileProps> = ({ item, onPress }) => {
  const renderIcon = () => {
    switch (item.key) {
      case 'MY_REQUESTS':
        return <AssignmentCheckIcon color={item.iconColor} size={24} />;
      case 'MY_BOOKINGS':
        return <EventAvailableIcon color={item.iconColor} size={24} />;
      case 'MY_UNITS':
        return <ApartmentIcon color={item.iconColor} size={24} />;
      case 'ANNOUNCEMENTS':
        return <CampaignIcon color={item.iconColor} size={24} />;
      case 'EVENT_CALENDAR':
        return <CalendarMonthIcon color={item.iconColor} size={24} />;
      case 'DOCUMENTS':
        return <FolderOpenIcon color={item.iconColor} size={24} />;
      case 'HELP_FAQS':
        return <QuizIcon color={item.iconColor} size={24} />;
      default:
        return <ApartmentIcon color={item.iconColor} size={24} />;
    }
  };

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={item.label}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        {renderIcon()}
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {item.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: radius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    ...typography.labelSm,
    color: colors.onSurface,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
  },
});
