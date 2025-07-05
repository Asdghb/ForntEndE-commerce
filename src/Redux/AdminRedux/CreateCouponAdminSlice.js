import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const CreateCoupon = createAsyncThunk(
  "Coupon/CreateCoupon",
  async ({ discount, expiredAt }, thunkAPI) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "application/json",
      };
      const body = {
        discount,
        expiredAt,
      };

      const { data } = await axios.post(`${UrlProgect}/Coupon`, body, {
        headers,
      });

      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "حدث خطأ غير متوقع"
      );
    }
  }
);

const CouponSlice = createSlice({
  name: "Coupon",
  initialState: {
    IsLoading: false,
    IsError: null,
    SuccessMessage: null,
  },
  reducers: {
    resetCouponState: (state) => {
      state.IsLoading = false;
      state.IsError = null;
      state.SuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateCoupon.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
        state.SuccessMessage = null;
      })
      .addCase(CreateCoupon.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.SuccessMessage = action.payload;
      })
      .addCase(CreateCoupon.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = action.payload;
      });
  },
});

export const { resetCouponState } = CouponSlice.actions;
export const initialStateCouponData = CouponSlice.reducer;
