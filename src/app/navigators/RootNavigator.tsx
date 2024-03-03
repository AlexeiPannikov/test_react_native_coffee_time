import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { type RootStackParamList, SecureStorage, staticModerateScale, useTheme } from '@/shared';
import { AuthNavigator } from '@app/navigators/AuthNavigator.tsx';
import { CaffeListScreen } from '@/screens';
import { useAuth } from '@/features';
import { useUser } from '@/entities';
import { Header } from '@app/navigators/Header.tsx';
import { CaffeScreen } from '@screens/caffe';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const { authorization } = useAuth();
  const { user } = useUser();
  const {
    theme: { colors, font },
  } = useTheme();

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
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        header: Header,
      }}
    >
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="CaffeList" component={CaffeListScreen} />
          <Stack.Screen name="Caffe" component={CaffeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
