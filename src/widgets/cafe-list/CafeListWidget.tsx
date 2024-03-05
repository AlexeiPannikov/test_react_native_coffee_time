import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { CafeListItem, useGetCafeListQuery } from '@/entities';
import { NoData, RootStackParamList, useTheme } from '@/shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'CaffeList'>;

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
