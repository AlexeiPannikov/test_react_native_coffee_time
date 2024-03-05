import { baseApi, ChangeFavoriteStatusRequest } from '@/shared';
import { addToFavorite, productApi, removeFromFavorite, setFilteredList } from '@/entities';

const favoriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToFavorites: build.mutation<boolean, ChangeFavoriteStatusRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'Favorite/Set',
        body: args,
      }),
      onQueryStarted: async (req, { dispatch, queryFulfilled }) => {
        const patchResultGetProductsCafe = dispatch(
          productApi.util.updateQueryData('getProductsCafe', { cafeId: req.cafeId }, (draft) => {
            draft.forEach((item) => {
              if (item.id === req.productId) {
                item.favorite = true;
              }
            });
          }),
        );
        const patchResultGetCafe = dispatch(
          productApi.util.updateQueryData('getProduct', { productId: req.productId }, (draft) => {
            if (draft.id === req.productId) {
              draft.favorite = true;
            }
          }),
        );
        dispatch(addToFavorite({ productId: req.productId }));
        try {
          await queryFulfilled;
        } catch {
          patchResultGetProductsCafe.undo();
          patchResultGetCafe.undo();
          dispatch(removeFromFavorite({ productId: req.productId }));
        }
      },
    }),
    removeFromFavorites: build.mutation<boolean, ChangeFavoriteStatusRequest>({
      query: (args) => ({
        method: 'POST',
        url: 'Favorite/Unset',
        body: args,
      }),
      onQueryStarted: async (req, { dispatch, queryFulfilled }) => {
        const patchResultGetProductsCafe = dispatch(
          productApi.util.updateQueryData('getProductsCafe', { cafeId: req.cafeId }, (draft) => {
            draft.forEach((item) => {
              if (item.id === req.productId) {
                item.favorite = false;
              }
            });
          }),
        );
        const patchResultGetCafe = dispatch(
          productApi.util.updateQueryData('getProduct', { productId: req.productId }, (draft) => {
            if (draft.id === req.productId) {
              draft.favorite = false;
            }
          }),
        );
        dispatch(removeFromFavorite({ productId: req.productId }));
        try {
          await queryFulfilled;
        } catch {
          patchResultGetProductsCafe.undo();
          patchResultGetCafe.undo();
          dispatch(addToFavorite({ productId: req.productId }));
        }
      },
    }),
  }),
});

const { useAddToFavoritesMutation, useRemoveFromFavoritesMutation } = favoriteApi;

export { useAddToFavoritesMutation, useRemoveFromFavoritesMutation };
