import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API } from './api';

export const fetchRequestsByReceiver = createAsyncThunk(
  'firend/fetchRequestsByReceiver',
  async ({ userId, thunkAPI }) => {
    try {
      const response = await API.get(`/friendRequests?receiver=${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchRequestsBySender = createAsyncThunk(
  'firend/etchRequestsBySender',
  async ({ userId, thunkAPI }) => {
    try {
      const response = await API.get(`/friendRequests?sender=${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchRequest = createAsyncThunk(
  'firend/fetchRequest',
  async ({ requestId, thunkAPI }) => {
    try {
      const response = await API.get(`/friendRequests/${requestId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createRequest = createAsyncThunk(
  'firend/createRequest',
  async ({ requestData, thunkAPI }) => {
    try {
      const response = await API.post('/friendRequests', requestData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friend: [],
    request: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //     fetchRequestsByReceiver
    // fetchRequestsBySender
    // fetchRequest
    // createRequest
    builder
      .addCase(fetchRequestsByReceiver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestsByReceiver.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(fetchRequestsByReceiver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRequestsBySender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestsBySender.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(fetchRequestsBySender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.request.push(action.payload);
      });
  },
});

export default friendSlice.reducer;
