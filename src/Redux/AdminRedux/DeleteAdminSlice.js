// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// const UrlProject = process.env.REACT_APP_API_URL;

// // ✅ Delete Admin by ID
// export const deleteAdminById = createAsyncThunk(
//   "admin/deleteAdminById",
//   async (adminId, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("UserToken");

//       const { data } = await axios.patch(
//         `${UrlProject}/auth/DeleteSangleAdmin/${adminId}`,
//         {},
//         {
//           headers: {
//             token: `Route__${token}`,
//           },
//         }
//       );
//       return data.message || "تم حذف الأدمن بنجاح";
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "فشل في حذف الأدمن"
//       );
//     }
//   }
// );

// // ✅ Slice
// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     admins: [],
//     isLoading: false,
//     isError: null,
//     message: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(deleteAdminById.pending, (state) => {
//         state.isLoading = true;
//         state.message = null;
//         state.isError = null;
//       })
//       .addCase(deleteAdminById.fulfilled, (state, action) => {
//         // نجيب الـ ID من action.meta.arg
//         const deletedId = action.meta.arg;
//         // نحذف الأدمن من القائمة
//         state.admins = state.admins.filter((admin) => admin._id !== deletedId);
//         // نخزن رسالة النجاح
//         state.message = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(deleteAdminById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.payload;
//         state.message = null;
//       });
//   },
// });

// export const initialStatedeleteAdminSlice = adminSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UrlProject = process.env.REACT_APP_API_URL;

// ✅ Delete Admin by ID
export const deleteAdminById = createAsyncThunk(
  "admin/deleteAdminById",
  async (adminId, thunkAPI) => {
    try {
      const token = localStorage.getItem("UserToken");

      const { data } = await axios.patch(
        `${UrlProject}/auth/DeleteSangleAdmin/${adminId}`,
        {},
        {
          headers: {
            token: `Route__${token}`,
          },
        }
      );
      return data.message || "تم حذف الأدمن بنجاح";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "فشل في حذف الأدمن"
      );
    }
  }
);

// ✅ Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    isLoading: false,
    isError: null,
    message: null,
  },
  reducers: {
    // ✅ Reset action
    clearDeleteAdminState: (state) => {
      state.message = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAdminById.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.isError = null;
      })
      .addCase(deleteAdminById.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.admins = state.admins.filter((admin) => admin._id !== deletedId);
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteAdminById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = null;
      });
  },
});

export const { clearDeleteAdminState } = adminSlice.actions;
export const initialStatedeleteAdminSlice = adminSlice.reducer;
