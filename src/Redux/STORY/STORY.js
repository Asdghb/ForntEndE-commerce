import { configureStore } from "@reduxjs/toolkit";
import { initialStateDataCount } from "../CounterSlice";
import { initialStateBrandData } from "../UserRedux/BrandSlice";
import { initialStateOrderSlice } from "../UserRedux/OrderSlice";
import { initialStateCategoryData } from "../AdminRedux/CreateCategoryAdminSlice";
import { initialStateGetCategoryData } from "../AdminRedux/GetAllCategoryAdminSlice";
import { initialStateDeleteIdCategoryAdmin } from "../AdminRedux/DeleteCategoryAdminSlice";
import { initialStateEditIdCategoryAdmin } from "../AdminRedux/EditCategoryAdminSlice";

let STORY = configureStore({
  reducer: {
    Counter: initialStateDataCount,
    Brand: initialStateBrandData,
    Order: initialStateOrderSlice,
    CreateCategory: initialStateCategoryData,
    AllCategorys:initialStateGetCategoryData,
    deleteCategoryMessage:initialStateDeleteIdCategoryAdmin,
    EditCategoryError:initialStateEditIdCategoryAdmin,
  },
});

export default STORY;
