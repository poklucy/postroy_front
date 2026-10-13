import { userStorage } from '@/utils/userStorage';
import type { AppStore } from './index';

export const persistUserData = (store: AppStore) => {
  let { profile, orders, isAuthenticated } = store.getState().auth;

  store.subscribe(() => {
    const auth = store.getState().auth;

    if (auth.isAuthenticated !== isAuthenticated && !auth.isAuthenticated) {
      userStorage.clearSession();
    }

    if (auth.profile && (auth.profile !== profile || auth.orders !== orders)) {
      userStorage.saveUser({ profile: auth.profile, orders: auth.orders });
    }

    ({ profile, orders, isAuthenticated } = auth);
  });
};
