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
  role: string;
} & AuthToken;

export type AuthToken = {
  access_token: string;
};

export type SuccessResponseDto = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: SignInResponse | Car | null;
  timestamp?: string;
};

export type ErrorResponseDto = {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp?: string;
};

export type Car = {
  brand: string;
  carModel: string;
  carType: CarType;
  carFuelType: CarFuelType;
  year: string;
  color: string;
  image: string;
};

export enum CarType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  TRUCK = 'TRUCK',
  VAN = 'VAN',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  SPORTS = 'SPORTS',
}

export enum CarFuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type DefaultResponse = SuccessResponseDto | ErrorResponseDto;

export const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
