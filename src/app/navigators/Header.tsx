import { StackHeaderProps } from '@react-navigation/stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import {
  IconBack,
  staticModerateScale,
  staticVerticalScale,
  UiText,
  useHaptic,
  useTheme,
} from '@/shared';
import React from 'react';

export const Header = ({ navigation, progress }: StackHeaderProps) => {
  const {
    theme: { font, colors },
  } = useTheme();
  const { selectionTrigger } = useHaptic();

  return (
    <View style={styles.container}>
      {progress.previous && (
        <Pressable
          hitSlop={20}
          style={styles.iconBack}
          onPress={() => {
            selectionTrigger();
            navigation.goBack();
          }}
        >
          <Image source={IconBack} />
        </Pressable>
      )}
      <UiText
        style={[
          styles.title,
          { fontFamily: font.families['Lobster-Regular'], color: colors.onBackgroundVariant2 },
        ]}
      >
        CoffeTime
      </UiText>
      <View style={[styles.border, { backgroundColor: colors.outlineVariant }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: staticModerateScale(22),
    paddingVertical: staticVerticalScale(12),
  },
  border: {
    width: '85%',
    height: 1,
    alignSelf: 'center',
  },
  iconBack: {
    position: 'absolute',
    left: 10,
    zIndex: 5,
  },
});
