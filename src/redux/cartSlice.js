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

export const createCart = createAsyncThunk(
  'cart/createCart',
  async ({ cartData, thunkAPI }) => {
    try {
      const response = await API.post('/carts', cartData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCategory',
  async (cartId) => {
    await API.delete(`/carts/${cartId}`);
    return cartId;
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
      })
      // .addCase(createCart.fulfilled, (state, action) => {
      //   state.item.push(action.payload);
      // });
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.item.push(action.payload);
        state.success = true;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.item = state.item.filter((cart) => cart._id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
