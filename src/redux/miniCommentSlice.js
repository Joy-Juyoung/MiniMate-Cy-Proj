import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const createBFComment = createAsyncThunk(
  "miniComment/createBFComment",
  async ({ miniHomeId, friendId, text, thunkAPI }) => {
    try {
      const response = await API.post(
        `/miniHome/${miniHomeId}/bestFriendComment`,
        { friendId, text }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBFComment = createAsyncThunk(
  "miniComment/updateBFComment",
  async ({ miniHomeId, commentId, text, thunkAPI }) => {
    try {
      const response = await API.patch(
        `/miniHome/${miniHomeId}/bestFriendComment/${commentId}`,
        {
          text,
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBFComment = createAsyncThunk(
  "miniComment/deleteBFComment",
  async ({ miniHomeId, commentId, thunkAPI }) => {
    try {
      const response = await API.delete(
        `/miniHome/${miniHomeId}/bestFriendComment/${commentId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const miniCommentSlice = createSlice({
  name: "miniComment",
  initialState: {
    bfComment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBFComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBFComment.fulfilled, (state, action) => {
        state.loading = false;
        state.bfComment = action.payload;
      })
      .addCase(createBFComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBFComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBFComment.fulfilled, (state, action) => {
        state.loading = false;
        state.bfComment = action.payload;
      })
      .addCase(updateBFComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBFComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBFComment.fulfilled, (state, action) => {
        state.loading = false;
        state.bfComment = action.payload;
      })
      .addCase(deleteBFComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default miniCommentSlice.reducer;
