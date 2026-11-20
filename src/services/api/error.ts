/**
 * Normalized API Error Model
 * Handles: 401 (Unauthorized), 403 (Forbidden), 404 (Not Found),
 *          409 (Conflict/Double Booking), 422 (Validation), 429 (Rate Limit), 500+ (Server)
 */

import { AxiosError } from 'axios';

export interface ApiErrorPayload {
  status: number;
  code: string;
  message: string;
  details?: unknown;
}

export class ApiError extends Error implements ApiErrorPayload {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;

    // Maintains proper stack trace in V8 / Hermes
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, ApiError);
    }
  }

  static fromAxiosError(error: AxiosError<any>): ApiError {
    if (!error.response) {
      // Network failure, timeout, or DNS resolution error
      if (error.code === 'ECONNABORTED') {
        return new ApiError(408, 'REQUEST_TIMEOUT', 'The request timed out. Please check your connection.');
      }
      return new ApiError(0, 'NETWORK_ERROR', 'Network connection unavailable. Please verify your internet.');
    }

    const { status, data } = error.response;
    const defaultMessage = data?.message || error.message || 'An unexpected error occurred';
    const details = data?.errors || data?.details || data;

    switch (status) {
      case 401:
        return new ApiError(401, 'UNAUTHORIZED', 'Session expired. Please log in again.', details);
      case 403:
        return new ApiError(403, 'FORBIDDEN', 'You do not have permission to access this resource.', details);
      case 404:
        return new ApiError(404, 'NOT_FOUND', 'Requested resource was not found.', details);
      case 409:
        // Stitch Screen 13: Booking Conflict
        return new ApiError(409, 'CONFLICT', data?.message || 'This time slot or resource is already booked.', details);
      case 422:
        return new ApiError(422, 'VALIDATION_ERROR', data?.message || 'Please check the information you entered.', details);
      case 429:
        return new ApiError(429, 'RATE_LIMITED', 'Too many requests. Please wait a moment and try again.', details);
      default:
        if (status >= 500) {
          return new ApiError(status, 'SERVER_ERROR', 'A server error occurred. Our engineers have been alerted.', details);
        }
        return new ApiError(status, data?.code || 'API_ERROR', defaultMessage, details);
    }
  }
}
