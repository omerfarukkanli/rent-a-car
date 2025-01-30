import { createApi } from '@reduxjs/toolkit/query/react';
import { Car, ApiResponse, SuccessResponseDto } from '../types';

import { baseQuery } from './CustomQuery';
import { transformResponse } from '@/hooks/store';

const carService = createApi({
  reducerPath: 'carService',
  baseQuery: baseQuery,
  tagTypes: ['Cars'],
  endpoints(build) {
    return {
      createCar: build.mutation<Car[], Car>({
        query: (queryArg) => ({
          url: '/car/create',
          method: 'POST',
          body: queryArg,
        }),
        transformResponse: (response: ApiResponse<Car[]>) =>
          transformResponse(response),
        invalidatesTags: ['Cars'],
      }),

      getCars: build.query<Car[], void>({
        query: () => ({
          url: '/car',
          method: 'GET',
        }),
        transformResponse: (response: ApiResponse<Car[]>) =>
          transformResponse(response),
        providesTags: ['Cars'],
      }),

      updateCar: build.mutation<Car, { id: string; data: Car }>({
        query: ({ id, data }) => ({
          url: `/car/${id}`,
          method: 'PUT',
          body: data,
        }),
        transformResponse: (response: ApiResponse<Car>) =>
          transformResponse(response),
        invalidatesTags: ['Cars'],
      }),

      deleteCar: build.mutation<SuccessResponseDto<null>, string>({
        query: (id) => ({
          url: `/car/${id}`,
          method: 'DELETE',
        }),
        transformResponse: (response: ApiResponse<null>) => {
          if (!response.success) {
            throw new Error(response.message);
          }
          return response as SuccessResponseDto<null>;
        },
        invalidatesTags: ['Cars'],
      }),
    };
  },
});

export const {
  useCreateCarMutation,
  useLazyGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carService;
export { carService };
