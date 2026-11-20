/**
 * Screen 07_Amenities
 * Source of Truth: Stitch Screen 07_Amenities (id: 29758679d1eb486da1788649abc004f3)
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAmenities } from '../hooks/useAmenities';
import { useCurrentBuilding } from '../../buildings/hooks/useCurrentBuilding';
import { AmenityCard } from '../components/AmenityCard';
import { AmenityFilterChip } from '../components/AmenityFilterChip';
import { AmenityListSkeleton } from '../components/AmenityListSkeleton';
import { AppImage } from '../../../components/common/AppImage';
import { AppButton } from '../../../components/common/AppButton';
import { BackArrowIcon, ChevronDownIcon } from '../../../components/common/Icons';
import { AmenityCategoryFilter } from '../types';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface AmenitiesScreenProps {
  onBack: () => void;
  onNavigateToSelectBuilding: () => void;
  onSelectAmenity: (assetId: string, assetName: string) => void;
}

const CATEGORIES: AmenityCategoryFilter[] = [
  'ALL',
  'SPORTS',
  'RECREATION',
  'INDOOR',
  'OTHERS',
];

export const AmenitiesScreen: React.FC<AmenitiesScreenProps> = ({
  onBack,
  onNavigateToSelectBuilding,
  onSelectAmenity,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<AmenityCategoryFilter>('ALL');

  const { selectedBuilding, selectedUnit } = useCurrentBuilding();
  const {
    amenities,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAmenities();

  // Filter amenities locally based on category chip
  const filteredAmenities = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return amenities;
    }
    return amenities.filter((item) => {
      const cat = item.category.toUpperCase();
      if (selectedCategory === 'SPORTS') {
        return cat.includes('SPORT') || cat.includes('COURT') || cat.includes('POOL');
      }
      if (selectedCategory === 'INDOOR') {
        return cat.includes('INDOOR');
      }
      if (selectedCategory === 'RECREATION') {
        return cat.includes('RECREATION') || cat.includes('HALL') || cat.includes('LOUNGE');
      }
      return !cat.includes('SPORT') && !cat.includes('INDOOR');
    });
  }, [amenities, selectedCategory]);

  const buildingTitle = selectedBuilding?.name
    ? `${selectedBuilding.name}${selectedBuilding.tower ? ` - Tower ${selectedBuilding.tower}` : ''}`
    : 'Select Property';

  const buildingSubtitle = selectedUnit?.number
    ? `Unit ${selectedUnit.number}${selectedBuilding?.address ? `, ${selectedBuilding.address}` : ''}`
    : selectedBuilding?.address || 'Tap to choose your residence';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Stitch 07_Amenities Navigation Bar */}
      <View style={styles.navBar}>
        <Pressable
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <BackArrowIcon size={24} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.navTitle}>Amenities</Text>
        <View style={styles.navPlaceholder} />
      </View>

      <FlatList
        data={filteredAmenities}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.lg },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            {/* Active Building Selector Card */}
            <Pressable
              onPress={onNavigateToSelectBuilding}
              style={({ pressed }) => [
                styles.buildingCard,
                pressed && styles.buildingCardPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Current building: ${buildingTitle}. Tap to switch.`}
            >
              <View style={styles.buildingLeft}>
                <AppImage
                  uri={selectedBuilding?.imageUrl}
                  containerStyle={styles.buildingThumbnail}
                  style={styles.thumbnailImage}
                />
                <View style={styles.buildingTextContainer}>
                  <Text style={styles.buildingName} numberOfLines={1}>
                    {buildingTitle}
                  </Text>
                  <Text style={styles.buildingAddress} numberOfLines={1}>
                    {buildingSubtitle}
                  </Text>
                </View>
              </View>
              <ChevronDownIcon size={16} color={colors.onSurfaceVariant} />
            </Pressable>

            {/* Category Filter Chips Horizontal Row */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {CATEGORIES.map((cat) => (
                <AmenityFilterChip
                  key={cat}
                  label={cat.charAt(0) + cat.slice(1).toLowerCase()}
                  isActive={selectedCategory === cat}
                  onPress={() => setSelectedCategory(cat)}
                />
              ))}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <AmenityCard
            amenity={item}
            onPress={() => onSelectAmenity(item.id, item.name)}
          />
        )}
        ListEmptyComponent={
          isLoading ? (
            <AmenityListSkeleton />
          ) : isError ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Unable to load amenities</Text>
              <Text style={styles.emptySubtitle}>
                {(error as any)?.message ||
                  'The amenities catalog could not be retrieved from the server. Please check your connection and try again.'}
              </Text>
              <AppButton
                title="Retry"
                variant="primary"
                onPress={() => refetch()}
                style={styles.retryButton}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No amenities available</Text>
              <Text style={styles.emptySubtitle}>
                There are no amenities matching this filter for the selected property.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  navBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    backgroundColor: '#F7F9FA',
  },
  backButton: {
    padding: spacing['2xs'],
    marginLeft: -4,
  },
  navTitle: {
    ...typography.headlineMd,
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
  },
  navPlaceholder: {
    width: 28,
  },
  listContent: {
    paddingHorizontal: spacing.margin,
  },
  headerComponent: {
    marginBottom: spacing.xs,
  },
  buildingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(232, 236, 239, 0.8)',
    padding: spacing.sm,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  buildingCardPressed: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primary,
  },
  buildingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  buildingThumbnail: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  buildingTextContainer: {
    flex: 1,
  },
  buildingName: {
    ...typography.labelMd,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  buildingAddress: {
    ...typography.bodySm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  categoryScroll: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    ...typography.headlineSm,
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  retryButton: {
    minWidth: 140,
  },
});
