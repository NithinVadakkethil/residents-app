/**
 * Requests Stack Navigator
 * Requests List -> Create Request
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RequestsStackParamList } from '../types';
import { RequestsScreen } from '../../features/requests/screens/RequestsScreen';
import { CreateRequestScreen } from '../../features/requests/screens/CreateRequestScreen';

const Stack = createNativeStackNavigator<RequestsStackParamList>();

export const RequestsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Requests" component={RequestsScreen} />
      <Stack.Screen name="CreateRequest">
        {({ navigation }) => (
          <CreateRequestScreen onBack={() => navigation.goBack()} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
