import React, { type PropsWithChildren } from 'react';
import { Platform, Text, type TextProps } from 'react-native';
import { useTheme } from '@shared/theme';
import { type ITheme } from '@shared/theme/themes.ts';
import { staticModerateScale } from '@shared/utils';

type UiTextType = keyof ITheme['font']['sizes'];

interface UiTextProps {
  type: UiTextType;
}

export const UiText = ({
  children,
  type,
  style,
  ...rest
}: PropsWithChildren<TextProps & Partial<UiTextProps>>) => {
  const {
    theme: { font, colors },
  } = useTheme();

  return (
    <Text
      {...rest}
      style={[
        {
          color: colors.onBackground,
          fontFamily: type?.includes('headline1')
            ? Platform.OS === 'android'
              ? font.families['Lobster-Regular']
              : font.families['Lobster']
            : Platform.OS === 'android'
              ? font.families['SF-UI-Text-Regular']
              : font.families['SF-UI-Text'],
          fontWeight: '400',
          fontSize:
            type !== undefined ? staticModerateScale(font.sizes[type]) : staticModerateScale(14),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
