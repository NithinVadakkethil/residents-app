/**
 * Screen 04_Home
 * Source of Truth: Stitch Screen 04_Home (id: 792b02a24cbb46359e8f66861614e08b)
 * 
 * Features:
 * - Branded deep teal curved header (Good Evening, Arjun N)
 * - Tappable building switcher pill (A-1203 • Skyline Residency ▼)
 * - Notification bell with live red unread indicator
 * - Resident avatar
 * - Floating Hero Community Spotlight Card with pagination dots
 * - Section 1: "Request a Service" (4-column data-driven grid)
 * - Section 2: "Go To" (4-column Resident Hub navigation)
 * - Pull to Refresh support
 * - Skeleton loading state
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImage } from '../../../components/common/AppImage';
import { ServiceTile } from '../components/ServiceTile';
import { HubTile } from '../components/HubTile';
import {
  BuildingIcon,
  ChevronDownIcon,
} from '../../../components/common/Icons';
import {
  NotificationBellIcon,
  ChevronRightIcon,
  UnitViewingIcon,
} from '../../../components/common/ServiceIcons';
import { useCurrentBuilding } from '../../buildings/hooks/useCurrentBuilding';
import { useResidentProfileQuery } from '../../profile/api/profileApi';
import { getActiveServices } from '../config/services.config';
import { DEFAULT_HUB_ITEMS } from '../config/hub.config';
import { ResidentServiceConfig, HubItemConfig } from '../types/services';
import { getGreeting } from '../../../utils/greeting';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface HomeScreenProps {
  onNavigateToSelectBuilding: () => void;
  onNavigateToTab: (tabName: 'Requests' | 'Bookings' | 'Profile') => void;
  onNavigateToCreate: () => void;
  onNavigateToAmenities?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToSelectBuilding,
  onNavigateToTab,
  onNavigateToCreate,
  onNavigateToAmenities,
}) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const {
    selectedBuilding,
    selectedUnit,
    isLoading: isBuildingLoading,
    refetch: refetchBuildings,
  } = useCurrentBuilding();

  const {
    data: profile,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useResidentProfileQuery();

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchBuildings(), refetchProfile()]);
    setRefreshing(false);
  };

  const handleServicePress = (service: ResidentServiceConfig) => {
    if (service.key === 'MAINTENANCE' || service.key === 'ACCESS_CARD' || service.key === 'VISITOR_PASS') {
      onNavigateToCreate();
      return;
    }
    if (service.key === 'AMENITIES') {
      if (!selectedBuilding) {
        onNavigateToSelectBuilding();
      } else if (onNavigateToAmenities) {
        onNavigateToAmenities();
      } else {
        onNavigateToTab('Bookings');
      }
      return;
    }
    Alert.alert(
      service.label,
      `The ${service.label} request module for ${selectedBuilding?.name || 'your property'} will be enabled in Phase 3.`,
      [{ text: 'OK' }]
    );
  };

  const handleHubPress = (item: HubItemConfig) => {
    switch (item.key) {
      case 'MY_REQUESTS':
        onNavigateToTab('Requests');
        break;
      case 'MY_BOOKINGS':
        onNavigateToTab('Bookings');
        break;
      case 'MY_UNITS':
        onNavigateToSelectBuilding();
        break;
      default:
        Alert.alert(
          item.label,
          `The ${item.label} resident portal feature is scheduled for release.`,
          [{ text: 'OK' }]
        );
        break;
    }
  };

  const activeServices = getActiveServices();
  const greeting = getGreeting();
  const residentName = profile?.greetingName || 'Arjun N';
  const unitText = selectedUnit?.number || 'A-1203';
  const buildingName = selectedBuilding?.name || 'Skyline Residency';

  if ((isBuildingLoading && !selectedBuilding) || (isProfileLoading && !profile)) {
    return (
      <View style={[styles.screenContainer, styles.loadingCenter]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.onPrimary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Top Branded Deep Teal Curved Header */}
        <View
          style={[
            styles.headerBanner,
            { paddingTop: insets.top + spacing.xs },
          ]}
        >
          <View style={styles.headerTopRow}>
            {/* Left: Greeting & Unit/Building Switcher */}
            <View style={styles.headerLeft}>
              <Text style={styles.greetingText}>{greeting}</Text>
              <Text style={styles.residentNameText}>{residentName}</Text>

              {/* Tappable Building Switcher Pill */}
              <Pressable
                onPress={onNavigateToSelectBuilding}
                style={({ pressed }) => [
                  styles.buildingPill,
                  pressed && styles.buildingPillPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Switch active building"
              >
                <BuildingIcon size={14} color={colors.primaryFixed} />
                <Text style={styles.buildingPillText} numberOfLines={1}>
                  {unitText} • {buildingName}
                </Text>
                <ChevronDownIcon size={14} color={colors.primaryFixed} />
              </Pressable>
            </View>

            {/* Right: Notifications & Avatar */}
            <View style={styles.headerRight}>
              {/* Notification Bell with Red Badge */}
              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Notifications',
                    'You have 3 unread resident announcements.'
                  )
                }
                style={styles.notificationButton}
                accessibilityLabel="View notifications"
              >
                <NotificationBellIcon size={20} color={colors.onPrimary} />
                <View style={styles.unreadBadge} />
              </Pressable>

              {/* Resident Avatar */}
              <Pressable
                onPress={() => onNavigateToTab('Profile')}
                style={styles.avatarBorder}
                accessibilityLabel="Open profile"
              >
                <AppImage
                  uri={profile?.avatarUrl}
                  containerStyle={styles.avatarContainer}
                  style={styles.avatarImage}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Floating Hero Community Spotlight Card */}
        <View style={styles.spotlightWrapper}>
          <View style={styles.spotlightCard}>
            {/* Background Image */}
            <AppImage
              uri="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
              containerStyle={styles.spotlightImageContainer}
              style={styles.spotlightImage}
            />

            {/* Scrim Overlay & Text */}
            <View style={styles.spotlightScrim}>
              <View style={styles.spotlightBadge}>
                <Text style={styles.spotlightBadgeText}>Community Spotlight</Text>
              </View>

              <View style={styles.spotlightContent}>
                <Text style={styles.spotlightHeadline}>
                  A Better Community{'\n'}
                  <Text style={styles.spotlightHighlight}>
                    A Brighter Tomorrow
                  </Text>
                </Text>
                <Text style={styles.spotlightSubtitle} numberOfLines={1}>
                  Annual rooftop green gala & art mixer this Saturday
                </Text>
              </View>

              {/* Pagination Dots */}
              <View style={styles.paginationDots}>
                <View style={styles.activeDot} />
                <View style={styles.inactiveDot} />
                <View style={styles.inactiveDot} />
              </View>
            </View>
          </View>
        </View>

        {/* Section 1: Request a Service */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <UnitViewingIcon size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Request a Service</Text>
            </View>
            <Pressable
              onPress={() =>
                Alert.alert('All Services', 'All available residential services are shown below.')
              }
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRightIcon size={14} color={colors.primary} />
            </Pressable>
          </View>

          {/* 4-Column Quick Services Bento */}
          <View style={styles.gridContainer}>
            {activeServices.map((service) => (
              <ServiceTile
                key={service.key}
                service={service}
                onPress={handleServicePress}
              />
            ))}
          </View>
        </View>

        {/* Section 2: Go To (Resident Hub) */}
        <View style={[styles.sectionContainer, styles.hubSection]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.hubIcon}>🧭</Text>
              <Text style={styles.sectionTitle}>Go To</Text>
            </View>
            <Text style={styles.hubSubtitle}>Resident Hub</Text>
          </View>

          {/* 4-Column Hub Navigation Grid */}
          <View style={styles.gridContainer}>
            {DEFAULT_HUB_ITEMS.map((item) => (
              <HubTile
                key={item.key}
                item={item}
                onPress={handleHubPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  headerBanner: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.margin,
    paddingBottom: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    ...shadows.sm,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  greetingText: {
    ...typography.labelSm,
    color: colors.primaryFixed,
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  residentNameText: {
    ...typography.headlineMd,
    color: colors.onPrimary,
    marginTop: 1,
  },
  buildingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    marginTop: 6,
    alignSelf: 'flex-start',
    gap: 6,
    maxWidth: '95%',
  },
  buildingPillPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  buildingPillText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    flexShrink: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  avatarBorder: {
    padding: 2,
    borderRadius: 22,
    backgroundColor: 'rgba(159, 241, 235, 0.3)',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  spotlightWrapper: {
    paddingHorizontal: spacing.margin,
    marginTop: -32,
    zIndex: 10,
  },
  spotlightCard: {
    width: '100%',
    height: 144,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    ...shadows.md,
  },
  spotlightImageContainer: {
    width: '100%',
    height: '100%',
  },
  spotlightImage: {
    width: '100%',
    height: '100%',
  },
  spotlightScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(23, 28, 33, 0.72)',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  spotlightBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  spotlightBadgeText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    fontSize: 10,
  },
  spotlightContent: {
    marginTop: 'auto',
    marginBottom: 4,
  },
  spotlightHeadline: {
    ...typography.headlineSm,
    fontSize: 15,
    lineHeight: 20,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  spotlightHighlight: {
    color: colors.primaryFixed,
  },
  spotlightSubtitle: {
    ...typography.bodySm,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  paginationDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeDot: {
    width: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryFixed,
  },
  inactiveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  sectionContainer: {
    paddingHorizontal: spacing.margin,
    marginTop: spacing.xl,
  },
  hubSection: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    ...typography.headlineSm,
    fontSize: 16,
    color: colors.onSurface,
  },
  hubIcon: {
    fontSize: 18,
  },
  hubSubtitle: {
    ...typography.labelSm,
    color: colors.outline,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    ...typography.labelMd,
    color: colors.primary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2,
    rowGap: 14,
  },
});
