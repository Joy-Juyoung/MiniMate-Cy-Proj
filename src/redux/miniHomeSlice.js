// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API } from "./api";

// export const createMinihome = createAsyncThunk(
//   "miniHome/createMinihome",
//   async ({ ownerId, url, thunkAPI }) => {
//     try {
//       const response = await API.post("/shopItems", ownerId, url);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
