/**
 * Auth Navigator (Native Stack)
 * Splash -> Login -> OTP Verification
 */

import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { SplashScreen } from '../features/auth/screens/SplashScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { OtpVerificationScreen } from '../features/auth/screens/OtpVerificationScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  onAuthSuccess: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onAuthSuccess }) => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {showSplash ? (
        <Stack.Screen name="Splash">
          {() => <SplashScreen onFinish={() => setShowSplash(false)} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login">
            {({ navigation }) => (
              <LoginScreen
                onOtpRequested={(email) =>
                  navigation.navigate('OtpVerification', { email })
                }
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="OtpVerification">
            {({ route, navigation }) => (
              <OtpVerificationScreen
                email={route.params.email}
                onBack={() => navigation.goBack()}
                onSuccess={onAuthSuccess}
              />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
