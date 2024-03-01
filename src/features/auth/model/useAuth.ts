import {
  authApi,
  useLazyAuthorizationQuery,
  useRegistrationMutation,
} from '@features/auth/api/AuthApi.ts';
import { SecureStorage } from '@/shared';
import { useAppDispatch } from '@shared/hooks';
import { removeUser } from '@/features';

export const useAuth = () => {
  const [authorization, authRezult] = useLazyAuthorizationQuery();
  const [registration, regRezult] = useRegistrationMutation();
  const dispatch = useAppDispatch();

  const signOut = async () => {
    await SecureStorage.clearAll();
    authApi.util.invalidateTags(['User']);
    dispatch(removeUser());
  };

  return {
    signOut,
    registration,
    authorization,
    authRezult,
    regRezult,
  };
};
