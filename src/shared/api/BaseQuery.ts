import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { baseApi, SecureStorage } from '@/shared';
import { API_URL } from '@env';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({ baseUrl: API_URL });
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const credentials = await SecureStorage.getCredentials();
        if (!credentials) {
          await mutex.waitForUnlock();
          result = await baseQuery(args, api, extraOptions);
          return result;
        }
        const refreshResult = await baseQuery(
          {
            url: '/User/Authorization',
            body: { email: credentials?.email, password: credentials?.password },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          await SecureStorage.setCredentials({
            ...credentials,
            sessionUuid: refreshResult.data as string,
          });
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(baseApi.util?.invalidateTags(['User']));
          await SecureStorage.clearAll();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
