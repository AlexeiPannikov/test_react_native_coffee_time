import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { CafeListItem, useGetCafeListQuery } from '@/entities';
import { UiButton, useTheme } from '@/shared';

export const CafeListWidget = () => {
  const { data, isLoading, refetch } = useGetCafeListQuery(null);
  const {
    theme: { colors },
  } = useTheme();

  return isLoading ? (
    <ActivityIndicator />
  ) : data?.length ? (
    <FlatList
      data={data}
      renderItem={({ item }) => <CafeListItem cafe={item} />}
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
    <UiButton onPress={refetch}>Refetch</UiButton>
  );
};
