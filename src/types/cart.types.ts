export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxQuantity?: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
