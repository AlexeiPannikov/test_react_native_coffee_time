import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UiButton, UiText } from '@/shared';
import { useAuth } from '@/features';
import { useAppSelector } from '@shared/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const MainScreen = (props: Props) => {
  const { signOut } = useAuth();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <UiText>{user?.email}</UiText>
      <UiButton onPress={() => signOut()}>Logout</UiButton>
    </>
  );
};
