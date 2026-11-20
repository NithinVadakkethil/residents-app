import { ApiError } from '../src/services/api/error';
import { AxiosError } from 'axios';

describe('API Error Mapping for Amenities & Bookings', () => {
  function createAxiosError(status?: number, data?: any, code?: string): AxiosError<any> {
    const error = new Error('Request error') as AxiosError<any>;
    error.isAxiosError = true;
    error.code = code;
    if (status !== undefined) {
      error.response = {
        status,
        statusText: status === 409 ? 'Conflict' : 'Error',
        headers: {},
        config: {} as any,
        data: data || {},
      };
    }
    return error;
  }

  it('maps HTTP 409 Conflict to CONFLICT domain error code for Stitch Screen 13', () => {
    const axiosError = createAxiosError(409, {
      message: 'This time slot was just booked by another resident.',
    });

    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(409);
    expect(apiError.code).toBe('CONFLICT');
    expect(apiError.message).toBe('This time slot was just booked by another resident.');
  });

  it('maps HTTP 422 to VALIDATION_ERROR', () => {
    const axiosError = createAxiosError(422, {
      message: 'The selected date is in the past.',
      errors: { date: ['The selected date is in the past.'] },
    });

    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(422);
    expect(apiError.code).toBe('VALIDATION_ERROR');
    expect(apiError.message).toBe('The selected date is in the past.');
  });

  it('maps HTTP 429 to RATE_LIMITED', () => {
    const axiosError = createAxiosError(429);

    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(429);
    expect(apiError.code).toBe('RATE_LIMITED');
    expect(apiError.message).toContain('Too many requests');
  });

  it('maps HTTP 404 to NOT_FOUND', () => {
    const axiosError = createAxiosError(404);

    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(404);
    expect(apiError.code).toBe('NOT_FOUND');
  });

  it('maps HTTP 500 to SERVER_ERROR', () => {
    const axiosError = createAxiosError(500);

    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(500);
    expect(apiError.code).toBe('SERVER_ERROR');
  });

  it('maps network drop to NETWORK_ERROR', () => {
    const axiosError = createAxiosError(undefined, undefined, 'ERR_NETWORK');

    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(0);
    expect(apiError.code).toBe('NETWORK_ERROR');
    expect(apiError.message).toContain('Network connection unavailable');
  });
});
