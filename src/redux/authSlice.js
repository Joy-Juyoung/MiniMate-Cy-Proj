import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./api";

export const signupUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await API.post("/users/signup", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await API.post("/users/login", userData);
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    localStorage.removeItem("token");
    return null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    fail: null,
    signupSuccess: false,
    loginSuccess: false,
    user: null,
    newUser: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
        state.signupSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupSuccess = true;
        state.newUser = action.payload.data.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = action.payload.message;
        state.fail = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
        state.loginSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginSuccess = false;
        state.error = action.payload.message;
        state.fail = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = false;
        state.signupSuccess = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
