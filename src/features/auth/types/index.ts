/**
 * Authentication Types
 */

export interface ResidentUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  unitNumber: string;
  buildingName: string;
  avatarUrl?: string;
}

export interface RequestOtpPayload {
  email: string;
}

export interface RequestOtpResponse {
  success: boolean;
  message: string;
  expiresInSeconds: number;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface AuthSessionResponse {
  token: string;
  refreshToken: string;
  user: ResidentUser;
}
