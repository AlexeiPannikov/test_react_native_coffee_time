import React from 'react';
import { useTheme } from '@shared/theme';
import Animated from 'react-native-reanimated';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { type IButtonCommonPropsWithChildren, staticModerateScale } from '@/shared';

export const FilledButton = (props: IButtonCommonPropsWithChildren) => {
  const {
    theme: { colors, font },
  } = useTheme();

  return (
    <Animated.View
      {...props}
      style={[
        styles.button,
        { opacity: props.disabled ? 0.8 : 1, overflow: 'hidden' },
        props.style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.container, { backgroundColor: colors.primary }]}
        disabled={props.disabled || props.loading}
        onPress={() => {
          console.log('onPress');
          props.onPress();
        }}
      >
        <Text
          style={[
            styles.text,
            { color: colors.onPrimary, fontFamily: font.families['SF-UI-Text-Regular'] },
          ]}
        >
          {props.loading ? (
            <ActivityIndicator size="small" color={colors.onPrimary} />
          ) : (
            props.children
          )}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    width: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: staticModerateScale(5),
    paddingHorizontal: staticModerateScale(10),
  },
  text: {
    fontSize: staticModerateScale(18),
    fontWeight: '600',
  },
});
