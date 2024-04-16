import { createSlice } from '@reduxjs/toolkit';
import { user } from '../assets/data';

const initialState = {
  //  ?? user, -> temp data
  user: JSON.parse(window?.localStorage.getItem('user')) ?? user,
  edit: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem('user');
    },
    // edit user profile
    updateProfile(state, action) {
      state.edit = action.payload;
    },
  },
});

export default userSlice.reducer;

export function UserLogin(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login(user));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}

export function UpdateProfile(value) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updateProfile(value));
  };
}
