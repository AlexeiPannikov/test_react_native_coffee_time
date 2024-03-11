import { FavoritesScreen, ProductScreen } from '@/screens';
import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import {
  DrawerParamList,
  FavoritesStackParamList,
  onRouteFocus,
  RootStackParamList,
  useTheme,
} from '@/shared';
import { StackHeader } from '@app/navigators/components/StackHeader.tsx';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';

const Stack = createStackNavigator<FavoritesStackParamList>();

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Favorites'>,
  StackScreenProps<RootStackParamList, 'Main'>
>;

export const FavoritesStackNavigator = (props: Props) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: StackHeader,
        cardStyle: { backgroundColor: colors.background },
      }}
      screenListeners={{
        focus: (e) => onRouteFocus<FavoritesStackParamList>(e, props, ['FavoriteList']),
      }}
    >
      <Stack.Screen name="FavoriteList" component={FavoritesScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};
