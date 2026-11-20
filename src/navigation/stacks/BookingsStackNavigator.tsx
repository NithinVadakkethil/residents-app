/**
 * Bookings Stack Navigator
 * My Bookings List -> Amenities Details & Management
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookingsStackParamList } from '../types';
import { BookingsScreen } from '../../features/bookings/screens/BookingsScreen';
import { AmenitiesScreen } from '../../features/amenities/screens/AmenitiesScreen';
import { AmenityDetailsScreen } from '../../features/amenities/screens/AmenityDetailsScreen';
import { BookingSuccessScreen } from '../../features/amenities/screens/BookingSuccessScreen';
import { BookingConflictScreen } from '../../features/amenities/screens/BookingConflictScreen';

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export const BookingsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Bookings" component={BookingsScreen} />
      <Stack.Screen name="Amenities">
        {({ navigation }) => (
          <AmenitiesScreen
            onBack={() => navigation.goBack()}
            onNavigateToSelectBuilding={() => navigation.goBack()}
            onSelectAmenity={(assetId, assetName) => {
              navigation.navigate('AmenityDetails', { assetId, assetName });
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AmenityDetails">
        {({ route, navigation }) => (
          <AmenityDetailsScreen
            assetId={route.params.assetId}
            assetName={route.params.assetName}
            onBack={() => navigation.goBack()}
            onBookingSuccess={(confirmation) => {
              navigation.replace('BookingSuccess', { confirmation });
            }}
            onBookingConflict={(conflict) => {
              navigation.replace('BookingConflict', { conflict });
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="BookingSuccess">
        {({ route, navigation }) => (
          <BookingSuccessScreen
            confirmation={route.params.confirmation}
            onViewMyBookings={() => navigation.navigate('Bookings')}
            onBackToHome={() => navigation.navigate('Bookings')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="BookingConflict">
        {({ route, navigation }) => (
          <BookingConflictScreen
            conflict={route.params.conflict}
            onBackToAmenity={() => {
              navigation.replace('AmenityDetails', {
                assetId: route.params.conflict.assetId,
                assetName: route.params.conflict.amenityName,
              });
            }}
            onBackToAmenitiesList={() => navigation.navigate('Amenities')}
            onBookingSuccess={(confirmation) => {
              navigation.replace('BookingSuccess', { confirmation });
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
