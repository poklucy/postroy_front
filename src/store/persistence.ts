import { userStorage } from '@/utils/userStorage';
import { clearViewedProducts } from '@/utils/viewedProducts';
import type { AppStore } from './index';
import { calculateCartTotals, CartItem } from './slices/cart/cart.slice';
import { ProductCard } from '@/types/product.types';

export const persistUserData = (store: AppStore) => {
  let { profile, orders, isAuthenticated } = store.getState().auth;

  store.subscribe(() => {
    const auth = store.getState().auth;

    if (auth.isAuthenticated !== isAuthenticated && !auth.isAuthenticated) {
      userStorage.clearSession();
      clearViewedProducts();
    }

    if (auth.profile && (auth.profile !== profile || auth.orders !== orders)) {
      userStorage.saveUser({ profile: auth.profile, orders: auth.orders });
    }

    ({ profile, orders, isAuthenticated } = auth);
  });
};

const SHOP_KEY = 'postroy_shop';

interface StoredShop {
  cart?: CartItem[];
  favorites?: ProductCard[];
  compare?: ProductCard[];
}

const readShop = (): StoredShop => {
  try {
    const raw = localStorage.getItem(SHOP_KEY);
    return raw ? (JSON.parse(raw) as StoredShop) : {};
  } catch {
    return {};
  }
};

export const loadShopState = () => {
  const { cart = [], favorites = [], compare = [] } = readShop();
  return {
    cart: { items: cart, ...calculateCartTotals(cart) },
    favorites: { items: favorites, totalItems: favorites.length },
    compare: { items: compare, totalItems: compare.length },
  };
};

export const persistShopData = (store: AppStore) => {
  let { cart, favorites, compare } = store.getState();

  store.subscribe(() => {
    const state = store.getState();
    if (state.cart === cart && state.favorites === favorites && state.compare === compare) return;
    ({ cart, favorites, compare } = state);

    try {
      localStorage.setItem(SHOP_KEY, JSON.stringify({
        cart: cart.items,
        favorites: favorites.items,
        compare: compare.items,
      }));
    } catch {
      /* storage unavailable or full — state stays in memory */
    }
  });
};
