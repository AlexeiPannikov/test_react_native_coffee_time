import { CaffeListScreen, CaffeScreen, ProductScreen } from '@/screens';
import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import {
  DrawerParamList,
  MainStackParamList,
  onRouteFocus,
  RootStackParamList,
  useTheme,
} from '@/shared';
import { StackHeader } from '@app/navigators/components/StackHeader.tsx';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';

const Stack = createStackNavigator<MainStackParamList>();

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Home'>,
  StackScreenProps<RootStackParamList, 'Main'>
>;

export const MainStackNavigator = (props: Props) => {
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
        focus: (e) => onRouteFocus<MainStackParamList>(e, props, ['CaffeList']),
      }}
    >
      <Stack.Screen name="CaffeList" component={CaffeListScreen} />
      <Stack.Screen name="Caffe" component={CaffeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};
