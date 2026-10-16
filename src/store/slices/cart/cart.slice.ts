import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: string;
  article?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxQuantity?: number;
  inStock?: boolean;
  slug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  groupSlug?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const DEFAULT_MAX_QUANTITY = 99;

const isAvailable = (item: CartItem) => item.inStock !== false;

const clampQuantity = (item: CartItem, quantity: number) =>
  Math.min(Math.max(1, quantity), item.maxQuantity ?? DEFAULT_MAX_QUANTITY);

export const calculateCartTotals = (items: CartItem[]) => {
  const available = items.filter(isAvailable);
  return {
    totalItems: available.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: available.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
};

const recalculateTotals = (state: CartState) => {
  Object.assign(state, calculateCartTotals(state.items));
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(item => item.productId === action.payload.productId);

      if (existing) {
        existing.quantity = clampQuantity(existing, existing.quantity + action.payload.quantity);
      } else {
        state.items.push({ ...action.payload, quantity: clampQuantity(action.payload, action.payload.quantity) });
      }

      recalculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      recalculateTotals(state);
    },

    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = clampQuantity(item, action.payload.quantity);
        recalculateTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
