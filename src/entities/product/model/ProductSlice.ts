import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, productApi } from '@/entities';
import { ProductAdapter } from '@entities/product/model/ProductAdapter.ts';

interface ProductState {
  productList: Product[];
  filteredList: Product[];
}

const initialState: ProductState = {
  productList: [],
  filteredList: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilteredList: (state, action: PayloadAction<Product[]>) => {
      state.filteredList = [...action.payload];
    },
    addToFavorite: (state, action: PayloadAction<{ productId: string }>) => {
      state.filteredList.forEach((item) => {
        if (item.id === action.payload.productId) {
          item.favorite = true;
        }
      });
      state.productList.forEach((item) => {
        if (item.id === action.payload.productId) {
          item.favorite = true;
        }
      });
    },
    removeFromFavorite: (state, action: PayloadAction<{ productId: string }>) => {
      state.filteredList.forEach((item) => {
        if (item.id === action.payload.productId) {
          item.favorite = false;
        }
      });
      state.productList.forEach((item) => {
        if (item.id === action.payload.productId) {
          item.favorite = false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProductsCafe.matchFulfilled,
      (state, { payload }) => {
        state.productList = ProductAdapter.listToDomain(payload);
        state.filteredList = ProductAdapter.listToDomain(payload);
      },
    );
  },
});

export const { setFilteredList, addToFavorite, removeFromFavorite } = productSlice.actions;

export default productSlice.reducer;
