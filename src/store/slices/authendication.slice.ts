import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { UserRole } from '../types';

export type AuthendicationState = {
  isAuthenticated: boolean;
  access_token?: string;
  role?: UserRole;
};

export const initialState: AuthendicationState = {
  isAuthenticated: false,
};

const authendicationSlice = createSlice({
  name: 'authendication',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthendicationState>) => {
      state.access_token = action.payload.access_token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
    },
    clearAuthToken: (state) => {
      state.access_token = undefined;
      state.role = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthToken, clearAuthToken } = authendicationSlice.actions;
export { authendicationSlice };
