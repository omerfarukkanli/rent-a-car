import { createApi } from '@reduxjs/toolkit/query/react';
import { Car, DefaultResponse } from '../types';

import { baseQuery } from './CustomQuery';

const carService = createApi({
  reducerPath: 'carService',
  baseQuery: baseQuery,
  endpoints(build) {
    return {
      createCar: build.mutation<DefaultResponse, Car>({
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

      updateCar: build.mutation<DefaultResponse, { id: string; data: Car }>({
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
  useLazyGetCarsQuery,
  useGetCarQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carService;
export { carService };
