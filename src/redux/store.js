import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categorySlice from './categorySlice';
import userSlice from './userSlice';
import itemSlice from './itemSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    category: categorySlice,
    item: itemSlice,
  },
});
