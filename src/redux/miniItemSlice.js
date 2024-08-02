// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API } from "./api";

// export const createMinihome = createAsyncThunk(
//   "miniHome/createMinihome",
//   async ({ owner, url, thunkAPI }) => {
//     try {
//       const response = await API.post("/miniHome", { owner, url });
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchMinihome = createAsyncThunk(
//   "miniHome/fetchMinihome",
//   async ({ userId, thunkAPI }) => {
//     try {
//       const response = await API.get(`/miniHome/${userId}`);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchMinihomeByUsername = createAsyncThunk(
//   "miniHome/fetchMinihomeByUsername",
//   async ({ userId, thunkAPI }) => {
//     try {
//       const response = await API.get(`/miniHome/${userId}`);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// const miniItemSlice = createSlice({
//   name: "item",
//   initialState: {
//     miniItems: [],
//     loading: false,
//     error: null,
//     images: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createMinihome.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createMinihome.fulfilled, (state, action) => {
//         state.loading = false;
//         state.miniHome = action.payload;
//       })
//       .addCase(createMinihome.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchMinihome.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMinihome.fulfilled, (state, action) => {
//         state.loading = false;
//         state.miniHome = action.payload;
//       })
//       .addCase(fetchMinihome.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchMinihomeByUsername.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMinihomeByUsername.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userHome = action.payload;
//       })
//       .addCase(fetchMinihomeByUsername.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default miniItemSlice.reducer;
