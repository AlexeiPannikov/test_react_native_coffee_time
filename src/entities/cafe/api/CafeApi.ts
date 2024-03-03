import { baseApi, GetCafeListResponseItem } from '@/shared';
import { Cafe } from '@entities/cafe/model/Cafe.ts';
import { CafeAdapter } from '@entities/cafe/model/CafeAdapter.ts';

const cafeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCafeList: build.query<Cafe[], null>({
      query: () => ({
        method: 'POST',
        url: 'Cafe/GetAll',
      }),
      providesTags: ['CafeList'],
      transformResponse: (res: GetCafeListResponseItem[]) => {
        return CafeAdapter.listToDomain(res);
      },
    }),
  }),
});

const { useGetCafeListQuery } = cafeApi;

export { useGetCafeListQuery };
