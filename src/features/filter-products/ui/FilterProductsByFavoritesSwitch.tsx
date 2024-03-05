import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { HeartIcon, UiSwitch } from '@/shared';
import { Product, useProduct } from '@/entities';

interface IProps {}

export const FilterProductsByFavoritesSwitch = ({}: IProps) => {
  let isEnabled = false;
  const { setFilteredProducts, productsList } = useProduct();

  const filter = (products: Product[]) =>
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
