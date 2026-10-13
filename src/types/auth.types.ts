import { Order } from './order.types';
import { UserProfile } from './user.types';

export interface AuthState {
  phone: string | null;
  isAuthenticated: boolean;
  profile: UserProfile | null;
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}
