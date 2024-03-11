import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '@/shared';
import { MainStackNavigator } from '@app/navigators/MainStackNavigator.tsx';
import { DrawerHeader } from '@app/navigators/components/DrawerHeader.tsx';
import { FavoritesStackNavigator } from '@app/navigators/FavoritesStackNavigator.tsx';
import { CustomDriverContent } from '@app/navigators/components/CustomDriverContent.tsx';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: DrawerHeader,
      }}
      drawerContent={CustomDriverContent}
    >
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="Favorites" component={FavoritesStackNavigator} />
    </Drawer.Navigator>
  );
};
