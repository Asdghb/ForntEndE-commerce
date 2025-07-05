import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export const GetAllOrder = createAsyncThunk("Order/GetAllOrder", async () => {
  const headers = {
    token: `Route__${localStorage.getItem("UserToken")}`,
  };
  try {
    const response = await axios.get(`${UrlProgect}/Order/GetAllOrder`, {
      headers,
    });
    console.log(response?.data?.AllOrder);
    return response?.data?.AllOrder;
  } catch (err) {
    console.error("خطأ أثناء جلب الطلبات:", err);
    throw err;
  }
});

const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    AllOrders: [],
    IsLoading: false,
    IsError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllOrder.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
      })
      .addCase(GetAllOrder.fulfilled, (state, action) => {
        state.AllOrders = action.payload;
        state.IsLoading = false;
        state.IsError = null;
      })
      .addCase(GetAllOrder.rejected, (state, action) => {
        state.IsLoading = false;
        state.AllOrders = [];
        state.IsError = action.payload || "حدث خطأ أثناء جلب الطلبات";
      });
  },
});

export let initialStateOrderSliceAdmin = OrderSlice.reducer;
