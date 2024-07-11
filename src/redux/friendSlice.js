import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

// export const fetchRequestByUser = createAsyncThunk(
//   "friend/fetchRequestByUser",
//   async ({ userId, thunkAPI }) => {
//     try {
//       const response = await API.get(`/friendRequests?receiver=${userId}`);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchRequestsByReceiver = createAsyncThunk(
  "friend/fetchRequestsByReceiver",
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
  "friend/etchRequestsBySender",
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
  "friend/fetchRequest",
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
  "friend/createRequest",
  async ({ requestData, thunkAPI }) => {
    try {
      const response = await API.post("/friendRequests", requestData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "friend/acceptRequest",
  async ({ accepter, requestId }, thunkAPI) => {
    try {
      const response = await API.patch(`/friendRequests/accept/${requestId}`, {
        accepter,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "friend/deleteRequest",
  async ({ requestId, thunkAPI }) => {
    try {
      const response = await API.delete(`/friendRequests/${requestId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    friend: [],
    receive: [],
    send: [],
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
        state.receive = action.payload;
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
        state.send = action.payload;
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
        state.friend = action.payload;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.request = action.payload;
        state.loading = false;
      })
      .addCase(acceptRequest.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friend = action.payload;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friend = action.payload;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default friendSlice.reducer;
