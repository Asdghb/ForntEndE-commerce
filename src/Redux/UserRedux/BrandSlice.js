import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

export let getBrand = createAsyncThunk("Brand/getBrand", async () => {
  let { data } = await axios.get(`${UrlProgect}/Brand/`).catch((err) => err);
  console.log(data.results);
  return data.results;
});

let BrandSlice = createSlice({
  name: "Brand",
  initialState: {
    Brands: [],
    IsLoding: false,
    IsError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getBrand.pending, (state, action) => {
      state.IsLoding = true;
    });
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.Brands = action.payload;
      state.IsLoding = false;
    });
  },
});

export let initialStateBrandData = BrandSlice.reducer;
