import React, { useEffect } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hexToRgbA, staticModerateScale, UiButton, UiText, useTheme } from '@/shared';
import { LogOutButton } from '@/features';

export const CustomDriverContent = ({ state, navigation }: DrawerContentComponentProps) => {
  const {
    theme: { font, colors },
  } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {state.routes.map((route) => (
          <TouchableOpacity
            key={route.key}
            style={[styles.item, { backgroundColor: colors.primaryContainer }]}
            onPress={() => navigation.navigate(route.name)}
          >
            <Text
              style={[
                styles.text,
                {
                  fontFamily: font.families['SF-UI-Text-Regular'],
                  color: colors.onPrimaryContainer,
                },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <LogOutButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    marginBottom: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  text: {
    fontSize: staticModerateScale(20),
  },
});
