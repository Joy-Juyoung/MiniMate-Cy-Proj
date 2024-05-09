import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import themeSlice from './theme';

const rootReducer = combineReducers({
  // auth: authSlice,
  user: userSlice,
  theme: themeSlice,
  auth: authSlice,
});

export { rootReducer };
