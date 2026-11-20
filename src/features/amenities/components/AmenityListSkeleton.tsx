/**
 * Amenity List Skeleton Loading Component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../../theme';

export const AmenityListSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((key) => (
        <View key={key} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSubtitle} />
            <View style={styles.skeletonBadge} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  skeletonImage: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerHigh,
    marginRight: spacing.md,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonTitle: {
    width: '60%',
    height: 16,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceContainerHigh,
    marginBottom: 6,
  },
  skeletonSubtitle: {
    width: '35%',
    height: 12,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceContainer,
    marginBottom: 8,
  },
  skeletonBadge: {
    width: 60,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer,
  },
});
