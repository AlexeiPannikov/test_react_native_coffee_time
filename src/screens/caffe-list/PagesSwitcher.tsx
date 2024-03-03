import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListIcon, LocationIcon, useTheme } from '@/shared';

type Value = 0 | 1;

interface IProps {
  value: Value;
  onPress: (value: Value) => void;
}

export const PagesSwitcher = ({ value, onPress }: IProps) => {
  const {
    theme: { colors },
  } = useTheme();

  const onClick = (num: Value) => {
    onPress(num);
  };

  return (
    <View style={[styles.container, { borderColor: colors.onBackground }]}>
      <TouchableOpacity
        style={[
          styles.iconContainer,
          { backgroundColor: value === 0 ? colors.primary : 'transparent' },
        ]}
        onPress={() => onClick(0)}
      >
        <LocationIcon width={20} height={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconContainer,
          { backgroundColor: value === 1 ? colors.primary : 'transparent' },
        ]}
        onPress={() => onClick(1)}
      >
        <ListIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    padding: 2,
  },
  iconContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
