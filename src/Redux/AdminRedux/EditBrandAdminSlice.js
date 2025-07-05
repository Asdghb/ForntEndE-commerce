import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const EditApiBrandId = createAsyncThunk(
  "EditBrandId/EditApiBrandId",
  async ({ BrandId, name, image }, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("imageBrand", image);
      }

      const { data } = await axios.patch(
        `${UrlProgect}/Brand/${BrandId}`,
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

export const EditIdBrandAdmin = createSlice({
  name: "EditBrandId",
  initialState: {
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (ele) => {
    ele.addCase(EditApiBrandId.pending, (state, action) => {
      state.IsLoding = true;
    });
    ele.addCase(EditApiBrandId.fulfilled, (state, action) => {
      state.IsLoding = false;
    });
    ele.addCase(EditApiBrandId.rejected, (state, action) => {
      state.IsLoding = false;
      state.IsError = action.payload;
    });
  },
});

export const initialStateEditIdBrandAdmin = EditIdBrandAdmin.reducer;
