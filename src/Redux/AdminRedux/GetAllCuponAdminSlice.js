import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export let getCoupon = createAsyncThunk(
  "Brand/getCoupon",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${UrlProgect}/Coupon/`);
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء جلب التصنيفات"
      );
    }
  }
);

let AllCouponSlice = createSlice({
  name: "Coupon",
  initialState: {
    Coupons: [],
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCoupon.pending, (state) => {
      state.IsLoding = true;
      state.IsError = null;
    });
    builder.addCase(getCoupon.fulfilled, (state, action) => {
      state.Coupons = action.payload;
      state.IsLoding = false;
    });
    builder.addCase(getCoupon.rejected, (state, action) => {
      state.IsLoding = false;
      state.IsError = action.payload;
    });
  },
});

export let initialStateGetCouponData = AllCouponSlice.reducer;
