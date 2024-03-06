import React, { PropsWithChildren, useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import { useHaptic, useTheme } from '@/shared';

interface IProps {
  onChange: (value: boolean) => void;
}

export const UiSwitch = ({ children, onChange }: PropsWithChildren<IProps>) => {
  const switchTranslate = useSharedValue<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const progress = useDerivedValue(() => {
    return withTiming(active ? 26 : 0);
  });
  const {
    theme: { colors },
  } = useTheme();
  const { selectionTrigger } = useHaptic();

  useEffect(() => {
    if (active) {
      switchTranslate.value = 26;
    } else {
      switchTranslate.value = 4;
    }
    onChange(active);
    selectionTrigger();
  }, [active, switchTranslate]);

  const springStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 24], ['#F2F5F7', colors.primary]);
    return { backgroundColor };
  });

  return (
    <TouchableWithoutFeedback onPress={() => setActive(!active)}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, springStyles]}>{children}</Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 34,
    backgroundColor: '#F2F5F7',
    borderRadius: 30,
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
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
