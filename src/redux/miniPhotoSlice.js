import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const createPhotoFolder = createAsyncThunk(
  "miniPhoto/createPhotoFolder",
  async ({ miniHomeId, folder_name, privacy_scope, thunkAPI }) => {
    try {
      const response = await API.post(`/miniHome/${miniHomeId}/photoFolder`, {
        folder_name,
        privacy_scope,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePhotoFolder = createAsyncThunk(
  "miniPhoto/updatePhotoFolder",
  async ({ miniHomeId, folder_name, privacy_scope, folderId, thunkAPI }) => {
    try {
      const response = await API.patch(
        `/miniHome/${miniHomeId}/photoFolder/${folderId}`,
        {
          folder_name,
          privacy_scope,
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePhotoFolder = createAsyncThunk(
  "miniPhoto/deletePhotoFolder",
  async ({ miniHomeId, folderId, thunkAPI }) => {
    try {
      const response = await API.delete(
        `/miniHome/${miniHomeId}/photoFolder/${folderId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const miniPhotoSlice = createSlice({
  name: "miniPhoto",
  initialState: {
    photoFolder: null,
    userHome: null,
    loading: false,
    error: null,
    image: null,
    text: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPhotoFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPhotoFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(createPhotoFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePhotoFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhotoFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(updatePhotoFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePhotoFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhotoFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(deletePhotoFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default miniPhotoSlice.reducer;
