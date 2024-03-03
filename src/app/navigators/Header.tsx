import { StackHeaderProps } from '@react-navigation/stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { IconBack, staticModerateScale, staticVerticalScale, UiText, useTheme } from '@/shared';
import React from 'react';

export const Header = ({ navigation, progress }: StackHeaderProps) => {
  const {
    theme: { font, colors },
  } = useTheme();

  return (
    <View style={styles.container}>
      {progress.previous && (
        <Pressable style={styles.iconBack} onPress={navigation.goBack}>
          <Image source={IconBack} />
        </Pressable>
      )}
      <UiText
        style={[
          styles.title,
          { fontFamily: font.families['Lobster'], color: colors.onBackgroundVariant2 },
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
    left: 5,
  },
});
