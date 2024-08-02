import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const createMiniItems = createAsyncThunk(
  "miniItem/createMiniItems",
  async ({
    miniHomeId,
    miniItemData,
    // img_url,
    // category,
    // item_name,
    // x_location,
    // y_location,
    // enable,
    thunkAPI,
  }) => {
    try {
      const response = await API.post(`/miniHome/${miniHomeId}/item`, {
        miniItemData,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMiniItems = createAsyncThunk(
  "miniItem/updateMiniItems",
  async ({ miniHomeId, itemId, x_location, enable, thunkAPI }) => {
    try {
      const response = await API.patch(
        `/miniHome/${miniHomeId}/bestFriendComment/${itemId}`,
        {
          x_location,
          enable,
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteMiniItems = createAsyncThunk(
  "miniItem/deleteMiniItems",
  async ({ miniHomeId, itemId, thunkAPI }) => {
    try {
      const response = await API.delete(
        `/miniHome/${miniHomeId}/bestFriendComment/${itemId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const miniItemSlice = createSlice({
  name: "miniItem",
  initialState: {
    miniItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMiniItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMiniItems.fulfilled, (state, action) => {
        state.loading = false;
        state.miniItems = action.payload;
      })
      .addCase(createMiniItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMiniItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMiniItems.fulfilled, (state, action) => {
        state.loading = false;
        state.miniItems = action.payload;
      })
      .addCase(updateMiniItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMiniItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMiniItems.fulfilled, (state, action) => {
        state.loading = false;
        state.miniItems = action.payload;
      })
      .addCase(deleteMiniItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default miniItemSlice.reducer;
