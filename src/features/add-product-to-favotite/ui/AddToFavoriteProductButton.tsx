import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HeartIcon, staticModerateScale, useTheme } from '@/shared';
import { Product } from '@/entities';
import {
  useRemoveFromFavoritesMutation,
  useAddToFavoritesMutation,
} from '@features/add-product-to-favotite/api/FavoriteApi.ts';

interface IProps {
  product: Product;
}

export const AddToFavoriteProductButton = ({ product }: IProps) => {
  const {
    theme: { colors },
  } = useTheme();
  const [add] = useAddToFavoritesMutation();
  const [remove] = useRemoveFromFavoritesMutation();

  const addToFavorite = () => {
    if (product.favorite) {
      remove({ cafeId: product.cofeId, productId: product.id });
    } else {
      add({ cafeId: product.cofeId, productId: product.id });
    }
  };

  return (
    <TouchableOpacity onPress={addToFavorite}>
      <HeartIcon
        stroke={product.favorite ? 'red' : colors.onBackground}
        color={product.favorite ? 'red' : 'transparent'}
        width={staticModerateScale(24)}
        height={staticModerateScale(24)}
      />
    </TouchableOpacity>
  );
};
