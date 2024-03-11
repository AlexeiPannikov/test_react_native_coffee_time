import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MenuIcon, staticModerateScale, staticVerticalScale, UiText, useTheme } from '@/shared';
import React from 'react';
import { DrawerHeaderProps } from '@react-navigation/drawer';

export const DrawerHeader = ({ navigation }: DrawerHeaderProps) => {
  const {
    theme: { font, colors },
  } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        hitSlop={20}
        style={styles.iconBack}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <MenuIcon width={staticModerateScale(20)} height={staticModerateScale(20)} />
      </TouchableOpacity>
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
