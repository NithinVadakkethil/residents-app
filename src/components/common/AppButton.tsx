/**
 * Reusable Action Button
 * Source of Truth: Stitch Design System
 * 52px height, #00514e primary background, 12px rounded-xl, 15px/20px label
 */

import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radius, typography, shadows } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const isInteractive = !disabled && !isLoading;

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.secondaryContainer,
          borderWidth: 0,
          opacity: pressed ? 0.9 : 1,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
          opacity: pressed ? 0.8 : 1,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          opacity: pressed ? 0.6 : 1,
        };
      case 'primary':
      default:
        return {
          backgroundColor: disabled ? colors.outlineVariant : colors.primary,
          opacity: pressed ? 0.92 : 1,
          ...(!disabled ? shadows.md : {}),
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'secondary':
        return { color: colors.onSecondaryContainer };
      case 'outline':
      case 'text':
        return { color: colors.primary };
      case 'primary':
      default:
        return { color: colors.onPrimary };
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={!isInteractive}
      style={({ pressed }) => [
        styles.base,
        variant !== 'text' && styles.standardHeight,
        getContainerStyle(pressed),
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.onPrimary : colors.primary}
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, getTextStyle(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
  },
  standardHeight: {
    height: 52,
    paddingHorizontal: 20,
    width: '100%',
  },
  text: {
    ...typography.labelLg,
  },
});
