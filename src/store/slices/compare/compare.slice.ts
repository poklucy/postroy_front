import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCard } from '@/types/product.types';

export const MAX_COMPARE_ITEMS = 4;

interface CompareState {
  items: ProductCard[];
  totalItems: number;
}

const initialState: CompareState = {
  items: [],
  totalItems: 0,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    toggleCompare: (state, action: PayloadAction<ProductCard>) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        state.totalItems -= 1;
      } else {
        if (state.items.length >= MAX_COMPARE_ITEMS) {
          return;
        }
        state.items.push(action.payload);
        state.totalItems += 1;
      }
    },

    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
    },

    clearCompare: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { toggleCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
