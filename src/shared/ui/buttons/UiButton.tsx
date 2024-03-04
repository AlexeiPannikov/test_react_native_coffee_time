import React, { type PropsWithChildren, ReactElement } from 'react';
import { type ViewProps } from 'react-native';
import { FilledButton } from '@shared/ui/buttons/FilledButton.tsx';
import { TextButton } from '@shared/ui/buttons/TextButton.tsx';
import { IconButton } from '@shared/ui/buttons/IconButton.tsx';

export interface IUiButtonProps extends ViewProps {
  type?: 'filled' | 'text' | 'icon';
  onPress?: () => unknown;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  fontSize?: number;
  iconRight?: ReactElement;
}

interface IButtonCommonProps extends ViewProps {
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
  color?: string;
  fontSize?: number;
  iconRight?: ReactElement;
}

export interface IButtonCommonPropsWithChildren extends PropsWithChildren<IButtonCommonProps> {}

export const UiButton = (props: PropsWithChildren<IUiButtonProps>) => {
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
      case 'icon':
        return <IconButton {...p} />;
      default:
        return <FilledButton {...p} />;
    }
  };

  return <Button {...props} disabled={!!props.disabled} onPress={onPress} />;
};
