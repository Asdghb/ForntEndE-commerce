import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProject = process.env.REACT_APP_API_URL;

export const getAllAdmins = createAsyncThunk(
  "admin/getAllAdmins",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get(`${UrlProject}/auth/GetAllAdmin`, {
        headers: {
          token: `Route__${token}`,
        },
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "فشل في تحميل الأدمنز"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const initialStateGetAdminSlice = adminSlice.reducer;
