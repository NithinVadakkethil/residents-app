/**
 * Reusable Form Text Input
 * Source of Truth: Stitch Screen 02_Login
 * 52px height, #ffffff background, rounded-xl, left icon, clear button, active focus border
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, radius, typography, shadows, spacing } from '../../theme';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  onClear?: () => void;
  containerStyle?: ViewStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  onClear,
  value,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const showClearButton = Boolean(value && value.length > 0 && onClear);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          Boolean(error) && styles.hasError,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          value={value}
          placeholderTextColor={colors.outlineVariant}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />
        {showClearButton && (
          <Pressable
            onPress={onClear}
            hitSlop={8}
            style={styles.clearButton}
          >
            <View style={styles.clearCircle}>
              <Text style={styles.clearCross}>×</Text>
            </View>
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    ...typography.labelMd,
    color: colors.onSurface,
    marginBottom: spacing['2xs'],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    ...shadows.sm,
  },
  focused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.md,
  },
  hasError: {
    borderColor: colors.error,
  },
  iconContainer: {
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.bodyMd,
    color: colors.onSurface,
    paddingVertical: 0,
  },
  clearButton: {
    padding: spacing['2xs'],
  },
  clearCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearCross: {
    fontSize: 16,
    color: colors.outline,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  errorText: {
    ...typography.labelSm,
    color: colors.error,
    marginTop: 6,
    marginLeft: 4,
  },
});
