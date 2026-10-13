import { RootState } from '@/store';

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserProfile = (state: RootState) => state.auth.profile;
export const selectUserOrders = (state: RootState) => state.auth.orders;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
