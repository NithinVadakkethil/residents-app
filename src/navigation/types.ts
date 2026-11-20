/**
 * Strongly Typed React Navigation Param Lists
 * Phase 3 Amenities + Slot Availability + Booking
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { BookingConfirmation, BookingConflictInfo } from '../features/amenities/types';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  OtpVerification: { email: string };
};

export type HomeStackParamList = {
  Home: undefined;
  SelectBuilding: { isFirstTimeBootstrap?: boolean } | undefined;
  Amenities: undefined;
  AmenityDetails: { assetId: string; assetName?: string };
  BookingSuccess: { confirmation: BookingConfirmation };
  BookingConflict: { conflict: BookingConflictInfo };
};

export type RequestsStackParamList = {
  Requests: undefined;
  CreateRequest: undefined;
};

export type BookingsStackParamList = {
  Bookings: undefined;
  Amenities: undefined;
  AmenityDetails: { assetId: string; assetName?: string };
  BookingSuccess: { confirmation: BookingConfirmation };
  BookingConflict: { conflict: BookingConflictInfo };
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  RequestsTab: NavigatorScreenParams<RequestsStackParamList>;
  CreateActionPlaceholder: undefined;
  BookingsTab: NavigatorScreenParams<BookingsStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  SelectBuildingModal: undefined;
  CreateRequestModal: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
