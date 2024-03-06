import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared';
import { ProductCard, useGetProductQuery } from '@/entities';
import { AddToFavoriteProductButton } from '@/features';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

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
