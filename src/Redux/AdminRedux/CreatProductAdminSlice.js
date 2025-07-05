// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// const UrlProgect = process.env.REACT_APP_API_URL;
// export const CreateProduct = createAsyncThunk(
//   "Product/CreateProduct",
//   async (formValues, thunkAPI) => {
//     try {
//       const headers = {
//         token: `Route__${localStorage.getItem("UserToken")}`,
//         "Content-Type": "multipart/form-data",
//       };

//       const formData = new FormData();
//       formData.append("name", formValues.name);
//       formData.append("description", formValues.description);
//       formData.append("price", formValues.price);
//       formData.append("discount", formValues.discount);
//       formData.append("availableItems", formValues.availableItems);
//       formData.append("categoryId", formValues.categoryId);
//       formData.append("defaultImage", formValues.defaultImage);

//       // multiple images
//       formValues.Productimages.forEach((image) => {
//         formData.append("Productimages", image);
//       });

//       const { data } = await axios.post(`${UrlProgect}/Product`, formData, {
//         headers,
//       });

//       return data.message;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// const ProductSlice = createSlice({
//   name: "Product",
//   initialState: {
//     IsLoading: false,
//     IsError: null,
//     SuccessMessage: null,
//   },
//   reducers: {
//     resetProductState: (state) => {
//       state.IsLoading = false;
//       state.IsError = null;
//       state.SuccessMessage = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(CreateProduct.pending, (state) => {
//         state.IsLoading = true;
//         state.IsError = null;
//         state.SuccessMessage = null;
//       })
//       .addCase(CreateProduct.fulfilled, (state, action) => {
//         state.IsLoading = false;
//         state.SuccessMessage = action.payload;
//       })
//       .addCase(CreateProduct.rejected, (state, action) => {
//         state.IsLoading = false;
//         state.IsError = action.payload || "حدث خطأ أثناء إنشاء الفئة";
//       });
//        resetProductState: (state) => {
//       state.IsLoading = false;
//       state.IsError = null;
//       state.SuccessMessage = null;
//     },
//   },
// });
// export const initialStateProductData = ProductSlice.reducer;
// export const { resetProductState } = ProductSlice.actions;

// Redux/ProductSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UrlProgect = process.env.REACT_APP_API_URL;

// Async thunk لإنشاء منتج
export const CreateProduct = createAsyncThunk(
  "Product/CreateProduct",
  async (formValues, thunkAPI) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("price", formValues.price);
      formData.append("discount", formValues.discount);
      formData.append("availableItems", formValues.availableItems);
      formData.append("categoryId", formValues.categoryId);
      formData.append("defaultImage", formValues.defaultImage);

      formValues.Productimages.forEach((image) => {
        formData.append("Productimages", image);
      });

      const { data } = await axios.post(`${UrlProgect}/Product`, formData, {
        headers,
      });

      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const ProductSlice = createSlice({
  name: "CreateProduct",
  initialState: {
    IsLoading: false,
    IsError: null,
    SuccessMessage: null,
  },
  reducers: {
    resetProductState: (state) => {
      state.IsLoading = false;
      state.IsError = null;
      state.SuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateProduct.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
        state.SuccessMessage = null;
      })
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.SuccessMessage = "Sueccessfily Create Product";
      })
      .addCase(CreateProduct.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = action.payload;
      });
  },
});

// التصدير
export const { resetProductState } = ProductSlice.actions;
export const initialStateProductData = ProductSlice.reducer;
