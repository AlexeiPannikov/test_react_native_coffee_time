/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { type PropsWithChildren } from 'react';
import { type FieldValues, useForm, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import { UiForm } from '@shared/ui/inputs/UiForm.tsx';

type UseAppFormProps<TFieldValues extends FieldValues, TContext> = UseFormProps<
  TFieldValues,
  TContext
>;

export type UseAppFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = FieldValues,
> = UseFormReturn<TFieldValues, TContext, TTransformedValues>;

export const useAppForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
>(
  props?: UseAppFormProps<TFieldValues, TContext>,
): UseAppFormReturn<TFieldValues, TContext, TTransformedValues> =>
  useForm<TFieldValues, TContext, TTransformedValues>(props);

export const createForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
>() => {
  return (p: PropsWithChildren<UseAppFormReturn<TFieldValues, TContext, TTransformedValues>>) => {
    return <UiForm {...p}>{p.children}</UiForm>;
  };
};
