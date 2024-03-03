import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { baseApi, SecureStorage } from '@/shared';
import { API_URL } from '@env';
import { removeUserAction, setUserAction } from '@/entities';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  const credentials = await SecureStorage.getCredentials();
  if (!api.endpoint.includes('authorization') && !api.endpoint.includes('registration')) {
    if (typeof args === 'object' && 'body' in args) {
      args.body['sessionId'] = `"${credentials?.sessionUuid}"`;
    }
    if (typeof args === 'object') {
      args.body = JSON.stringify(JSON.parse(`"${credentials?.sessionUuid}"`));
    }
  }
  let result = await baseQuery(args, api, extraOptions);
  console.log(result.error);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
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
          api.dispatch(setUserAction({ email: credentials.email }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(baseApi.util?.invalidateTags(['User']));
          api.dispatch(removeUserAction());
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
