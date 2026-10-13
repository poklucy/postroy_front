import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavoritesItems = createSelector(
  [selectFavoritesState],
  (favorites) => favorites.items
);

export const selectFavoritesTotalItems = createSelector(
  [selectFavoritesState],
  (favorites) => favorites.totalItems
);

export const selectIsFavorite = createSelector(
  [selectFavoritesItems, (_: RootState, productId: string) => productId],
  (items, productId) => items.some(item => String(item.id) === productId)
);
