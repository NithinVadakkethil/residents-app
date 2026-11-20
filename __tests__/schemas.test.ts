import { loginSchema } from '../src/features/auth/schemas/loginSchema';
import { otpSchema } from '../src/features/auth/schemas/otpSchema';

describe('Auth Schemas Validation', () => {
  describe('loginSchema', () => {
    it('accepts valid email addresses', () => {
      const validEmails = [
        'resident@example.com',
        'arjun.mehta@orbit.community',
        'resident+unit1402@gmail.com',
      ];

      validEmails.forEach((email) => {
        const result = loginSchema.safeParse({ email });
        expect(result.success).toBe(true);
      });
    });

    it('rejects invalid or empty emails', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@example.com',
        'resident@',
      ];

      invalidEmails.forEach((email) => {
        const result = loginSchema.safeParse({ email });
        expect(result.success).toBe(false);
      });
    });

    it('trims whitespace and converts to lowercase', () => {
      const result = loginSchema.safeParse({ email: '  Resident@Example.COM  ' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('resident@example.com');
      }
    });
  });

  describe('otpSchema', () => {
    it('accepts valid 6-digit numeric codes', () => {
      const result = otpSchema.safeParse({ otp: '248610' });
      expect(result.success).toBe(true);
    });

    it('rejects codes shorter than 6 digits', () => {
      const result = otpSchema.safeParse({ otp: '12345' });
      expect(result.success).toBe(false);
    });

    it('rejects codes longer than 6 digits', () => {
      const result = otpSchema.safeParse({ otp: '1234567' });
      expect(result.success).toBe(false);
    });

    it('rejects alphanumeric or non-numeric codes', () => {
      const result = otpSchema.safeParse({ otp: '12A456' });
      expect(result.success).toBe(false);
    });
  });
});
