import React from 'react';
import { useGetProductsCafeQuery } from '@entities/product/api/ProductApi.ts';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DrawerParamList, MainStackParamList, NoData, RootStackParamList } from '@/shared';
import { ProductListItem, useProduct } from '@/entities';
import { AddToFavoriteProductButton } from '@/features';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type NavigatePops = CompositeScreenProps<
  StackScreenProps<MainStackParamList, 'Caffe'>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Home'>,
    StackScreenProps<RootStackParamList, 'Main'>
  >
>;

interface IProps extends NavigatePops {
  cafeId: string;
}

export const ProductListWidget = ({ cafeId, navigation: { navigate } }: IProps) => {
  const { isLoading } = useGetProductsCafeQuery({ cafeId });
  const { filteredProducts } = useProduct();

  return isLoading ? (
    <ActivityIndicator />
  ) : filteredProducts?.length ? (
    <View style={styles.container}>
      {filteredProducts.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onPress={() => navigate('Product', { id: product.id })}
          bottomRightSlot={<AddToFavoriteProductButton product={product} />}
        />
      ))}
    </View>
  ) : (
    <NoData>{'Здесь нет ни одной чашки кофе\n Попробуйте вернуться к нам позже'}</NoData>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
