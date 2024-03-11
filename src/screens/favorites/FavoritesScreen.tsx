import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList, FavoritesStackParamList, RootStackParamList, UiText } from '@/shared';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FavoriteProductsListWidget } from '@/widgets';

type Props = CompositeScreenProps<
  StackScreenProps<FavoritesStackParamList, 'FavoriteList'>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Home'>,
    StackScreenProps<RootStackParamList, 'Main'>
  >
>;

export const FavoritesScreen = (props: Props) => {
  return <FavoriteProductsListWidget {...props} />;
};
