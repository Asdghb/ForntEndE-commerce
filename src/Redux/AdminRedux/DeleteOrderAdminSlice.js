import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const UrlProgect = process.env.REACT_APP_API_URL;

// إرسال PATCH بدون بيانات
export const PatchOrderById = createAsyncThunk(
  "PatchOrder/PatchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
      };
      const { data } = await axios.patch(
        `${UrlProgect}/Order/${orderId}`,
        {}, 
        { headers }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء تعديل الطلب"
      );
    }
  }
);

export const DeleteOrderAdminSlice = createSlice({
  name: "PatchOrder",
  initialState: {
    isLoading: false,
    isError: null,
    message: null,
    currentUpdatingId: null,
  },
  reducers: {
    clearPatchOrderMessage: (state) => {
      state.message = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PatchOrderById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
        state.message = null;
        state.currentUpdatingId = action.meta.arg;
      })
      .addCase(PatchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.currentUpdatingId = null;
      })
      .addCase(PatchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = null;
        state.currentUpdatingId = null;
      });
  },
});

export const { clearPatchOrderMessage } = DeleteOrderAdminSlice.actions;
export const DeleteOrderReducer = DeleteOrderAdminSlice.reducer;
