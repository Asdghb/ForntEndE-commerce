import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getBrand = createAsyncThunk("Brand/getBrand", async () => {
  let { data } = await axios
    .get("http://localhost:3000/Brand/")
    .catch((err) => err);
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
