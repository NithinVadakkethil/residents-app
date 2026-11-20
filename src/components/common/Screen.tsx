/**
 * Reusable Screen Layout Component
 * Handles Safe Area Insets and Status Bar styling
 */

import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  StatusBarStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme';

interface ScreenProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  backgroundColor = colors.background,
  statusBarStyle = 'dark-content',
  style,
  contentContainerStyle,
  edges = ['top', 'bottom'],
}) => {
  const insets = useSafeAreaInsets();

  const containerPadding: ViewStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <StatusBar
        barStyle={statusBarStyle}
        {...(Platform.OS === 'android' ? { backgroundColor } : {})}
      />
      <View style={[styles.content, containerPadding, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
