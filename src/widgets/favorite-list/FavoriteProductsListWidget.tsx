import React from 'react';
import { useGetFavoriteProductsListQuery } from '@/entities';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import {
  DrawerParamList,
  FavoritesStackParamList,
  NoData,
  RootStackParamList,
  useTheme,
} from '@/shared';
import { ProductListItem } from '@/entities';
import { AddToFavoriteProductButton } from '@/features';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type NavigatePops = CompositeScreenProps<
  StackScreenProps<FavoritesStackParamList, 'FavoriteList'>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Favorites'>,
    StackScreenProps<RootStackParamList, 'Main'>
  >
>;

interface IProps extends NavigatePops {}

export const FavoriteProductsListWidget = ({ navigation: { navigate } }: IProps) => {
  const { isLoading, data, refetch } = useGetFavoriteProductsListQuery(null);
  const {
    theme: { colors },
  } = useTheme();

  return (
    <ScrollView
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
    >
      {data?.length ? (
        <View style={styles.container}>
          {data.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              onPress={() => navigate('Product', { id: item.id })}
              bottomRightSlot={<AddToFavoriteProductButton product={item} />}
            />
          ))}
        </View>
      ) : (
        <NoData>{'Здесь нет ни одной чашки кофе\n Попробуйте вернуться к нам позже'}</NoData>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
