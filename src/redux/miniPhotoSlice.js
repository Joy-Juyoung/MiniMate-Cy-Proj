import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const fetchMiniPhotosByFolder = createAsyncThunk(
  "miniPhoto/fetchMiniPhotosByFolder",
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

// images
// photo_folder_id
// photo_title
// photo_privacy_scope
// content
export const createMiniPhotos = createAsyncThunk(
  "miniPhoto/createMiniPhotos",
  async ({ photoData, thunkAPI }) => {
    try {
      const response = await API.post(`/miniHomePhoto`, photoData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMiniPhotos = createAsyncThunk(
  "miniPhoto/updateMiniPhotos",
  async ({ photoId, photo_title, photo_privacy_scope, content, thunkAPI }) => {
    try {
      const response = await API.patch(`/miniHomePhoto/${photoId}`, {
        photo_title,
        photo_privacy_scope,
        content,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteMiniPhotos = createAsyncThunk(
  "miniPhoto/deleteMiniPhotos",
  async ({ photoId, thunkAPI }) => {
    try {
      const response = await API.delete(`/miniHomePhoto/${photoId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// comment

export const createPhotoComment = createAsyncThunk(
  "miniPhoto/createPhotoComment",
  async ({ photoId, friendId, text, thunkAPI }) => {
    try {
      const response = await API.post(`/miniHomePhoto/${photoId}/comment`, {
        friendId,
        text,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePhotoComment = createAsyncThunk(
  "miniPhoto/updatePhotoComment",
  async ({ photoId, commentId, text, thunkAPI }) => {
    try {
      const response = await API.patch(
        `/miniHomePhoto/${photoId}/comment/${commentId}`,
        text
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePhotoComment = createAsyncThunk(
  "miniPhoto/deletePhotoFolder",
  async ({ photoId, commentId, thunkAPI }) => {
    try {
      const response = await API.delete(
        `/miniHomePhoto/${photoId}/comment/${commentId}`
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
    photos: null,
    photoComment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMiniPhotosByFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiniPhotosByFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.photoFolder = action.payload;
      })
      .addCase(fetchMiniPhotosByFolder.rejected, (state, action) => {
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
      })
      // comment
      .addCase(createPhotoComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPhotoComment.fulfilled, (state, action) => {
        state.loading = false;
        state.photoComment = action.payload;
      })
      .addCase(createPhotoComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePhotoComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhotoComment.fulfilled, (state, action) => {
        state.loading = false;
        state.photoComment = action.payload;
      })
      .addCase(updatePhotoComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePhotoComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhotoComment.fulfilled, (state, action) => {
        state.loading = false;
        state.photoComment = action.payload;
      })
      .addCase(deletePhotoComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default miniPhotoSlice.reducer;
