import React, { PropsWithChildren } from 'react';
import { Image, View, ViewProps } from 'react-native';
import { CoffeeMug, UiText, useTheme } from '@/shared';

export const NoData = ({ children, style }: PropsWithChildren<ViewProps>) => {
  const {
    theme: { colors, font },
  } = useTheme();

  return (
    <View style={[{ flex: 1, alignItems: 'center', backgroundColor: colors.background }, style]}>
      <View style={{ marginVertical: 80 }}>
        <Image source={CoffeeMug} />
      </View>
      <UiText
        type="body1"
        style={{
          fontFamily: font.families['SF-UI-Text-Light'],
          fontWeight: '300',
          textAlign: 'center',
        }}
      >
        {children}
      </UiText>
    </View>
  );
};
