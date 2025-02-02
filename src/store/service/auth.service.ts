import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BaseUrl,
  ErrorResponseDto,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SuccessResponseDto,
} from '../types';

const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
  }),
  endpoints(build) {
    return {
      signUp: build.mutation<
        SuccessResponseDto<null> | ErrorResponseDto,
        SignUpRequest
      >({
        query: (queryArg) => ({
          url: '/auth/signup',
          method: 'POST',
          body: queryArg,
        }),
      }),

      signIn: build.mutation<
        SuccessResponseDto<SignInResponse> | ErrorResponseDto,
        SignInRequest
      >({
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
