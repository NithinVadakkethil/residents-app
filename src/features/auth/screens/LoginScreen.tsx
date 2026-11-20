/**
 * Screen 02_Login
 * Source of Truth: Stitch Screen 02_Login (id: de26b29420b942e5bdb463f855833e40)
 * 
 * Features:
 * - Brand header with Orbit Resident circular mark
 * - Welcome Back + Email prompt
 * - 52px Email input container with Mail icon, clear button, and Zod validation
 * - 52px Primary CTA button "Send OTP" with loading spinner
 * - Legal Terms & Privacy links
 * - Community Architectural card with "Homes • People • Communities"
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Screen } from '../../../components/common/Screen';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { MailIcon } from '../../../components/common/Icons';
import { OrbitLogo } from '../components/OrbitLogo';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { authService } from '../api/authService';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface LoginScreenProps {
  onOtpRequested: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onOtpRequested }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      const response = await authService.requestOtp({ email: data.email });
      if (response.success) {
        onOtpRequested(data.email);
      }
    } catch (err: any) {
      Alert.alert('Unable to Send Code', err?.message || 'Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen backgroundColor={colors.background} statusBarStyle="dark-content">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Brand Header */}
          <View style={styles.brandHeader}>
            <View style={styles.brandRow}>
              <OrbitLogo size={40} variant="badge" />
              <View style={styles.brandTextStack}>
                <Text style={styles.brandTitle}>Orbit</Text>
                <Text style={styles.brandSubtitle}>RESIDENT</Text>
              </View>
            </View>
          </View>

          {/* Screen Title & Welcome */}
          <View style={styles.titleSection}>
            <Text style={styles.welcomeHeading}>Welcome Back</Text>
            <Text style={styles.instructionText}>
              Enter your registered email to receive OTP
            </Text>
          </View>

          {/* Form Area */}
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <AppInput
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoComplete="email"
                  returnKeyType="done"
                  value={value}
                  onChangeText={onChange}
                  onClear={() => setValue('email', '')}
                  error={errors.email?.message}
                  leftIcon={<MailIcon color={colors.outline} size={20} />}
                  onSubmitEditing={() => handleSubmit(onSubmit)()}
                />
              )}
            />

            {/* Primary Action Button */}
            <AppButton
              title="Send OTP"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              style={styles.submitButton}
            />
          </View>

          {/* Legal Notice */}
          <View style={styles.legalSection}>
            <Text style={styles.legalText}>
              By continuing, you agree to our{' '}
              <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
              <Text style={styles.legalLink}>Privacy Policy</Text>.
            </Text>
          </View>

          {/* Decorative Community Art Card */}
          <View style={styles.communityCardSection}>
            <View style={styles.communityImageWrapper}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                }}
                style={styles.communityImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.communityStatement}>
              <View style={styles.valuesRow}>
                <Text style={styles.valuesText}>Homes</Text>
                <View style={styles.valuesDot} />
                <Text style={styles.valuesText}>People</Text>
                <View style={styles.valuesDot} />
                <Text style={styles.valuesText}>Communities</Text>
              </View>
              <Text style={styles.tomorrowText}>A Brighter Tomorrow</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing['2xl'],
  },
  brandHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  brandTextStack: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brandTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
    lineHeight: 24,
  },
  brandSubtitle: {
    ...typography.labelXs,
    color: colors.onSurfaceVariant,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  welcomeHeading: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  instructionText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: spacing.md,
  },
  submitButton: {
    marginTop: 4,
  },
  legalSection: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  legalText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  communityCardSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  communityImageWrapper: {
    width: '100%',
    height: 170,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    ...shadows.sm,
  },
  communityImage: {
    width: '100%',
    height: '100%',
  },
  communityStatement: {
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: 4,
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  valuesText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  valuesDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.outlineVariant,
  },
  tomorrowText: {
    ...typography.labelMd,
    color: colors.primary,
    fontWeight: '600',
  },
});
