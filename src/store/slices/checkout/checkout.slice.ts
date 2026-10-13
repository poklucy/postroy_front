import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/types/order.types';

interface CheckoutState {
  lastOrder: Order | null;
}

const initialState: CheckoutState = {
  lastOrder: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setLastOrder: (state, action: PayloadAction<Order>) => {
      state.lastOrder = action.payload;
    },
  },
});

export const { setLastOrder } = checkoutSlice.actions;

export default checkoutSlice.reducer;
