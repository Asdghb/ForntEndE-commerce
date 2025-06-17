import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const DeleteApiCategoryId = createAsyncThunk(
  "DeleteCategoryId/DeleteApiCategoryId",
  async (Categoryid, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
      };
      const { data } = await axios.delete(
        `${UrlProgect}/category/${Categoryid}`,
        { headers }
      );
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ غير متوقع"
      );
    }
  }
);

export const DeleteIdCategoryAdmin = createSlice({
  name: "DeleteCategoryId",
  initialState: {
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (ele) => {
    ele.addCase(DeleteApiCategoryId.pending, (state, action) => {
      state.IsLoding = true;
    });
    ele.addCase(DeleteApiCategoryId.fulfilled, (state, action) => {
      state.IsLoding = false;
    });
    ele.addCase(DeleteApiCategoryId.rejected, (state, action) => {
      state.IsLoding = false;
      state.IsError = action.payload;
    });
  },
});

export const initialStateDeleteIdCategoryAdmin = DeleteIdCategoryAdmin.reducer;
