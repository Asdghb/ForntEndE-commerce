import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export let getCategory = createAsyncThunk(
  "Brand/getCategory",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${UrlProgect}/category/`);
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء جلب التصنيفات"
      );
    }
  }
);

let AllCategorySlice = createSlice({
  name: "Category",
  initialState: {
    Categorys: [],
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.IsLoding = true;
      state.IsError = null;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.Categorys = action.payload;
      state.IsLoding = false;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.IsLoding = false;
      state.IsError = action.payload;
    });
  },
});

export let initialStateGetCategoryData = AllCategorySlice.reducer;
