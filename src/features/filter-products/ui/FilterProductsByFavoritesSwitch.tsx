import React from 'react';
import { HeartIcon, UiSwitch } from '@/shared';
import { CafeProduct, useProduct } from '@/entities';

export const FilterProductsByFavoritesSwitch = () => {
  let isEnabled = false;
  const { setFilteredProducts, productsList } = useProduct();

  const filter = (products: CafeProduct[]) =>
    products.filter((item) => (isEnabled ? item.favorite : true));

  const onChange = (value: boolean) => {
    isEnabled = value;
    setFilteredProducts(filter(productsList));
  };

  return (
    <UiSwitch
      onChange={(value) => {
        onChange(value);
      }}
    >
      <HeartIcon width={20} height={20} color="red" />
    </UiSwitch>
  );
};
