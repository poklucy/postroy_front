import { RootState } from '@/store';

export const selectLastOrder = (state: RootState) => state.checkout.lastOrder;
