// Redux/AdminRedux/DeleteProductAdminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const UrlProgect = process.env.REACT_APP_API_URL;

export const DeleteApiproductId = createAsyncThunk(
  "DeleteproductId/DeleteApiproductId",
  async (productid, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
      };
      const { data } = await axios.delete(
        `${UrlProgect}/product/${productid}`,
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

export const DeleteIdproductAdmin = createSlice({
  name: "DeleteproductId",
  initialState: {
    IsLoding: false,
    IsError: null,
    message: null,
    currentDeletingId: null,
  },
  reducers: {
    clearDeleteProductMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeleteApiproductId.pending, (state, action) => {
        state.IsLoding = true;
        state.IsError = null;
        state.message = null;
        state.currentDeletingId = action.meta.arg;
      })
      .addCase(DeleteApiproductId.fulfilled, (state, action) => {
        state.IsLoding = false;
        state.IsError = null;
        state.message = action.payload.message;
        state.currentDeletingId = null;
      })
      .addCase(DeleteApiproductId.rejected, (state, action) => {
        state.IsLoding = false;
        state.IsError = action.payload;
        state.message = null;
        state.currentDeletingId = null;
      });
  },
});

export const { clearDeleteProductMessage } = DeleteIdproductAdmin.actions;
export const initialStateDeleteIdproductAdmin = DeleteIdproductAdmin.reducer;
