import { useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

type SessionUuid = string | null;
const SESSION_UUID = 'session_uuid';

export const useSecureStorage = () => {
  const [uuid, setUuid] = useState<SessionUuid>(null);

  const getSessionUuid = async () => {
    try {
      const sessionUuid = await EncryptedStorage.getItem(SESSION_UUID);
      setUuid(sessionUuid);
      return uuid;
    } catch (e) {
      console.error(e);
      setUuid(null);
    }
  };

  const setSessionUuid = async (data: string) => {
    try {
      await EncryptedStorage.setItem(SESSION_UUID, data);
      setUuid(data);
      return uuid;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSessionUuid();
  }, [getSessionUuid]);

  return {
    setSessionUuid,
    getSessionUuid,
    uuid,
  };
};
