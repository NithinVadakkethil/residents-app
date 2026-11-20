/**
 * Core API Client
 * Configured Axios instance with baseURL, interceptors, and error normalization
 */

import axios, { AxiosInstance } from 'axios';
import { ApiError } from './error';
import { storageService, STORAGE_KEYS } from '../storage/storage';

export const API_BASE_URL = 'https://pulsevillas1.helloentry.com/api/resident';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Inject Auth Token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await storageService.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Continue without token if storage lookup fails
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Normalize Errors to ApiError
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = ApiError.fromAxiosError(error);
    return Promise.reject(apiError);
  }
);
