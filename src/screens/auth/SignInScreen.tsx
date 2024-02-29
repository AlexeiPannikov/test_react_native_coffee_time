import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AuthStackParamList } from '@/shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export const SignInScreen = (props: Props) => {
  return (
    <SafeAreaView>
      <Text style={{ color: 'blue', fontSize: 50 }}>Sign In</Text>
    </SafeAreaView>
  );
};
