import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories';
import productsReducer from './slices/products';
import cartReducer from './slices/cart';
import favoritesReducer from './slices/favorites';
import compareReducer from './slices/compare';
import checkoutReducer from './slices/checkout';
import authReducer from './slices/auth';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  compare: compareReducer,
  checkout: checkoutReducer,
  auth: authReducer,
});
