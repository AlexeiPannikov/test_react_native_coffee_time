import React from 'react';
import { createForm, UiButton, UiTextInput, useAppForm, validateEmail } from '@/shared';
import { useAuth } from '@/features';

type Fields = {
  email: string;
  password: string;
};

interface Props {
  onSuccessSignUp: () => void;
}

const Form = createForm<Fields>();

export const SignUpForm = ({ onSuccessSignUp }: Props) => {
  const form = useAppForm<Fields>();
  const { registration, regRezult } = useAuth();

  const signUp = (data: Fields) => {
    registration(data)
      .unwrap()
      .then(() => {
        onSuccessSignUp();
      });
  };

  return (
    <Form {...form}>
      <UiTextInput
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#fff"
        textColor="#fff"
        options={{
          required: {
            value: true,
            message: 'Email is required',
          },
          validate: {
            isEmail: (value: string) => {
              const res = validateEmail(value);
              return res.success || res.message;
            },
          },
        }}
      />
      <UiTextInput
        name="password"
        placeholder="Password"
        placeholderTextColor="#fff"
        textColor="#fff"
        hideText
        options={{
          minLength: {
            value: 5,
            message: 'Minimal length is 5 symbols',
          },
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
        style={{ marginTop: 30 }}
      />
      <UiButton
        style={{ borderRadius: 30, marginTop: 30 }}
        onPress={form.handleSubmit(signUp)}
        disabled={!!Object.entries(form.formState.errors).length}
        loading={regRezult.isLoading}
      >
        Зарегистрироваться
      </UiButton>
    </Form>
  );
};
