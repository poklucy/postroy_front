import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.items
);

export const selectCartTotalItems = createSelector(
    [selectCartState],
    (cart) => cart.totalItems
);

export const selectCartTotalPrice = createSelector(
    [selectCartState],
    (cart) => cart.totalPrice
);
