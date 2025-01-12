import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import { BaseUrl } from '../types';

const getAccessToken = (state: RootState) => {
  return state.authendication.access_token;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getAccessToken(getState() as RootState);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
