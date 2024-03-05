import { useAppDispatch, useAppSelector } from '@/shared';
import { CafeProduct, setFilteredList, useGetProductsCafeQuery } from '@/entities';

export const useProduct = () => {
  const productsList = useAppSelector((state) => state.product.productList);
  const filteredProducts = useAppSelector((state) => state.product.filteredList);
  const dispatch = useAppDispatch();

  const setFilteredProducts = (products: CafeProduct[]) => {
    dispatch(setFilteredList(products));
  };

  return {
    productsList,
    filteredProducts,
    setFilteredProducts,
  };
};
