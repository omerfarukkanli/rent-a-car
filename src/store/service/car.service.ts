import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomQuery';
import { CreateCarRequest, DefaultResponse } from '../types';

const carService = createApi({
  reducerPath: 'carService',
  baseQuery: customBaseQuery,
  endpoints(build) {
    return {
      createCar: build.mutation<DefaultResponse, CreateCarRequest>({
        query: (queryArg) => ({
          url: '/car/create',
          method: 'POST',
          body: queryArg,
        }),
      }),

      getCars: build.query<DefaultResponse, void>({
        query: () => ({
          url: '/car',
          method: 'GET',
        }),
      }),

      getCar: build.query<DefaultResponse, string>({
        query: (id) => ({
          url: `/car/${id}`,
          method: 'GET',
        }),
      }),

      updateCar: build.mutation<
        DefaultResponse,
        { id: string; data: CreateCarRequest }
      >({
        query: ({ id, data }) => ({
          url: `/car/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),

      deleteCar: build.mutation<DefaultResponse, string>({
        query: (id) => ({
          url: `/car/${id}`,
          method: 'DELETE',
        }),
      }),
    };
  },
});

export const {
  useCreateCarMutation,
  useGetCarsQuery,
  useGetCarQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carService;
export { carService };
