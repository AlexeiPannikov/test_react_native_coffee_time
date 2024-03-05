import { baseApi, GetProductsListRequest, ProductResponse } from '@/shared';
import { ProductAdapter } from '@entities/product/model/ProductAdapter.ts';

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductsCafe: build.query<ProductResponse[], GetProductsListRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'Product/GetProductsCafe',
        body: args,
      }),
      providesTags: ['ProductList'],
      transformResponse: (res: ProductResponse[]) => {
        return ProductAdapter.listToDomain(res);
      },
    }),
  }),
});

const { useGetProductsCafeQuery, useLazyGetProductsCafeQuery } = productApi;

export { useGetProductsCafeQuery, useLazyGetProductsCafeQuery, productApi };
