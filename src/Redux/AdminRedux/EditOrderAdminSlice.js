import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const UrlProject = process.env.REACT_APP_API_URL;

// ✅ Thunk لتعديل حالة الطلب
export const EditOrderStatusApi = createAsyncThunk(
  "EditOrder/EditOrderStatusApi",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const headers = {
        token: `Route__${localStorage.getItem("UserToken")}`,
        "Content-Type": "application/json",
      };

      const body = { status };

      const { data } = await axios.put(
        `${UrlProject}/Order/UpdateSingleOrder/${orderId}`,
        body,
        { headers }
      );

      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء تعديل الطلب"
      );
    }
  }
);

// ✅ Slice لتعديل الطلب
const EditOrderStatusSlice = createSlice({
  name: "EditOrder",
  initialState: {
    IsLoading: false,
    IsError: null,
    SuccessMessage: null,
  },
  reducers: {
    resetEditOrderStatus: (state) => {
      state.IsLoading = false;
      state.IsError = null;
      state.SuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EditOrderStatusApi.pending, (state) => {
        state.IsLoading = true;
        state.IsError = null;
        state.SuccessMessage = null;
      })
      .addCase(EditOrderStatusApi.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.SuccessMessage = action.payload;
      })
      .addCase(EditOrderStatusApi.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = action.payload;
      });
  },
});

export const { resetEditOrderStatus } = EditOrderStatusSlice.actions;
export const initialStateEditOrderStatus = EditOrderStatusSlice.reducer;
