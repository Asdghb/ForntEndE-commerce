import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Redux/CategorySlice.js
export const CreateCategory = createAsyncThunk(
  "Category/CreateCategory",
  async ({ name, image }, thunkAPI) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      await axios.post("http://localhost:3000/category", formData, {
        headers,
      });

      return "تم إنشاء الفئة بنجاح";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux/CategorySlice.js
const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    IsLoading: false,
    IsError: null,
    SuccessMessage: null,
  },
  reducers: {
    resetCategoryState: (state) => {
      state.IsLoading = false;
      state.IsError = null;
      state.SuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateCategory.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
        state.SuccessMessage = null;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.SuccessMessage = "Create Category Successfliy";
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = action.payload || "حدث خطأ أثناء إنشاء الفئة";
      });
  },
});

export const { resetCategoryState } = CategorySlice.actions;
export const initialStateCategoryData = CategorySlice.reducer;
