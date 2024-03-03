import {
  authApi,
  useLazyAuthorizationQuery,
  useRegistrationMutation,
} from '@features/auth/api/AuthApi.ts';
import { SecureStorage } from '@/shared';
import { useUser } from '@/entities';

export const useAuth = () => {
  const [authorization, authRezult] = useLazyAuthorizationQuery();
  const [registration, regRezult] = useRegistrationMutation();
  const { removeUser } = useUser();

  const signOut = async () => {
    await SecureStorage.clearAll();
    authApi.util.invalidateTags(['User']);
    removeUser();
  };

  return {
    signOut,
    registration,
    authorization,
    authRezult,
    regRezult,
  };
};
