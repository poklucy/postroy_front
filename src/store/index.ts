import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { persistUserData } from './persistence';

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

persistUserData(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
