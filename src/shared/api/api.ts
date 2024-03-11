import { baseQueryWithReauth } from '@shared/api/BaseQuery.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'CafeList', 'Cafe', 'ProductList', 'Product', 'FavoriteList'],
  endpoints: () => ({}),
});
