/**
 * Authentication Service & Repository
 * 
 * =========================================================================
 * ARCHITECTURAL NOTICE: BACKEND CONTRACT MISMATCH
 * =========================================================================
 * The legacy backend API specification documents:
 *   POST /tenant/login { email, password, device_uuid }
 * 
 * However, the approved product UX (Stitch Screens 02_Login and 03_OTP_Verification)
 * specifies passwordless OTP authentication:
 *   1. Resident submits registered email -> receives 6-digit OTP
 *   2. Resident inputs 6-digit OTP -> receives auth session token
 * 
 * Under project guidelines, the UI MUST NOT be converted to password login,
 * and fake credentials MUST NOT be sent to the legacy password endpoint.
 * 
 * This AuthService encapsulates the contract abstraction. When the backend
 * team deploys POST /tenant/otp/request and POST /tenant/otp/verify,
 * only the implementation bodies in this file need to be updated.
 * =========================================================================
 */

import {
  RequestOtpPayload,
  RequestOtpResponse,
  VerifyOtpPayload,
  AuthSessionResponse,
  ResidentUser,
} from '../types';

export interface IAuthService {
  requestOtp(payload: RequestOtpPayload): Promise<RequestOtpResponse>;
  verifyOtp(payload: VerifyOtpPayload): Promise<AuthSessionResponse>;
  refreshSession(refreshToken: string): Promise<AuthSessionResponse>;
  logout(): Promise<void>;
}

class AuthService implements IAuthService {
  /**
   * Request 6-digit OTP sent to resident email
   */
  async requestOtp(payload: RequestOtpPayload): Promise<RequestOtpResponse> {
    // Simulated network delay for realistic UI loading state
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 800));

    // When backend endpoint POST /tenant/otp/request is available:
    // const response = await apiClient.post<RequestOtpResponse>('/tenant/otp/request', payload);
    // return response.data;

    return {
      success: true,
      message: `A 6-digit verification code has been sent to ${payload.email}`,
      expiresInSeconds: 45,
    };
  }

  /**
   * Verify 6-digit OTP and establish session
   */
  async verifyOtp(payload: VerifyOtpPayload): Promise<AuthSessionResponse> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

    // When backend endpoint POST /tenant/otp/verify is available:
    // const response = await apiClient.post<AuthSessionResponse>('/tenant/otp/verify', payload);
    // return response.data;

    const mockUser: ResidentUser = {
      id: 'usr-10492',
      name: 'Arjun Mehta',
      email: payload.email,
      phone: '+971 50 123 4567',
      unitNumber: 'Apt 1402',
      buildingName: 'Tower 4 - The Pinnacle',
    };

    return {
      token: `orbit_jwt_${Date.now()}_mock_session_token`,
      refreshToken: `orbit_refresh_${Date.now()}`,
      user: mockUser,
    };
  }

  async refreshSession(_refreshToken: string): Promise<AuthSessionResponse> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    return {
      token: `orbit_jwt_refreshed_${Date.now()}`,
      refreshToken: `orbit_refresh_refreshed_${Date.now()}`,
      user: {
        id: 'usr-10492',
        name: 'Arjun Mehta',
        email: 'arjun@example.com',
        unitNumber: 'Apt 1402',
        buildingName: 'Tower 4 - The Pinnacle',
      },
    };
  }

  async logout(): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 300));
  }
}

export const authService = new AuthService();
