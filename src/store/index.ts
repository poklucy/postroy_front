import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { loadShopState, persistShopData, persistUserData } from './persistence';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadShopState(),
  devTools: import.meta.env.DEV,
});

persistUserData(store);
persistShopData(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
