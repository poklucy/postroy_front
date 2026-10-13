export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export type DeliveryMethod = 'pickup' | 'courier';

export interface OrderItem {
  productId: string;
  article?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderContacts {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface OrderDelivery {
  method: DeliveryMethod;
  address: string;
  services: string[];
  comment: string;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  contacts: OrderContacts;
  delivery: OrderDelivery;
  itemsTotal: number;
  promoCode?: string;
  promoDiscount: number;
  bonusSpent: number;
  bonusEarned: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}
