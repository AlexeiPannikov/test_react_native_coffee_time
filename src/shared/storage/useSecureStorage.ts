import { useCallback, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

type Credentials = { sessionUuid: string; username: string; password: string } | null;
const CREDENTIALS = 'credentials';

export const useSecureStorage = () => {
  const [credentials, setCreds] = useState<Credentials>(null);

  const getCredentials = useCallback(async () => {
    try {
      const data = await EncryptedStorage.getItem(CREDENTIALS);
      if (!data) {
        setCreds(null);
      }
      setCreds(JSON.parse(data as string) as Credentials);
      return credentials;
    } catch (e) {
      console.error(e);
      setCreds(null);
    }
  }, [credentials]);

  const setCredentials = async (data: Credentials) => {
    try {
      await EncryptedStorage.setItem(CREDENTIALS, JSON.stringify(data));
      setCreds(data);
      return credentials;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCredentials();
  }, [getCredentials]);

  return {
    setCredentials,
    getCredentials,
    credentials,
  };
};
