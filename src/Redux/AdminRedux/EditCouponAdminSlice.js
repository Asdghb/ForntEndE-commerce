import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProject = process.env.REACT_APP_API_URL;
// ✅ Thunk لتعديل الكوبون
export const EditCouponApi = createAsyncThunk(
  "EditCoupon/EditCouponApi",
  async ({ couponName, discount, expiredAt }, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "application/json",
      };

      const body = {
        discount,
        expiredAt,
      };

      const { data } = await axios.patch(
        `${UrlProject}/Coupon/${couponName}`,
        body,
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
// ✅ Slice لتعديل الكوبون
const EditCouponSlice = createSlice({
  name: "EditCoupon",
  initialState: {
    IsLoading: false,
    IsError: null,
    SuccessMessage: null,
  },
  reducers: {
    resetEditCouponState: (state) => {
      state.IsLoading = false;
      state.IsError = null;
      state.SuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EditCouponApi.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
        state.SuccessMessage = null;
      })
      .addCase(EditCouponApi.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.SuccessMessage = action.payload;
      })
      .addCase(EditCouponApi.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = action.payload;
      });
  },
});
export const { resetEditCouponState } = EditCouponSlice.actions;
export const initialStateEditCoupon = EditCouponSlice.reducer;
