/**
 * Orbit Resident Mobile Application
 * Production SaaS Application for Residential Communities
 * 
 * Powered by React Native 0.88.x (New Architecture + Hermes)
 * Design Source of Truth: Google Stitch Project 13242428547386138499
 */

import React from 'react';
import { AppProviders } from './src/app/providers/AppProviders';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

export default App;
