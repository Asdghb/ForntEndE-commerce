import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProduct,
  resetProductState,
} from "../../../Redux/AdminRedux/CreatProductAdminSlice";
import { getCategory } from "../../../Redux/AdminRedux/GetAllCategoryAdminSlice";

const ProductForm = () => {
  const dispatch = useDispatch();

  // refs لحذف الملفات
  const defaultImageRef = useRef(null);
  const productImagesRef = useRef(null);

  // جلب الفئات
  const { Categorys } = useSelector((state) => state.AllCategorys);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // الحالة
  const { IsLoading, IsError, SuccessMessage } = useSelector(
    (state) => state.CreateProduct
  );

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      discount: 0,
      availableItems: "",
      categoryId: "",
      defaultImage: null,
      Productimages: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("مطلوب"),
      description: Yup.string().required("مطلوب"),
      price: Yup.number().required("مطلوب"),
      discount: Yup.number()
        .min(0, "لا يمكن أن يكون الخصم أقل من 0")
        .max(100, "الحد الأقصى للخصم هو 100")
        .nullable(),
      availableItems: Yup.number().required("مطلوب"),
      categoryId: Yup.string().required("اختر الفئة"),
      defaultImage: Yup.mixed().required("مطلوب"),
      Productimages: Yup.array().max(3, "يمكنك رفع 3 صور كحد أقصى"),
    }),
    onSubmit: (values) => {
      dispatch(CreateProduct(values));
    },
  });

  // معالجة الملفات
  const handleDefaultImageChange = (e) => {
    formik.setFieldValue("defaultImage", e.currentTarget.files[0]);
  };

  const handleProductImagesChange = (e) => {
    formik.setFieldValue("Productimages", Array.from(e.currentTarget.files));
  };

  // التوست والتفريغ بعد النجاح
  useEffect(() => {
    if (IsError) {
      toast.error(IsError.message || "حدث خطأ");
    }

    if (SuccessMessage) {
      toast.success(SuccessMessage);

      // 🧼 تفريغ الفورم
      formik.resetForm();

      // 🧼 تفريغ الصور
      if (defaultImageRef.current) defaultImageRef.current.value = "";
      if (productImagesRef.current) productImagesRef.current.value = "";

      // reset state
      dispatch(resetProductState());
    }
  }, [IsError, SuccessMessage, dispatch]);

  return (
    <form onSubmit={formik.handleSubmit} className="container mt-4">
      <div className="row gy-3">
        {/* الاسم */}
        <div className="col-md-6">
          <label className="form-label fw-bold">الاسم</label>
          <input
            type="text"
            className="form-control"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger small mt-1">{formik.errors.name}</div>
          )}
        </div>

        {/* الوصف */}
        <div className="col-md-6">
          <label className="form-label fw-bold">الوصف</label>
          <textarea
            className="form-control"
            rows="3"
            {...formik.getFieldProps("description")}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <div className="text-danger small mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* السعر */}
        <div className="col-md-4">
          <label className="form-label fw-bold">السعر</label>
          <input
            type="number"
            className="form-control"
            {...formik.getFieldProps("price")}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-danger small mt-1">{formik.errors.price}</div>
          )}
        </div>

        {/* الخصم */}
        <div className="col-md-4">
          <label className="form-label fw-bold">الخصم</label>
          <input
            type="number"
            className="form-control"
            {...formik.getFieldProps("discount")}
          />
          {formik.touched.discount && formik.errors.discount && (
            <div className="text-danger small mt-1">
              {formik.errors.discount}
            </div>
          )}
        </div>

        {/* الكمية */}
        <div className="col-md-4">
          <label className="form-label fw-bold">العدد المتاح</label>
          <input
            type="number"
            className="form-control"
            {...formik.getFieldProps("availableItems")}
          />
          {formik.touched.availableItems && formik.errors.availableItems && (
            <div className="text-danger small mt-1">
              {formik.errors.availableItems}
            </div>
          )}
        </div>

        {/* الصورة الرئيسية */}
        <div className="col-md-6">
          <label className="form-label fw-bold">الصورة الرئيسية</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleDefaultImageChange}
            ref={defaultImageRef}
          />
          {formik.errors.defaultImage && (
            <div className="text-danger small mt-1">
              {formik.errors.defaultImage}
            </div>
          )}
        </div>

        {/* صور إضافية */}
        <div className="col-md-6">
          <label className="form-label fw-bold">صور إضافية (حتى 3 صور)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleProductImagesChange}
            ref={productImagesRef}
          />
          {formik.errors.Productimages && (
            <div className="text-danger small mt-1">
              {formik.errors.Productimages}
            </div>
          )}
        </div>

        {/* الفئة */}
        <div className="col-12">
          <label className="form-label fw-bold">الفئة</label>
          <select
            className="form-control"
            {...formik.getFieldProps("categoryId")}
          >
            <option value="">اختر الفئة</option>
            {Categorys?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.errors.categoryId && (
            <div className="text-danger small mt-1">
              {formik.errors.categoryId}
            </div>
          )}
        </div>

        {/* زر الإنشاء */}
        <div className="col-12 text-center mt-4">
          <button
            type="submit"
            className="btn btn-success px-4"
            disabled={IsLoading}
          >
            {IsLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                جاري الإنشاء...
              </>
            ) : (
              "إنشاء المنتج"
            )}
          </button>
        </div>
        <hr></hr>
        <div className="col-12 text-center mt-3">
          <Link to="/admin/GetAllProductAdmin">
            <Button variant="outline-primary" className="px-4">
              All Product
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
