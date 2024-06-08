// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async ({ cartId }, thunkAPI) => {
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
  async ({ userId }, thunkAPI) => {
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
  async ({ cartData }, thunkAPI) => {
    try {
      const response = await API.post('/carts', cartData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (cartId) => {
    await API.delete(`/carts/${cartId}`);
    return cartId;
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ cartId, cartData }, thunkAPI) => {
    try {
      const response = await API.patch(`/carts/${cartId}`, cartData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createHistory = createAsyncThunk(
  'cart/createHistory',
  async ({ cartId }, thunkAPI) => {
    try {
      const response = await API.post('/histories', cartId);
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
    item: {},
    list: [],
    history: null,
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
        state.error = action.payload.message;
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
        state.error = action.payload.message;
      })
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = true;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.list = state.list.filter((cart) => cart._id !== action.payload);
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.list = state.list.map((cart) =>
          cart._id === action.payload._id ? { ...action.payload } : cart
        );
        if (state.item._id === action.payload._id) {
          state.item = action.payload;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      })
      .addCase(createHistory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createHistory.fulfilled, (state, action) => {
        state.loading = false;
        // state.history.push(action.payload);
        state.history = action.payload.data;
        state.success = true;
      })
      .addCase(createHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      });
  },
});

export default cartSlice.reducer;
