import { useSecureStorage } from '@/shared';

export const useAuth = () => {
  const { uuid } = useSecureStorage();

  return {
    uuid,
  };
};
