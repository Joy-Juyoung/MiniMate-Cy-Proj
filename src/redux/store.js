import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categorySlice from './categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categorySlice,
  },
});
