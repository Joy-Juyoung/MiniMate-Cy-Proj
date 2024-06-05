import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categorySlice from './categorySlice';
import userSlice from './userSlice';
import itemSlice from './itemSlice';
import cartSlice from './cartSlice';
import friendSlice from './friendSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    categories: categorySlice,
    item: itemSlice,
    cart: cartSlice,
    friend: friendSlice,
  },
});
