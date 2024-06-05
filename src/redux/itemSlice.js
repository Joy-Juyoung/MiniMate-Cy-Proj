import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API } from './api';

export const fetchAllItemsByCategory = createAsyncThunk(
  'item/fetchAllItemsByCategory',
  async ({ categoryId, thunkAPI }) => {
    try {
      const response = await API.get(`/shopItems?category=${categoryId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the selectItem action creator
export const selectItem = createAction('item/selectItem');

export const fetchAllItems = createAsyncThunk(
  'item/fetchAllItems',
  async (_, thunkAPI) => {
    try {
      const response = await API.get(`/shopItems`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'item/fetchItem',
  async ({ itemId, thunkAPI }) => {
    try {
      const response = await API.get(`/shopItems/${itemId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async ({ itemId, thunkAPI }) => {
    try {
      await API.delete(`/shopItems/${itemId}`);
      return itemId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({ itemId, itemData, thunkAPI }) => {
    try {
      const response = await API.patch(`/shopItems/${itemId}`, itemData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateItemImages = createAsyncThunk(
  'item/updateItemImag',
  async ({ itemId, images, thunkAPI }) => {
    try {
      const response = await API.patch(`/shopItems/${itemId}/image`, images);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createItem = createAsyncThunk(
  'item/createItem',
  async ({ itemData, thunkAPI }) => {
    try {
      const response = await API.post('/shopItems', itemData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    list: [],
    all: [],
    selectedItem: null,
    loading: false,
    error: null,
    images: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllItemsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllItemsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllItemsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      })
      // Warnning. An error is likely to occur
      .addCase(updateItem.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item._id === action.payload._id ? { ...action.payload.data } : item
        );
      })
      // Warnning. An error is likely to occur
      .addCase(updateItemImages.fulfilled, (state, action) => {
        state.images = state.list.map((item) =>
          item._id === action.payload._id
            ? { ...item, name: action.payload.name }
            : item
        );
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default itemSlice.reducer;
