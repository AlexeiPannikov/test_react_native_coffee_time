import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi, rtkQueryErrorLogger } from '@/shared';
import { productSlice, userSlice } from '@/entities';
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
