export type SignUpRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
};
export type AuthToken = {
  access_token: string;
};

export type SuccessResponseDto = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: SignInResponse | null;
  timestamp?: string;
};

export type ErrorResponseDto = {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp?: string;
};

export const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
