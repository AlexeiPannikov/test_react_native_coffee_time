import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CafeProduct, productApi } from '@/entities';
import { ProductAdapter } from '@entities/product/model/ProductAdapter.ts';

interface ProductState {
  productList: CafeProduct[];
  filteredList: CafeProduct[];
}

const initialState: ProductState = {
  productList: [],
  filteredList: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilteredList: (state, action: PayloadAction<CafeProduct[]>) => {
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
        state.productList = ProductAdapter.listToDomainCafeProduct(payload);
        state.filteredList = ProductAdapter.listToDomainCafeProduct(payload);
      },
    );
  },
});

export const { setFilteredList, addToFavorite, removeFromFavorite } = productSlice.actions;

export default productSlice.reducer;
