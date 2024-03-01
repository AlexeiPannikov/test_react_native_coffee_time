/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import React, { type PropsWithChildren, type ReactElement, useEffect } from 'react';
import {
  Controller,
  type FieldValues,
  type FieldPath,
  type ControllerRenderProps,
  type ControllerFieldState,
  type UseFormStateReturn,
} from 'react-hook-form';
import { IUiTextInputProps, type UseAppFormReturn } from '@shared/ui';

export interface IControllerRenderProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}

export const UiForm = ({ children, control, register }: PropsWithChildren<UseAppFormReturn>) => {
  useEffect(() => {
    (Array.isArray(children)
      ? [...(children as ReactElement<IUiTextInputProps>[])]
      : [children as ReactElement<IUiTextInputProps>]
    ).forEach((child) => {
      if (child.props.name) register(child.props.name, child.props.options);
    });
  }, [children, register]);

  return (
    <>
      {(Array.isArray(children)
        ? [...(children as ReactElement<IUiTextInputProps>[])]
        : [children as ReactElement<IUiTextInputProps>]
      )
        .filter((child) => child)
        .map((child) => {
          return child.props.name ? (
            <Controller
              name={child.props.name}
              key={child.props.name}
              control={control}
              render={(props) => React.createElement(child.type, { ...props, ...child.props })}
            />
          ) : (
            child
          );
        })}
    </>
  );
};
