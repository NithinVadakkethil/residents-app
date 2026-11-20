/**
 * Reusable Service Tile Component
 * Source of Truth: Stitch Screen 04_Home ("Request a Service")
 */

import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { ResidentServiceConfig } from '../types/services';
import {
  MoveInIcon,
  MoveOutIcon,
  VisitorPassIcon,
  MaintenanceIcon,
  AccessCardIcon,
  UnitViewingIcon,
  WorkPermitIcon,
  AmenitiesIcon,
} from '../../../components/common/ServiceIcons';
import { colors, radius, typography } from '../../../theme';

interface ServiceTileProps {
  service: ResidentServiceConfig;
  onPress: (service: ResidentServiceConfig) => void;
}

export const ServiceTile: React.FC<ServiceTileProps> = ({ service, onPress }) => {
  const renderIcon = () => {
    switch (service.key) {
      case 'MOVE_IN':
        return <MoveInIcon color={service.iconColor} size={26} />;
      case 'MOVE_OUT':
        return <MoveOutIcon color={service.iconColor} size={26} />;
      case 'VISITOR_PASS':
        return <VisitorPassIcon color={service.iconColor} size={26} />;
      case 'MAINTENANCE':
        return <MaintenanceIcon color={service.iconColor} size={26} />;
      case 'ACCESS_CARD':
        return <AccessCardIcon color={service.iconColor} size={26} />;
      case 'UNIT_VIEWING':
        return <UnitViewingIcon color={service.iconColor} size={26} />;
      case 'WORK_PERMIT':
        return <WorkPermitIcon color={service.iconColor} size={26} />;
      case 'AMENITIES':
        return <AmenitiesIcon color={service.iconColor} size={26} />;
      default:
        return <UnitViewingIcon color={service.iconColor} size={26} />;
    }
  };

  return (
    <Pressable
      onPress={() => onPress(service)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={service.label}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: service.backgroundColor },
        ]}
      >
        {renderIcon()}
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {service.label}
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
    width: 54,
    height: 54,
    borderRadius: radius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
