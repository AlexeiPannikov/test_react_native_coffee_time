import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { BackgroundImage, UiText, useResponsiveSizes } from '@/shared';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AuthScreenTemplate = ({ children }: PropsWithChildren) => {
  const { verticalScale } = useResponsiveSizes();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}
        blurRadius={2}
      >
        <KeyboardAwareScrollView style={{ width: '100%' }}>
          <View style={[{ top: verticalScale(100) }, styles.titleWrap]}>
            <UiText type="headline1" style={styles.title}>
              CoffeTime
            </UiText>
            <UiText type="body1" style={styles.description}>
              Территория кофе
            </UiText>
          </View>
          <View style={[styles.content, { top: verticalScale(220) }]}>{children}</View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  titleWrap: {
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
  },
  description: {
    textAlign: 'right',
    color: '#fff',
    marginTop: -10,
  },
  content: {
    alignSelf: 'center',
    width: '80%',
    paddingBottom: 120,
  },
});
