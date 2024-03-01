import React from 'react';
import { AuthStackParamList, UiButton } from '@/shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthScreenTemplate } from '@screens/auth/AuthScreenTemplate.tsx';
import { View } from 'react-native';
import { SignInForm } from '@/features';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export const SignInScreen = ({ navigation: { navigate } }: Props) => {
  return (
    <AuthScreenTemplate>
      <View>
        <SignInForm />
        <UiButton type="text" style={{ marginTop: 30 }} onPress={() => navigate('SignUp')}>
          Регистрация
        </UiButton>
      </View>
    </AuthScreenTemplate>
  );
};
