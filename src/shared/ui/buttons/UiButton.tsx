import React, { type PropsWithChildren } from 'react';
import { type ViewProps } from 'react-native';
import { FilledButton } from '@shared/ui/buttons/FilledButton.tsx';
import { TextButton } from '@shared/ui/buttons/TextButton.tsx';

export interface IUiButtonProps extends ViewProps {
  type?: 'filled' | 'text';
  onPress?: () => unknown;
  disabled?: boolean;
  loading?: boolean;
}

interface IButtonCommonProps extends ViewProps {
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
}

export interface IButtonCommonPropsWithChildren extends PropsWithChildren<IButtonCommonProps> {}

export const UiButton = (props: PropsWithChildren<IUiButtonProps>) => {
  if (typeof props.children !== 'string') throw new Error('children must be a string');

  const onPress = () => {
    if (props.disabled) {
      return;
    }
    props.onPress?.();
  };

  const Button = (p: IButtonCommonPropsWithChildren) => {
    if (props.type === undefined || props.type === null) return <FilledButton {...p} />;

    switch (props.type) {
      case 'filled':
        return <FilledButton {...p} />;
      case 'text':
        return <TextButton {...p} />;
      default:
        return <FilledButton {...p} />;
    }
  };

  return <Button {...props} disabled={!!props.disabled} onPress={onPress} />;
};
