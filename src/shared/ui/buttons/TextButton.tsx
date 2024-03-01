import React from 'react';
import { type IButtonCommonPropsWithChildren } from '@shared/ui';
import { useTheme } from '@shared/theme';
import Animated from 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const TextButton = (props: IButtonCommonPropsWithChildren) => {
  const {
    theme: { colors, font },
  } = useTheme();

  return (
    <Animated.View
      {...props}
      style={[props.style, styles.button, { opacity: props.disabled ? 0.8 : 1 }]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        disabled={props.disabled}
        onPress={() => {
          console.log('onPress');
          props.onPress();
        }}
      >
        <Text
          style={[
            styles.text,
            { color: colors.primary, fontFamily: font.families['SF-UI-Text-Regular'] },
          ]}
        >
          {props.children}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
