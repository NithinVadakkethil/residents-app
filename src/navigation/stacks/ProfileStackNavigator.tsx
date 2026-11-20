/**
 * Profile Stack Navigator
 * Profile -> future Account & Unit Settings
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
