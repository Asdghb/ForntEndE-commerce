// Redux/AdminSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const CreateNewAdmin = createAsyncThunk(
  "admin/CreateNewAdmin",
  async ({ email, password }, thunkAPI) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${UrlProgect}/auth/NewCreateadmin`,
        { email, password },
        { headers }
      );

      return response.data?.message || "تم إنشاء الأدمن بنجاح";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء إنشاء الأدمن"
      );
    }
  }
);

// Redux/AdminSlice.js (تكملة)
const CreateAdminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    isError: null,
    successMessage: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateNewAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.successMessage = null;
      })
      .addCase(CreateNewAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(CreateNewAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { resetAdminState } = CreateAdminSlice.actions;
export const initialStateCreateAdminSlice = CreateAdminSlice.reducer;
