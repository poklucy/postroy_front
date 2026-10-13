import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCard } from '@/types/product.types';

interface FavoritesState {
  items: ProductCard[];
  totalItems: number;
}

const initialState: FavoritesState = {
  items: [],
  totalItems: 0,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ProductCard>) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        state.totalItems -= 1;
      } else {
        state.items.push(action.payload);
        state.totalItems += 1;
      }
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
    },

    clearFavorites: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { toggleFavorite, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
