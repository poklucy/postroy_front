import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { MAX_COMPARE_ITEMS } from './compare.slice';

export const selectCompareState = (state: RootState) => state.compare;

export const selectCompareItems = createSelector(
  [selectCompareState],
  (compare) => compare.items
);

export const selectCompareTotalItems = createSelector(
  [selectCompareState],
  (compare) => compare.totalItems
);

export const selectIsInCompare = createSelector(
  [selectCompareItems, (_state: RootState, productId: string) => productId],
  (items, productId) => items.some(item => String(item.id) === productId)
);

export const selectCompareMaxReached = createSelector(
  [selectCompareTotalItems],
  (totalItems) => totalItems >= MAX_COMPARE_ITEMS
);
