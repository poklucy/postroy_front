import { ROUTES } from '@/config/routes.config';

export interface Redirect {
  from: string;
  to: string;
}

export const REDIRECTS: Redirect[] = [
  { from: '/index.html', to: ROUTES.HOME },
  { from: '/home', to: ROUTES.HOME },
  { from: '/stores', to: ROUTES.AboutPage },
  { from: '/shipping', to: ROUTES.DeliveryPage },
  { from: '/basket', to: ROUTES.CART },
  { from: '/account', to: ROUTES.PROFILE },
];
