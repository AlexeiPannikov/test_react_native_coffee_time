import {
  baseApi,
  GetProductRequest,
  GetProductsListRequest,
  GetProductsResponseItem,
} from '@/shared';
import { ProductAdapter } from '@entities/product/model/ProductAdapter.ts';
import { GetProductResponse } from '@shared/api/product/GetProductResponse.ts';
import { Product } from '@entities/product/model/Product.ts';
import { CafeProduct } from '@/entities';

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductsCafe: build.query<CafeProduct[], GetProductsListRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'Product/GetProductsCafe',
        body: args,
      }),
      providesTags: ['ProductList'],
      transformResponse: (res: GetProductsResponseItem[]) => {
        return ProductAdapter.listToDomainCafeProduct(res);
      },
    }),
    getProduct: build.query<Product, GetProductRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'Product/GetProduct',
        body: args,
      }),
      providesTags: ['Product'],
      transformResponse: (res: GetProductResponse) => {
        return ProductAdapter.toDomainProduct(res);
      },
    }),
  }),
});

const { useGetProductsCafeQuery, useLazyGetProductsCafeQuery, useGetProductQuery } = productApi;

export { useGetProductsCafeQuery, useLazyGetProductsCafeQuery, useGetProductQuery, productApi };
