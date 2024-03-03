import { Cafe } from '@entities/cafe/model/Cafe.ts';
import { UiText, useTheme } from '@/shared';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface IProps {
  cafe: Cafe;
}

export const CafeListItem = ({ cafe: { images, name, address } }: IProps) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: images }} />
      </View>
      <View style={styles.textWrap}>
        <UiText
          type="headline2"
          style={{ color: colors.primary, fontWeight: 'bold', opacity: 0.7 }}
        >
          {name}
        </UiText>
        <UiText type="body1" style={{ fontWeight: '300' }}>
          Мы находимся:
        </UiText>
        <UiText type="body1" style={{ fontWeight: '400' }}>
          {address}
        </UiText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 126,
    width: '100%',
    flexDirection: 'row',
    paddingRight: 10,
  },
  textWrap: {
    paddingLeft: 20,
  },
  image: {
    flex: 1,
    width: 100,
    aspectRatio: 1,
  },
});
