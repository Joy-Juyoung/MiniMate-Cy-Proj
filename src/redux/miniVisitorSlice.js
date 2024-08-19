import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const fetchVisitorBook = createAsyncThunk(
  "miniVisitor/fetchVisitorBook",
  async ({ miniHomeId, thunkAPI }) => {
    try {
      const response = await API.get(`/guestBook?miniHome=${miniHomeId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createVisitorBook = createAsyncThunk(
  "miniVisitor/createVisitorBook",
  async ({ miniHome, friendId, content, thunkAPI }) => {
    try {
      const response = await API.post(`/guestBook`, {
        miniHome,
        friendId,
        content,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateVisitorBook = createAsyncThunk(
  "miniVisitor/updateVisitorBook",
  async ({ bookId, privacy_scope, content, thunkAPI }) => {
    try {
      const response = await API.patch(`/guestBook/${bookId}`, {
        privacy_scope,
        content,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteVisitorBook = createAsyncThunk(
  "minVisitor/deleteVisitorBook",
  async ({ bookId, thunkAPI }) => {
    try {
      const response = await API.delete(`/guestBook/${bookId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// comment

export const createBookComment = createAsyncThunk(
  "miniVisitor/createBookComment",
  async ({ bookId, friendId, text, thunkAPI }) => {
    try {
      const response = await API.post(`/guestBook/${bookId}/comment`, {
        friendId,
        text,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBookComment = createAsyncThunk(
  "miniVisitor/updateBookComment",
  async ({ bookId, commentId, text, thunkAPI }) => {
    try {
      const response = await API.patch(
        `/guestBook/${bookId}/comment/${commentId}`,
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

export const deleteBookComment = createAsyncThunk(
  "minVisitor/deleteBookComment",
  async ({ bookId, commentId, thunkAPI }) => {
    try {
      const response = await API.delete(
        `/guestBook/${bookId}/comment/${commentId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const miniVisitorSlice = createSlice({
  name: "miniVisitor",
  initialState: {
    book: null,
    bookComment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitorBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitorBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchVisitorBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createVisitorBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVisitorBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(createVisitorBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateVisitorBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVisitorBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(updateVisitorBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteVisitorBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVisitorBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(deleteVisitorBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // comment
      .addCase(createBookComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookComment.fulfilled, (state, action) => {
        state.loading = false;
        state.bookComment = action.payload;
      })
      .addCase(createBookComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBookComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookComment.fulfilled, (state, action) => {
        state.loading = false;
        state.bookComment = action.payload;
      })
      .addCase(updateBookComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBookComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookComment.fulfilled, (state, action) => {
        state.loading = false;
        state.bookComment = action.payload;
      })
      .addCase(deleteBookComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default miniVisitorSlice.reducer;
