import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ErrorResponseDto,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SuccessResponseDto,
} from '../types';

const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
  }),
  endpoints(build) {
    return {
      signUp: build.mutation<
        SuccessResponseDto | ErrorResponseDto,
        SignUpRequest
      >({
        query: (queryArg) => ({
          url: '/auth/signup',
          method: 'POST',
          body: queryArg,
        }),
      }),

      signIn: build.mutation<SignInRequest, SignInResponse>({
        query: (queryArg) => ({
          url: '/auth/signin',
          method: 'POST',
          body: queryArg,
        }),
      }),
    };
  },
});

export const { useSignUpMutation, useSignInMutation } = authService;
export { authService };
