import React, { useEffect, useState } from 'react';
import { type RootStackParamList, SecureStorage, useTheme } from '@/shared';
import { ChooseWayScreen, SignInScreen, SignUpScreen } from '@/screens';
import { useAuth } from '@/features';
import { useUser } from '@/entities';
import { DrawerNavigator } from '@app/navigators/DrawerNavigator.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const { authorization } = useAuth();
  const { user } = useUser();
  const {
    theme: { colors },
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
        contentStyle: { backgroundColor: colors.background },
        headerShown: false,
      }}
    >
      {!user ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Choose"
            component={ChooseWayScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
