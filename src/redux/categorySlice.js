import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/categories');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async ({ categoryId, thunkAPI }) => {
    try {
      const response = await API.get(`/categories/${categoryId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ({ categoryId, thunkAPI }) => {
    try {
      await API.delete(`/categories/${categoryId}`);
      return categoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, name, kind, thunkAPI }) => {
    try {
      const response = await API.patch(`/categories/${categoryId}`, {
        name,
        kind,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async ({ categoryData, thunkAPI }) => {
    try {
      const response = await API.post('/categories', categoryData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.list = state.list.map((category) =>
          category._id === action.payload._id
            ? {
                ...category,
                name: action.payload.name,
                kind: action.payload.kind,
              }
            : category
        );
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
