/**
 * Screen 06_Select_Building
 * Source of Truth: Stitch Screen 06_Select_Building (id: b410fb594b23447fb50d9904d9c72e21)
 * 
 * Features:
 * - Back button & screen title
 * - "Choose a building to continue / You can switch between buildings anytime."
 * - Rich building cards with thumbnail, name, tower/block, address, resident unit
 * - Active teal selection border, "Selected" pill badge, checked radio indicator
 * - Local selection state confirmed via sticky "Continue" button
 * - Zero buildings empty state with support action
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../../../components/common/Screen';
import { AppImage } from '../../../components/common/AppImage';
import { AppButton } from '../../../components/common/AppButton';
import { BackArrowIcon } from '../../../components/common/Icons';
import { CheckmarkIcon } from '../../../components/common/ServiceIcons';
import { useCurrentBuilding } from '../hooks/useCurrentBuilding';
import { ResidentBuilding } from '../types';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface SelectBuildingScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export const SelectBuildingScreen: React.FC<SelectBuildingScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const insets = useSafeAreaInsets();
  const {
    buildings,
    selectedBuilding,
    isLoading,
    hasNoBuildings,
    selectBuilding,
  } = useCurrentBuilding();

  // Local tentative selection state (only committed when pressing Continue)
  const [tentativeId, setTentativeId] = useState<string | null>(
    selectedBuilding?.id || null
  );

  useEffect(() => {
    if (selectedBuilding && !tentativeId) {
      setTentativeId(selectedBuilding.id);
    }
  }, [selectedBuilding, tentativeId]);

  const handleCardPress = (building: ResidentBuilding) => {
    setTentativeId(building.id);
  };

  const handleContinue = async () => {
    if (!tentativeId) {
      Alert.alert('Selection Required', 'Please select a building to continue.');
      return;
    }
    await selectBuilding(tentativeId);
    if (onContinue) {
      onContinue();
    } else if (onBack) {
      onBack();
    }
  };

  const renderHeader = () => (
    <View style={styles.instructionHeader}>
      <Text style={styles.instructionTitle}>Choose a building to continue</Text>
      <Text style={styles.instructionSubtitle}>
        You can switch between buildings anytime.
      </Text>
    </View>
  );

  const renderBuildingCard = ({ item }: { item: ResidentBuilding }) => {
    const isSelected = tentativeId === item.id;
    const towerOrBlock = item.tower || item.block || 'Main Tower';
    const unitNumber = item.unit?.number || 'Unit';

    return (
      <Pressable
        onPress={() => handleCardPress(item)}
        style={({ pressed }) => [
          styles.card,
          isSelected ? styles.cardSelected : styles.cardUnselected,
          pressed && styles.cardPressed,
        ]}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
      >
        {/* Thumbnail Image */}
        <AppImage
          uri={item.imageUrl}
          containerStyle={styles.thumbnailContainer}
          style={styles.thumbnail}
        />

        {/* Building Details */}
        <View style={styles.cardDetails}>
          <Text style={styles.buildingName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.towerText} numberOfLines={1}>
            {towerOrBlock}
          </Text>
          {item.address && (
            <Text style={styles.addressText} numberOfLines={1}>
              {item.address}
            </Text>
          )}
          <Text style={styles.unitText}>
            Your Unit: <Text style={styles.unitHighlight}>{unitNumber}</Text>
          </Text>
        </View>

        {/* Selection Indicators (Badge & Radio) */}
        <View style={styles.cardActions}>
          {isSelected ? (
            <>
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>Selected</Text>
              </View>
              <View style={styles.radioChecked}>
                <CheckmarkIcon size={12} color="#ffffff" />
              </View>
            </>
          ) : (
            <View style={styles.radioUnchecked} />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <Screen backgroundColor="#FFFFFF" statusBarStyle="dark-content" edges={['top']}>
      {/* Top Header Bar */}
      <View style={styles.navBar}>
        {onBack && (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={({ pressed }) => [styles.backButton, pressed && styles.backPressed]}
            accessibilityLabel="Go back"
          >
            <BackArrowIcon size={22} color={colors.onSurface} />
          </Pressable>
        )}
        <Text style={styles.navTitle}>Select Building</Text>
      </View>

      {/* Main Content Area */}
      {isLoading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : hasNoBuildings ? (
        <View style={styles.centerBox}>
          <View style={styles.emptyCircle}>
            <Text style={styles.emptyIcon}>🏢</Text>
          </View>
          <Text style={styles.emptyTitle}>No Property Found</Text>
          <Text style={styles.emptySubtitle}>
            We couldn't find a property linked to your resident account. Contact
            building management if you believe this is incorrect.
          </Text>
          <AppButton
            title="Contact Support"
            variant="outline"
            onPress={() =>
              Alert.alert('Support', 'Please email support@orbitresident.com')
            }
            style={styles.supportButton}
          />
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            data={buildings}
            keyExtractor={(item) => item.id}
            renderItem={renderBuildingCard}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + 88 },
            ]}
            showsVerticalScrollIndicator={false}
          />

          {/* Sticky Bottom Footer CTA */}
          <View
            style={[
              styles.stickyFooter,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <AppButton
              title="Continue"
              onPress={handleContinue}
              disabled={!tentativeId}
            />
          </View>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingHorizontal: spacing.md,
  },
  backButton: {
    position: 'absolute',
    left: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  navTitle: {
    ...typography.headlineSm,
    fontSize: 16,
    color: colors.onSurface,
    fontWeight: '700',
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: 12,
  },
  instructionHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  instructionTitle: {
    ...typography.labelLg,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  instructionSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius['2xl'],
    ...shadows.sm,
  },
  cardSelected: {
    backgroundColor: '#F2FAF9',
    borderWidth: 1.5,
    borderColor: colors.primaryContainer,
  },
  cardUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9EE',
  },
  cardPressed: {
    opacity: 0.95,
  },
  thumbnailContainer: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    marginRight: 14,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  cardDetails: {
    flex: 1,
    paddingRight: 8,
  },
  buildingName: {
    ...typography.labelLg,
    fontSize: 14,
    color: colors.onSurface,
    fontWeight: '700',
  },
  towerText: {
    ...typography.bodySm,
    fontWeight: '600',
    color: colors.neutral700,
    marginTop: 1,
  },
  addressText: {
    ...typography.bodySm,
    fontSize: 10.5,
    lineHeight: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  unitText: {
    ...typography.labelSm,
    color: colors.primary,
    marginTop: 4,
    fontSize: 11,
  },
  unitHighlight: {
    color: colors.onSurface,
    fontWeight: '700',
  },
  cardActions: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 2,
  },
  selectedBadge: {
    backgroundColor: '#D1F0ED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  selectedBadgeText: {
    ...typography.labelXs,
    color: colors.primaryContainer,
    fontWeight: '600',
    fontSize: 10,
  },
  radioChecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  radioUnchecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: '#D0D5DD',
    backgroundColor: '#FFFFFF',
    marginTop: 'auto',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    ...shadows.lg,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  emptySubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  supportButton: {
    marginTop: spacing.xl,
    width: 180,
  },
});
