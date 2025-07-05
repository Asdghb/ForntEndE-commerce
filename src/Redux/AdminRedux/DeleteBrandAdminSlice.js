import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const DeleteApiBrandId = createAsyncThunk(
  "DeleteBrand/DeleteApiBrandId",
  async (BrandId, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
      };
      const { data } = await axios.delete(`${UrlProgect}/Brand/${BrandId}`, {
        headers,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ غير متوقع"
      );
    }
  }
);

export const DeleteIdBrandAdmin = createSlice({
  name: "DeleteBrandId",
  initialState: {
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (ele) => {
    ele.addCase(DeleteApiBrandId.pending, (state, action) => {
      state.IsLoding = true;
    });
    ele.addCase(DeleteApiBrandId.fulfilled, (state, action) => {
      state.IsLoding = false;
    });
    ele.addCase(DeleteApiBrandId.rejected, (state, action) => {
      state.IsLoding = false;
      state.IsError = action.payload;
    });
  },
});

export const initialStateDeleteIdBrandAdmin = DeleteIdBrandAdmin.reducer;
