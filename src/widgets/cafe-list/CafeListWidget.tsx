import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { CafeListItem, useGetCafeListQuery } from '@/entities';
import {
  DrawerParamList,
  MainStackParamList,
  NoData,
  RootStackParamList,
  useTheme,
} from '@/shared';
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

export const CafeListWidget = (props: Props) => {
  const { data, isLoading, refetch } = useGetCafeListQuery(null);
  const {
    theme: { colors },
  } = useTheme();

  return isLoading ? (
    <ActivityIndicator />
  ) : data?.length ? (
    <FlatList
      data={data}
      renderItem={({ item }) => <CafeListItem {...props} cafe={item} />}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
          }}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    ></FlatList>
  ) : (
    <NoData>По вашему запросу ничего не найдено</NoData>
  );
};
