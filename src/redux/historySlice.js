import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { API } from "./api";

export const createHistory = createAsyncThunk(
  "history/createHistory",
  async ({ cartId, thunkAPI }) => {
    try {
      const response = await API.post("/histories", cartId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, thunkAPI) => {
    try {
      const response = await API.get(`/histories`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHistory.fulfilled, (state, action) => {
        state.history.push(action.payload);
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default historySlice.reducer;
