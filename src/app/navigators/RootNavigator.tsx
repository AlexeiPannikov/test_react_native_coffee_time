import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation//native-stack';
import { type RootStackParamList, SecureStorage } from '@/shared';
import { AuthNavigator } from '@app/navigators/AuthNavigator.tsx';
import { MainScreen } from '@/screens';
import { useAuth } from '@/features';
import { useAppSelector } from '@shared/hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const { authorization } = useAuth();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const init = async () => {
      try {
        const credentials = await SecureStorage.getCredentials();
        if (!credentials) {
          setInitializing(false);
          return;
        }
        await authorization({ email: credentials?.email, password: credentials?.password });
        setInitializing(false);
      } catch (e) {
        await SecureStorage.clearAll();
      }
    };
    init();
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
