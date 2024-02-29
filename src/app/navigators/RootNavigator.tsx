import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation//native-stack';
import { type RootStackParamList } from '@/shared';
import { AuthNavigator } from '@app/navigators/AuthNavigator.tsx';
import { MainScreen } from '@/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [tmp] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setInitializing(false);
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {tmp === null ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
