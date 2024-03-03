import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UiText } from '@/shared';
import { useUser } from '@/entities';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const MainScreen = (props: Props) => {
  const { user } = useUser();

  return (
    <>
      <UiText>{user?.email}</UiText>
    </>
  );
};
