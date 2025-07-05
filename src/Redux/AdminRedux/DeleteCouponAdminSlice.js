import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const DeleteApiCouponId = createAsyncThunk(
  "DeleteCouponId/DeleteApiCouponId",
  async (couponName, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
      };
      const { data } = await axios.delete(
        `${UrlProgect}/Coupon/${couponName}`,
        { headers }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ غير متوقع"
      );
    }
  }
);

const DeleteIdCouponAdmin = createSlice({
  name: "DeleteCouponId",
  initialState: {
    IsErrorDelete: null,
    IsMessageDeleted: null,
  },
  reducers: {
    resetCouponState: (state) => {
      state.IsErrorDelete = null;
      state.IsMessageDeleted = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeleteApiCouponId.pending, (state) => {
      })
      .addCase(DeleteApiCouponId.fulfilled, (state, action) => {
        state.IsMessageDeleted = action.payload;
      })
      .addCase(DeleteApiCouponId.rejected, (state, action) => {
        state.IsErrorDelete = action.payload;
      });
  },
});

export const { resetCouponState } = DeleteIdCouponAdmin.actions;
export const initialStateDeleteIdCouponAdmin = DeleteIdCouponAdmin.reducer;
