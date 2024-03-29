import { Cafe } from '@entities/cafe/model/Cafe.ts';
import {
  DrawerParamList,
  MainStackParamList,
  RightChevronIcon,
  RootStackParamList,
  staticModerateScale,
  UiButton,
  UiText,
  useHaptic,
  useTheme,
} from '@/shared';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type Props = CompositeScreenProps<
  StackScreenProps<MainStackParamList, 'CaffeList'>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Home'>,
    StackScreenProps<RootStackParamList, 'Main'>
  >
>;

interface CafeListItemProps extends Props {
  cafe: Cafe;
}

export const CafeListItem = ({
  cafe: { images, name, address, id },
  navigation: { navigate },
}: CafeListItemProps) => {
  const {
    theme: { colors },
  } = useTheme();
  const { selectionTrigger } = useHaptic();

  const goToCafePage = () => {
    selectionTrigger();
    navigate({ name: 'Caffe', params: { id } });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        <Image style={styles.image} source={{ uri: images }} />
      </View>
      <View style={styles.rightBlock}>
        <View style={styles.textWrap}>
          <UiText type="headline3" style={[styles.title, { color: colors.primary }]}>
            {name}
          </UiText>
          <UiText type="body2" style={{ fontWeight: '300' }}>
            Мы находимся:
          </UiText>
          <UiText type="body1" style={{ fontWeight: '400' }}>
            {address}
          </UiText>
        </View>
        <View style={styles.buttonNextWrap}>
          <UiButton
            type="text"
            color={colors.onBackgroundVariant}
            fontSize={staticModerateScale(14)}
            iconRight={
              <RightChevronIcon
                opacity={0.2}
                color={colors.onBackgroundVariant2}
                width={10}
                height={10}
                style={{ marginLeft: 10, marginTop: 2 }}
              />
            }
            onPress={goToCafePage}
          >
            подробнее
          </UiButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingRight: 10,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.05,
    elevation: 5,
  },
  rightBlock: {
    flexShrink: 1,
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    opacity: 0.7,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: 100,
    aspectRatio: 1,
  },
  buttonNextWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
});
