import { ApiError } from '../src/services/api/error';
import { AxiosError } from 'axios';

describe('ApiError Normalization', () => {
  const createMockAxiosError = (status?: number, data?: any, code?: string): AxiosError => {
    const error = new Error('Axios mock error') as AxiosError;
    error.isAxiosError = true;
    error.code = code;
    if (status) {
      error.response = {
        status,
        statusText: 'Mock Status',
        headers: {},
        config: {} as any,
        data: data || {},
      };
    }
    return error;
  };

  it('normalizes 401 Unauthorized errors', () => {
    const axiosError = createMockAxiosError(401);
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(401);
    expect(apiError.code).toBe('UNAUTHORIZED');
    expect(apiError.message).toBe('Session expired. Please log in again.');
  });

  it('normalizes 403 Forbidden errors', () => {
    const axiosError = createMockAxiosError(403);
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(403);
    expect(apiError.code).toBe('FORBIDDEN');
  });

  it('normalizes 404 Not Found errors', () => {
    const axiosError = createMockAxiosError(404);
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(404);
    expect(apiError.code).toBe('NOT_FOUND');
  });

  it('normalizes 409 Conflict errors (Stitch Screen 13 Booking Conflict)', () => {
    const axiosError = createMockAxiosError(409, {
      message: 'Tennis Court B is already reserved for this slot.',
    });
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(409);
    expect(apiError.code).toBe('CONFLICT');
    expect(apiError.message).toBe('Tennis Court B is already reserved for this slot.');
  });

  it('normalizes 422 Validation errors', () => {
    const axiosError = createMockAxiosError(422, {
      message: 'Invalid date selection',
      errors: { date: ['Date must be in the future'] },
    });
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(422);
    expect(apiError.code).toBe('VALIDATION_ERROR');
    expect(apiError.details).toEqual({ date: ['Date must be in the future'] });
  });

  it('normalizes 429 Rate Limit errors', () => {
    const axiosError = createMockAxiosError(429);
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(429);
    expect(apiError.code).toBe('RATE_LIMITED');
  });

  it('normalizes 500 Server errors', () => {
    const axiosError = createMockAxiosError(500);
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(500);
    expect(apiError.code).toBe('SERVER_ERROR');
  });

  it('normalizes ECONNABORTED timeout errors', () => {
    const axiosError = createMockAxiosError(undefined, undefined, 'ECONNABORTED');
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(408);
    expect(apiError.code).toBe('REQUEST_TIMEOUT');
  });

  it('normalizes offline / network failure errors', () => {
    const axiosError = createMockAxiosError();
    const apiError = ApiError.fromAxiosError(axiosError);

    expect(apiError.status).toBe(0);
    expect(apiError.code).toBe('NETWORK_ERROR');
  });
});
