import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetOrder = createAsyncThunk("Order/GetOrder", async () => {
  const headers = {
    token: `Route__${localStorage.getItem("UserToken")}`,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/Order/GetAllOrderUser",
      { headers }
    );
    return response?.data?.orders;
  } catch (err) {
    console.error("خطأ أثناء جلب الطلبات:", err);
    throw err;
  }
});

const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    orders: [],
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(GetOrder.pending, (state, action) => {
      state.IsLoding = true;
    });
    builder.addCase(GetOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.IsLoding = false;
    });
  },
});

export let initialStateOrderSlice = OrderSlice.reducer;
