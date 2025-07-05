import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export let getProduct = createAsyncThunk("Product/getProduct", async () => {
  let { data } = await axios.get(`${UrlProgect}/Product/`).catch((err) => err);
  return data.results;
});

let ProductSlice = createSlice({
  name: "Product",
  initialState: {
    Products: [],
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      state.IsLoding = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.Products = action.payload;
      state.IsLoding = false;
    });
  },
});

export let initialStateGetProductData = ProductSlice.reducer;
