import React, { PropsWithChildren } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { BackgroundImage, UiText, useResponsiveSizes } from '@/shared';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'react-native-linear-gradient';

export const AuthScreenTemplate = ({ children }: PropsWithChildren) => {
  const { verticalScale } = useResponsiveSizes();
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={[styles.image, { width, height }]}
      >
        <LinearGradient
          colors={['rgba(190,188,219,0)', 'rgba(255,255,255, 0.2)', 'rgba(255,255,255, 0.9)']}
          style={styles.gradient}
        ></LinearGradient>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === 'ios'}
          extraHeight={130}
          extraScrollHeight={130}
        >
          <View style={[{ top: verticalScale(100) }, styles.titleWrap]}>
            <UiText type="headline1" style={[styles.title, { fontFamily: 'Lobster-Regular' }]}>
              CoffeTime
            </UiText>
            <UiText type="body1" style={styles.description}>
              Территория кофе
            </UiText>
          </View>
          <View style={[styles.content, { paddingTop: verticalScale(220) }]}>{children}</View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
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
