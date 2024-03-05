import React from 'react';
import { useGetProductsCafeQuery } from '@entities/product/api/ProductApi.ts';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NoData } from '@/shared';
import { ProductListItem, useProduct } from '@/entities';
import { AddToFavoriteProductButton } from '@/features';

interface IProps {
  cafeId: string;
}

export const ProductList = ({ cafeId }: IProps) => {
  const { isLoading, data } = useGetProductsCafeQuery({ cafeId });
  const { filteredProducts } = useProduct();

  return isLoading ? (
    <ActivityIndicator />
  ) : filteredProducts?.length ? (
    <View style={styles.container}>
      {filteredProducts.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
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
