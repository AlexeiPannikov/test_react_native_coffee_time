import React from 'react';
import { createForm, UiButton, UiTextInput, useAppForm, useHaptic, validateEmail } from '@/shared';
import { useAuth } from '@/features';

type Fields = {
  email: string;
  password: string;
};

const Form = createForm<Fields>();

export const SignInForm = () => {
  const form = useAppForm<Fields>();
  const { authorization, authRezult } = useAuth();
  const { errorTrigger } = useHaptic();

  const signIn = (data: Fields) => {
    authorization(data);
  };

  const errorHandler = () => {
    errorTrigger();
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
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
        style={{ marginTop: 30 }}
      />
      <UiButton
        style={{ borderRadius: 30, marginTop: 30 }}
        onPress={form.handleSubmit(signIn, errorHandler)}
        disabled={!!Object.entries(form.formState.errors).length}
        loading={authRezult.isLoading}
      >
        Войти
      </UiButton>
    </Form>
  );
};
