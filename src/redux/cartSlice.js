import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async ({ cartId, thunkAPI }) => {
    try {
      const response = await API.get(`/carts/${cartId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCartsByUser = createAsyncThunk(
  'cart/fetchAllCartsByUser',
  async ({ userId, thunkAPI }) => {
    try {
      const response = await API.get(`carts?user=${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    error: null,
    success: false,
    item: [],
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload.message;
      })

      .addCase(fetchAllCartsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCartsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchAllCartsByUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload.message;
      });
  },
});

export default cartSlice.reducer;
