import { AuthorizationRequest, baseApi, SecureStorage } from '@/shared';
import { RegistrationRequest } from '@/shared';
import { User } from '@entities/user/model/User.ts';
import { removeUserAction, setUserAction } from '@/entities';
type SessionUuid = string;

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<SessionUuid, RegistrationRequest>({
      query: (arg) => ({
        method: 'POST',
        url: 'User/Register',
        body: arg,
      }),
    }),
    authorization: build.query<User, AuthorizationRequest>({
      query: (arg) => ({
        method: 'POST',
        url: 'User/Authorization',
        body: arg,
      }),
      providesTags: ['User'],
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          dispatch(setUserAction(<User>{ email: arg.email }));
        } catch (e) {
          dispatch(removeUserAction());
        }
      },
      transformResponse: async (res: SessionUuid, meta, arg) => {
        await SecureStorage.setCredentials({ ...arg, sessionUuid: res });
        console.log(await SecureStorage.getCredentials());
        return <User>{ email: arg.email };
      },
    }),
  }),
});

const { useRegistrationMutation, useLazyAuthorizationQuery, useAuthorizationQuery } = authApi;

export { authApi, useLazyAuthorizationQuery, useRegistrationMutation, useAuthorizationQuery };
