import React, { PropsWithChildren } from 'react';
import { ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useGetCafeQuery } from '@/entities';
import { LinearGradient } from 'react-native-linear-gradient';
import { UiText, useTheme } from '@/shared';

interface Props {
  cafeId: string;
}

export const CafeImageWithTitle = ({ cafeId, children }: PropsWithChildren<Props>) => {
  const { data, isLoading } = useGetCafeQuery({ cafeId });
  const {
    theme: { colors, font },
  } = useTheme();

  return isLoading ? (
    <View></View>
  ) : (
    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={{ uri: data?.images }}>
        <LinearGradient
          colors={['rgba(190,188,219,0)', 'rgba(255,255,255, 0.2)', 'rgba(255,255,255, 0.9)']}
          style={styles.gradient}
        ></LinearGradient>
        <View style={[styles.bottomBlock]}>
          <View style={{ flex: 1 }}>
            <UiText
              type="headline2"
              style={{
                color: colors.onBackgroundVariant2,
                fontFamily: font.families['Lobster-Regular'],
                marginBottom: 5,
              }}
            >
              {data?.name}
            </UiText>
            <UiText type="body1">{data?.address}</UiText>
          </View>
          <View style={styles.slot}>{children}</View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 308,
  },
  gradient: {
    flex: 1,
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slot: {
    alignSelf: 'flex-end',
  },
});
