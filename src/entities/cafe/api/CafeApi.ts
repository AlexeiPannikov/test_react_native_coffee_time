import { baseApi, GetCafeResponse } from '@/shared';
import { Cafe } from '@entities/cafe/model/Cafe.ts';
import { CafeAdapter } from '@entities/cafe/model/CafeAdapter.ts';
import { GetCafeRequest } from '@shared/api/cafe/GetCafeRequest.ts';

const cafeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCafeList: build.query<Cafe[], null>({
      query: () => ({
        method: 'POST',
        url: 'Cafe/GetAll',
      }),
      providesTags: ['CafeList'],
      transformResponse: (res: GetCafeResponse[]) => {
        return CafeAdapter.listToDomain(res);
      },
    }),
    getCafe: build.query<Cafe, GetCafeRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'Cafe/GetCafe',
        body: args,
      }),
      providesTags: ['Cafe'],
      transformResponse: (res: GetCafeResponse) => {
        return CafeAdapter.toDomain(res);
      },
    }),
  }),
});

const { useGetCafeListQuery, useGetCafeQuery, useLazyGetCafeQuery } = cafeApi;

export { useGetCafeListQuery, useGetCafeQuery, useLazyGetCafeQuery };
