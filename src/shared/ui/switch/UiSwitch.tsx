import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';

interface IProps {}

export const UiSwitch = (props: IProps) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.circle} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    backgroundColor: '#F2F5F7',
    borderRadius: 30,
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
