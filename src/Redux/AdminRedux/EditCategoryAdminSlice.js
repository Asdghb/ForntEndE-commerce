import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const EditApiCategoryId = createAsyncThunk(
  "EditCategoryId/EditApiCategoryId",
  async ({ Categoryid, name, image }, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "multipart/form-data", 
      };

      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.patch(
        `${UrlProgect}/category/${Categoryid}`,
        formData,
        { headers }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ غير متوقع"
      );
    }
  }
);

export const EditIdCategoryAdmin = createSlice({
  name: "EditCategoryId",
  initialState: {
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (ele) => {
    ele.addCase(EditApiCategoryId.pending, (state, action) => {
      state.IsLoding = true;
    });
    ele.addCase(EditApiCategoryId.fulfilled, (state, action) => {
      state.IsLoding = false;
    });
    ele.addCase(EditApiCategoryId.rejected, (state, action) => {
      state.IsLoding = false;
      state.IsError = action.payload;
      state.Message = null;
    });
  },
});

export const initialStateEditIdCategoryAdmin = EditIdCategoryAdmin.reducer;
