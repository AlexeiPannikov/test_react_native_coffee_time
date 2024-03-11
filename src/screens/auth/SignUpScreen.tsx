import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UiButton } from '@/shared';
import { AuthScreenTemplate } from '@screens/auth/AuthScreenTemplate.tsx';
import { SignUpForm } from '@/features';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen = ({ navigation: { navigate } }: Props) => {
  return (
    <AuthScreenTemplate>
      <SignUpForm onSuccessSignUp={() => navigate('SignIn')} />
      <UiButton type="text" style={{ marginTop: 30 }} onPress={() => navigate('SignIn')}>
        Войти
      </UiButton>
    </AuthScreenTemplate>
  );
};
