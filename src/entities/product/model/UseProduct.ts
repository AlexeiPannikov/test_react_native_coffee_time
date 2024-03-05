import { useAppDispatch, useAppSelector } from '@/shared';
import { Product, setFilteredList, useGetProductsCafeQuery } from '@/entities';

export const useProduct = () => {
  const productsList = useAppSelector((state) => state.product.productList);
  const filteredProducts = useAppSelector((state) => state.product.filteredList);
  const dispatch = useAppDispatch();

  const setFilteredProducts = (products: Product[]) => {
    dispatch(setFilteredList(products));
  };

  return {
    productsList,
    filteredProducts,
    setFilteredProducts,
  };
};
