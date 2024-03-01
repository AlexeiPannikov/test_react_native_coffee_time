import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, UiButton } from '@/shared';
import { AuthScreenTemplate } from '@screens/auth/AuthScreenTemplate.tsx';
import { StyleSheet, View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Choose'>;

export const ChooseWayScreen = ({ navigation: { navigate } }: Props) => {
  return (
    <AuthScreenTemplate>
      <View>
        <UiButton style={styles.button} onPress={() => navigate('SignIn')}>
          Войти
        </UiButton>
        <UiButton style={[styles.bottomButton, styles.button]} onPress={() => navigate('SignUp')}>
          Регистрация
        </UiButton>
      </View>
    </AuthScreenTemplate>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
  },
  bottomButton: { marginTop: 20 },
});
