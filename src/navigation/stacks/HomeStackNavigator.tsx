/**
 * Home Stack Navigator
 * Flows:
 * Home -> Select Building
 * Home -> Amenities -> Amenity Details -> Booking Success / Booking Conflict
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, MainTabParamList } from '../types';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { SelectBuildingScreen } from '../../features/buildings/screens/SelectBuildingScreen';
import { AmenitiesScreen } from '../../features/amenities/screens/AmenitiesScreen';
import { AmenityDetailsScreen } from '../../features/amenities/screens/AmenityDetailsScreen';
import { BookingSuccessScreen } from '../../features/amenities/screens/BookingSuccessScreen';
import { BookingConflictScreen } from '../../features/amenities/screens/BookingConflictScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
  NativeStackScreenProps<any>
>;

export const HomeStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Home">
        {({ navigation: homeNav }) => (
          <HomeScreen
            onNavigateToSelectBuilding={() => homeNav.navigate('SelectBuilding')}
            onNavigateToTab={(tabName) => {
              if (tabName === 'Requests') {
                navigation.navigate('RequestsTab', { screen: 'Requests' });
              } else if (tabName === 'Bookings') {
                navigation.navigate('BookingsTab', { screen: 'Bookings' });
              } else if (tabName === 'Profile') {
                navigation.navigate('ProfileTab', { screen: 'Profile' });
              }
            }}
            onNavigateToCreate={() => {
              navigation.navigate('RequestsTab', { screen: 'CreateRequest' });
            }}
            onNavigateToAmenities={() => {
              homeNav.navigate('Amenities');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="SelectBuilding"
        options={{
          animation: 'slide_from_bottom',
        }}
      >
        {({ navigation: selectNav }) => (
          <SelectBuildingScreen
            onBack={() => selectNav.goBack()}
            onContinue={() => selectNav.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Amenities">
        {({ navigation: amenitiesNav }) => (
          <AmenitiesScreen
            onBack={() => amenitiesNav.goBack()}
            onNavigateToSelectBuilding={() => amenitiesNav.navigate('SelectBuilding')}
            onSelectAmenity={(assetId, assetName) => {
              amenitiesNav.navigate('AmenityDetails', { assetId, assetName });
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AmenityDetails">
        {({ route, navigation: detailsNav }) => (
          <AmenityDetailsScreen
            assetId={route.params.assetId}
            assetName={route.params.assetName}
            onBack={() => detailsNav.goBack()}
            onBookingSuccess={(confirmation) => {
              detailsNav.replace('BookingSuccess', { confirmation });
            }}
            onBookingConflict={(conflict) => {
              detailsNav.replace('BookingConflict', { conflict });
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="BookingSuccess"
        options={{
          animation: 'fade',
        }}
      >
        {({ route, navigation: successNav }) => (
          <BookingSuccessScreen
            confirmation={route.params.confirmation}
            onViewMyBookings={() => {
              navigation.navigate('BookingsTab', { screen: 'Bookings' });
            }}
            onBackToHome={() => {
              successNav.navigate('Home');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="BookingConflict"
        options={{
          animation: 'fade',
        }}
      >
        {({ route, navigation: conflictNav }) => (
          <BookingConflictScreen
            conflict={route.params.conflict}
            onBackToAmenity={() => {
              conflictNav.replace('AmenityDetails', {
                assetId: route.params.conflict.assetId,
                assetName: route.params.conflict.amenityName,
              });
            }}
            onBackToAmenitiesList={() => {
              conflictNav.navigate('Amenities');
            }}
            onBookingSuccess={(confirmation) => {
              conflictNav.replace('BookingSuccess', { confirmation });
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
