/**
 * Login Form Validation Schema
 * Source of Truth: Stitch Screen 02_Login
 */

import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your registered email')
    .email('Please enter a valid residential email address'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
