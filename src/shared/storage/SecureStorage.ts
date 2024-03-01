import EncryptedStorage from 'react-native-encrypted-storage';

type Credentials = { sessionUuid: string; email: string; password: string } | null;
const CREDENTIALS = 'credentials';

export class SecureStorage {
  static async getCredentials() {
    try {
      const data = await EncryptedStorage.getItem(CREDENTIALS);
      if (!data) {
        return null;
      }
      return JSON.parse(data) as Credentials;
    } catch (e) {
      console.error(e);
    }
  }

  static async setCredentials(data: Credentials) {
    try {
      await EncryptedStorage.setItem(CREDENTIALS, JSON.stringify(data));
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  static async clearAll() {
    try {
      await EncryptedStorage.clear();
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}
