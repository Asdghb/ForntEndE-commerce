import { configureStore } from "@reduxjs/toolkit";
import { initialStateDataCount } from "../CounterSlice";
import { initialStateBrandData } from "../UserRedux/BrandSlice";
import { initialStateOrderSlice } from "../UserRedux/OrderSlice";
import { initialStateCategoryData } from "../AdminRedux/CreateCategoryAdminSlice";
import { initialStateGetCategoryData } from "../AdminRedux/GetAllCategoryAdminSlice";
import { initialStateDeleteIdCategoryAdmin } from "../AdminRedux/DeleteCategoryAdminSlice";
import { initialStateEditIdCategoryAdmin } from "../AdminRedux/EditCategoryAdminSlice";
import { initialStateCreateBrandData } from "../AdminRedux/CreateBrandAdminSlice";
import { initialStateEditIdBrandAdmin } from "../AdminRedux/EditBrandAdminSlice";
import { initialStateDeleteIdBrandAdmin } from "../AdminRedux/DeleteBrandAdminSlice";
import { initialStateProductData } from "../AdminRedux/CreatProductAdminSlice";
import { initialStateGetProductData } from "../UserRedux/GetAllProductSlice";
import { initialStateDeleteIdproductAdmin } from "../AdminRedux/DeleteProductAdminSlice";
import { initialStateCouponData } from "../AdminRedux/CreateCouponAdminSlice";
import { initialStateGetCouponData } from "../AdminRedux/GetAllCuponAdminSlice";
import { initialStateDeleteIdCouponAdmin } from "../AdminRedux/DeleteCouponAdminSlice";
import { initialStateEditCoupon } from "../AdminRedux/EditCouponAdminSlice";
import { initialStateOrderSliceAdmin } from "../AdminRedux/GetAllOrderAdminSlice";
import { DeleteOrderReducer } from "../AdminRedux/DeleteOrderAdminSlice";
import { initialStateEditOrderStatus } from "../AdminRedux/EditOrderAdminSlice";
import { initialStateCreateAdminSlice } from "../AdminRedux/CreateNewAdminSlice";
import { initialStateGetAdminSlice } from "../AdminRedux/GetAllAdminSlice";
import { initialStatedeleteAdminSlice } from "../AdminRedux/DeleteAdminSlice";

let STORY = configureStore({
  reducer: {
    Counter: initialStateDataCount,
    Brand: initialStateBrandData,
    Order: initialStateOrderSlice,
    CreateCategory: initialStateCategoryData,
    AllCategorys: initialStateGetCategoryData,
    deleteCategoryMessage: initialStateDeleteIdCategoryAdmin,
    EditCategoryError: initialStateEditIdCategoryAdmin,
    CreateBrand: initialStateCreateBrandData,
    EditBrandAdmin: initialStateEditIdBrandAdmin,
    DeleteBrand: initialStateDeleteIdBrandAdmin,
    CreateProduct: initialStateProductData,
    GetAllProducts: initialStateGetProductData,
    DeleteProductId: initialStateDeleteIdproductAdmin,
    Coupon: initialStateCouponData,
    GetAllCoupon: initialStateGetCouponData,
    DeleteCoupon: initialStateDeleteIdCouponAdmin,
    EditCoupon: initialStateEditCoupon,
    GetALLOrdersAdmin: initialStateOrderSliceAdmin,
    DeleteOrderId: DeleteOrderReducer,
    EditOrderSingle: initialStateEditOrderStatus,
    CreateAdmin: initialStateCreateAdminSlice,
    GetAllAdmin: initialStateGetAdminSlice,
    DeleteAdmin: initialStatedeleteAdminSlice,
  },
});

export default STORY;
