
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

// Redux/CategorySlice.js
export const CreateBrand = createAsyncThunk(
  "Brand/CreateBrand",
  async ({ name, image }, thunkAPI) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("name", name);
      formData.append("imageBrand", image);

      await axios.post(`${UrlProgect}/Brand`, formData, {
        headers,
      });

      return "تم إنشاء الفئة بنجاح";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux/BrandSlice.js
const BrandSlice = createSlice({
  name: "Brand",
  initialState: {
    IsLoading: false,
    IsError: null,
    SuccessMessage: null,
  },
  reducers: {
    resetBrandState: (state) => {
      state.IsLoading = false;
      state.IsError = null;
      state.SuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateBrand.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
        state.SuccessMessage = null;
      })
      .addCase(CreateBrand.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.SuccessMessage = "Create Brand Successfliy";
      })
      .addCase(CreateBrand.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = action.payload || "حدث خطأ أثناء إنشاء الفئة";
      });
  },
});

export const { resetBrandState } = BrandSlice.actions;
export const initialStateCreateBrandData = BrandSlice.reducer;
