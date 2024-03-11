import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerParamList, MainStackParamList, RootStackParamList } from '@/shared';
import { ProductCard, useGetProductQuery } from '@/entities';
import { AddToFavoriteProductButton } from '@/features';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type Props = CompositeScreenProps<
  StackScreenProps<MainStackParamList, 'Product'>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Home' | 'Favorites'>,
    StackScreenProps<RootStackParamList, 'Main'>
  >
>;

export const ProductScreen = ({ route: { params } }: Props) => {
  const { data } = useGetProductQuery({ productId: params.id });
  return (
    <View style={styles.container}>
      <ProductCard
        productId={params.id}
        titleSlot={data && <AddToFavoriteProductButton product={data} />}
      ></ProductCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
