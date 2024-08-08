import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const fetchMiniPhotos = createAsyncThunk(
  "miniPhoto/fetchMiniPhotos",
  async ({ folderId, thunkAPI }) => {
    try {
      const response = await API.get(
        `miniHomePhoto?photo_folder_id=${folderId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createMiniPhotos = createAsyncThunk(
  "miniPhoto/createMiniPhotos",
  async ({ folderId, photoData, thunkAPI }) => {
    try {
      const response = await API.post(`/miniHomePhoto/${folderId}`, photoData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMiniPhotos = createAsyncThunk(
  "miniPhoto/updateMiniPhotos",
  async ({ folderId, photoData, thunkAPI }) => {
    try {
      const response = await API.patch(`/miniHomePhoto/${folderId}`, photoData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteMiniPhotos = createAsyncThunk(
  "miniPhoto/deletePhotoFolder",
  async ({ folderId, thunkAPI }) => {
    try {
      const response = await API.delete(`/miniHomePhoto/${folderId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const miniPhotoSlice = createSlice({
  name: "miniPhoto",
  initialState: {
    photos: null,
    userHome: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMiniPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiniPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(fetchMiniPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMiniPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMiniPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(createMiniPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMiniPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMiniPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(updateMiniPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMiniPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMiniPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(deleteMiniPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default miniPhotoSlice.reducer;
