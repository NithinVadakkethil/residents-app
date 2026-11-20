/**
 * OTP Verification Schema
 * Source of Truth: Stitch Screen 03_OTP_Verification
 */

import { z } from 'zod';

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'Verification code must be exactly 6 digits')
    .regex(/^\d{6}$/, 'Code must contain numbers only'),
});

export type OtpFormData = z.infer<typeof otpSchema>;
