/**
 * Storage Service Abstraction
 * Wraps @react-native-async-storage/async-storage with strongly typed keys
 * Provides isolated storage for tokens and user preferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@orbit_resident/auth_token',
  REFRESH_TOKEN: '@orbit_resident/refresh_token',
  USER_DATA: '@orbit_resident/user_data',
  SELECTED_BUILDING_ID: '@orbit_resident/selected_building_id',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

class StorageService {
  async getItem<T>(key: StorageKey): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: StorageKey, value: T): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(key, serialized);
      return true;
    } catch {
      return false;
    }
  }

  async removeItem(key: StorageKey): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  async clearAuth(): Promise<void> {
    await Promise.all([
      this.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      this.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
      this.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  }
}

export const storageService = new StorageService();
