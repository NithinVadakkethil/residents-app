/**
 * Screen 03_OTP_Verification
 * Source of Truth: Stitch Screen 03_OTP_Verification (id: 40ca2c21bfcd4001bc2b6b3849f001e9)
 * 
 * Features:
 * - Back button navigation bar
 * - Centered Orbit Resident brand mark
 * - "Verify Your Email" with recipient email highlight
 * - 6-Cell OTP Input Matrix (48x56px cells, monospace font, active focus ring, auto-advancing)
 * - 45-Second countdown timer with "Resend Code"
 * - Primary "Verify & Continue" CTA button
 * - "Use a different email" secondary action
 * - Bottom Community Skyline native SVG illustration
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { AppButton } from '../../../components/common/AppButton';
import { BackArrowIcon } from '../../../components/common/Icons';
import { OrbitLogo } from '../components/OrbitLogo';
import { CommunitySkyline } from '../components/CommunitySkyline';
import { authService } from '../api/authService';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface OtpVerificationScreenProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

const OTP_LENGTH = 6;
const COUNTDOWN_INITIAL = 45;

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  email,
  onBack,
  onSuccess,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [activeCellIndex, setActiveCellIndex] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_INITIAL);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<Array<any>>([]);
  const { loginSession } = useAuthStore();

  // Resend Countdown Timer
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const handleOtpChange = (text: string, index: number) => {
    // Handle paste of full 6-digit code
    if (text.length > 1) {
      const sanitized = text.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
      const newOtp = [...otpValues];
      for (let i = 0; i < sanitized.length; i++) {
        newOtp[i] = sanitized[i];
      }
      setOtpValues(newOtp);
      const nextFocus = Math.min(sanitized.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const sanitizedDigit = text.replace(/[^0-9]/g, '');
    const newOtp = [...otpValues];
    newOtp[index] = sanitizedDigit;
    setOtpValues(newOtp);

    // Auto-advance to next cell
    if (sanitizedDigit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otpValues.join('');
    if (fullOtp.length !== OTP_LENGTH) {
      Alert.alert('Incomplete Code', 'Please enter all 6 digits of your verification code.');
      return;
    }

    try {
      setIsVerifying(true);
      const session = await authService.verifyOtp({ email, otp: fullOtp });
      await loginSession(session);
      onSuccess();
    } catch (err: any) {
      Alert.alert('Verification Failed', err?.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    try {
      setIsResending(true);
      await authService.requestOtp({ email });
      setCountdown(COUNTDOWN_INITIAL);
      Alert.alert('Code Sent', `A new verification code has been sent to ${email}`);
    } catch (err: any) {
      Alert.alert('Unable to Resend', err?.message || 'Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isOtpComplete = otpValues.every((digit) => digit !== '');

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
          {/* Top Back Navigation Bar */}
          <View style={styles.topBar}>
            <Pressable
              onPress={onBack}
              hitSlop={12}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
              accessibilityLabel="Go Back"
            >
              <BackArrowIcon size={24} color={colors.onSurface} />
            </Pressable>
          </View>

          {/* Centered Orbit Brand Mark */}
          <View style={styles.brandHeader}>
            <View style={styles.brandRow}>
              <OrbitLogo size={36} variant="badge" />
              <View style={styles.brandTextStack}>
                <Text style={styles.brandTitle}>Orbit</Text>
                <Text style={styles.brandSubtitle}>RESIDENT</Text>
              </View>
            </View>
          </View>

          {/* Verification Heading Stack */}
          <View style={styles.headingSection}>
            <Text style={styles.headingTitle}>Verify Your Email</Text>
            <Text style={styles.headingDescription}>
              We have sent a 6-digit OTP to{' '}
              <Text style={styles.emailHighlight}>{email || 'your email'}</Text>
            </Text>
          </View>

          {/* OTP Input Matrix (6 Cells) */}
          <View style={styles.otpMatrix}>
            {otpValues.map((digit, index) => {
              const isActive = activeCellIndex === index;
              return (
                <View
                  key={index}
                  style={[
                    styles.otpCell,
                    isActive && styles.otpCellActive,
                    Boolean(digit) && styles.otpCellFilled,
                  ]}
                >
                  <TextInput
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setActiveCellIndex(index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    style={styles.otpInput}
                    accessible
                    accessibilityLabel={`Digit ${index + 1}`}
                  />
                </View>
              );
            })}
          </View>

          {/* Countdown & Resend Option */}
          <View style={styles.resendSection}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {countdown > 0 ? (
              <Text style={styles.countdownText}>
                Resend in <Text style={styles.countdownDigits}>{formatCountdown(countdown)}</Text>
              </Text>
            ) : (
              <Pressable onPress={handleResend} disabled={isResending}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </Pressable>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <AppButton
              title="Verify & Continue"
              onPress={handleVerify}
              isLoading={isVerifying}
              disabled={!isOtpComplete}
              style={styles.verifyButton}
            />

            <Pressable onPress={onBack} hitSlop={10} style={styles.diffEmailButton}>
              <Text style={styles.diffEmailText}>Use a different email</Text>
            </Pressable>
          </View>

          {/* Lower Skyline Community Graphic */}
          <View style={styles.skylineSection}>
            <CommunitySkyline />
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  topBar: {
    height: 48,
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  brandHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    marginBottom: spacing.lg,
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
    ...typography.headlineMd,
    color: colors.onSurface,
    lineHeight: 20,
  },
  brandSubtitle: {
    ...typography.labelXs,
    color: colors.onSurfaceVariant,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  headingSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    gap: 6,
  },
  headingTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  headingDescription: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 290,
  },
  emailHighlight: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  otpMatrix: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.xl,
    paddingHorizontal: spacing['2xs'],
  },
  otpCell: {
    width: 48,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    ...shadows.sm,
  },
  otpCellActive: {
    borderColor: colors.primary,
    ...shadows.md,
  },
  otpCellFilled: {
    borderColor: colors.primaryFixedDim,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    ...typography.monoOtp,
    color: colors.primary,
    padding: 0,
  },
  resendSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  resendText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  countdownText: {
    ...typography.labelSm,
    color: colors.onSurface,
  },
  countdownDigits: {
    ...typography.monoOtp,
    fontSize: 13,
    color: colors.primary,
  },
  resendLink: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  actionButtons: {
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  verifyButton: {
    width: '100%',
  },
  diffEmailButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  diffEmailText: {
    ...typography.labelMd,
    color: colors.primary,
    fontWeight: '600',
  },
  skylineSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.xl,
    paddingTop: spacing.md,
  },
});
