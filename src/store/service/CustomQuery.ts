import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import { BaseUrl } from '../types';

const getAccessToken = (state: RootState) => {
  return state.authendication.access_token;
};

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getAccessToken(getState() as RootState);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    credentials: 'include',
  });

  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.error('API Error:', result.error);
  }

  return result;
};
