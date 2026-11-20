/**
 * Main Tab Navigator (Bottom Tabs)
 * Source of Truth: Stitch Navigation Reference
 * 
 * Tabs:
 * - Home
 * - Requests
 * - Center Create Action (+) Circular Teal Elevated FAB
 * - Bookings
 * - Profile
 */

import React from 'react';
import { View, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { RequestsScreen } from '../features/requests/screens/RequestsScreen';
import { BookingsScreen } from '../features/bookings/screens/BookingsScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import {
  HomeTabIcon,
  RequestsTabIcon,
  BookingsTabIcon,
  ProfileTabIcon,
  PlusIcon,
} from '../components/common/Icons';
import { colors, shadows, typography } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Dummy screen for center action tab
const EmptyScreen = () => null;

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

const handleCenterCreatePress = () => {
  Alert.alert(
    'New Resident Action',
    'Choose a resident service to submit:',
    [
      { text: 'Create Maintenance Request', onPress: () => {} },
      { text: 'Book Amenity', onPress: () => {} },
      { text: 'Issue Visitor Pass', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]
  );
};

const CenterFabButton = () => (
  <View style={styles.fabContainer}>
    <Pressable
      onPress={handleCenterCreatePress}
      style={({ pressed }) => [
        styles.fabButton,
        pressed && styles.fabPressed,
      ]}
      accessibilityLabel="Create Request or Booking"
    >
      <PlusIcon size={26} color={colors.onPrimary} />
    </Pressable>
  </View>
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: renderHomeIcon,
        }}
      />

      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarLabel: 'Requests',
          tabBarIcon: renderRequestsIcon,
        }}
      />

      {/* Center Elevated Teal Plus Button */}
      <Tab.Screen
        name="CreateActionPlaceholder"
        component={EmptyScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: CenterFabButton,
        }}
      />

      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: renderBookingsIcon,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
