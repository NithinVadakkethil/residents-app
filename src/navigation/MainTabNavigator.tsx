/**
 * Main Tab Navigator (Bottom Tabs)
 * Source of Truth: Stitch Navigation Reference
 * 
 * Tabs:
 * - HomeStack (Home -> Select Building)
 * - RequestsStack (Requests -> Create Request)
 * - Center Create Action (+) Circular Teal Elevated FAB -> navigates to Create Request
 * - BookingsStack (Bookings)
 * - ProfileStack (Profile)
 */

import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MainTabParamList } from './types';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { RequestsStackNavigator } from './stacks/RequestsStackNavigator';
import { BookingsStackNavigator } from './stacks/BookingsStackNavigator';
import { ProfileStackNavigator } from './stacks/ProfileStackNavigator';
import {
  HomeTabIcon,
  RequestsTabIcon,
  BookingsTabIcon,
  ProfileTabIcon,
  PlusIcon,
} from '../components/common/Icons';
import { colors, shadows, typography } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const EmptyScreen = () => null;
const renderNullLabel = () => null;

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <HomeTabIcon color={color} size={size} />
);

const renderRequestsIcon = ({ color, size }: { color: string; size: number }) => (
  <RequestsTabIcon color={color} size={size} />
);

const renderBookingsIcon = ({ color, size }: { color: string; size: number }) => (
  <BookingsTabIcon color={color} size={size} />
);

const renderProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <ProfileTabIcon color={color} size={size} />
);

interface CenterFabButtonProps {
  onPress?: () => void;
}

const CenterFabButton: React.FC<CenterFabButtonProps> = ({ onPress }) => (
  <View style={styles.fabContainer}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.fabButton, pressed && styles.fabPressed]}
      accessibilityRole="button"
      accessibilityLabel="Create Request"
    >
      <PlusIcon size={26} color={colors.onPrimary} />
    </Pressable>
  </View>
);

const CreateTabBarButton = (props: any) => (
  <CenterFabButton onPress={props.onPress} />
);

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const isFullscreen =
            routeName === 'SelectBuilding' ||
            routeName === 'Amenities' ||
            routeName === 'AmenityDetails' ||
            routeName === 'BookingSuccess' ||
            routeName === 'BookingConflict';
          return {
            tabBarLabel: 'Home',
            tabBarIcon: renderHomeIcon,
            tabBarStyle: isFullscreen ? { display: 'none' } : styles.tabBar,
          };
        }}
      />

      <Tab.Screen
        name="RequestsTab"
        component={RequestsStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const isFullscreen = routeName === 'CreateRequest';
          return {
            tabBarLabel: 'Requests',
            tabBarIcon: renderRequestsIcon,
            tabBarStyle: isFullscreen ? { display: 'none' } : styles.tabBar,
          };
        }}
      />

      {/* Center Elevated Teal Plus Button */}
      <Tab.Screen
        name="CreateActionPlaceholder"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('RequestsTab', { screen: 'CreateRequest' });
          },
        })}
        options={{
          tabBarLabel: renderNullLabel,
          tabBarButton: CreateTabBarButton,
        }}
      />

      <Tab.Screen
        name="BookingsTab"
        component={BookingsStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const isFullscreen =
            routeName === 'Amenities' ||
            routeName === 'AmenityDetails' ||
            routeName === 'BookingSuccess' ||
            routeName === 'BookingConflict';
          return {
            tabBarLabel: 'Bookings',
            tabBarIcon: renderBookingsIcon,
            tabBarStyle: isFullscreen ? { display: 'none' } : styles.tabBar,
          };
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    height: Platform.OS === 'ios' ? 86 : 64,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: 8,
    ...shadows.bottomBar,
  },
  tabBarLabel: {
    ...typography.labelXs,
    fontWeight: '600',
    marginTop: 2,
  },
  fabContainer: {
    position: 'relative',
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  fabButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevatedFab,
  },
  fabPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
});
