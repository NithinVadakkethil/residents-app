/**
 * Authentication Store (Zustand)
 * Manages authenticated state, resident user profile, and active token
 */

import { create } from 'zustand';
import { ResidentUser, AuthSessionResponse } from '../features/auth/types';
import { storageService, STORAGE_KEYS } from '../services/storage/storage';
import { authService } from '../features/auth/api/authService';

interface AuthState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  token: string | null;
  user: ResidentUser | null;
  loginSession: (session: AuthSessionResponse) => Promise<void>;
  logout: () => Promise<void>;
  initializeSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  token: null,
  user: null,

  loginSession: async (session: AuthSessionResponse) => {
    await storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, session.token);
    await storageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, session.refreshToken);
    await storageService.setItem(STORAGE_KEYS.USER_DATA, session.user);

    set({
      isAuthenticated: true,
      token: session.token,
      user: session.user,
    });
  },

  logout: async () => {
    await authService.logout();
    await storageService.clearAuth();
    set({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  },

  initializeSession: async () => {
    try {
      const token = await storageService.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
      const user = await storageService.getItem<ResidentUser>(STORAGE_KEYS.USER_DATA);

      if (token && user) {
        set({
          isAuthenticated: true,
          token,
          user,
          isInitializing: false,
        });
        return;
      }
    } catch {
      // Session restored as unauthenticated
    }
    set({ isAuthenticated: false, isInitializing: false });
  },
}));
