import React from 'react';
import { type IButtonCommonPropsWithChildren } from '@shared/ui';
import Animated from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { staticModerateScale, useTheme } from '@/shared';

export const IconButton = (props: IButtonCommonPropsWithChildren) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Animated.View
      {...props}
      style={[props.style, styles.button, { opacity: props.disabled ? 0.8 : 1 }]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={10}
        style={[styles.container, { backgroundColor: colors.background }]}
        disabled={props.disabled}
        onPress={() => {
          props.onPress();
        }}
      >
        {props.children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
  },
  container: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: staticModerateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
