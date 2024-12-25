import { createSlice } from '@reduxjs/toolkit/react';
import { AuthToken } from '../types';

export type AuthendicationState = {
  isAuthenticated: boolean;
  authToken?: AuthToken;
};

export const initialState: AuthendicationState = {
  isAuthenticated: false,
};

const authendicationSlice = createSlice({
  name: 'authendication',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthToken: (state) => {
      state.authToken = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthToken, clearAuthToken } = authendicationSlice.actions;
export { authendicationSlice };
