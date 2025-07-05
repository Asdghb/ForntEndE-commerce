import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCategory,
  resetCategoryState,
} from "../../../Redux/AdminRedux/CreateCategoryAdminSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const dispatch = useDispatch();

  const { IsLoading, IsError, SuccessMessage } = useSelector(
    (state) => state.CreateCategory
  );

  useEffect(() => {
    if (SuccessMessage) {
      toast.success(SuccessMessage);
      dispatch(resetCategoryState());
    }
    if (IsError) {
      toast.error(IsError);
      dispatch(resetCategoryState());
    }
  }, [SuccessMessage, IsError, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم مطلوب"),
      image: Yup.mixed()
        .required("الصورة مطلوبة")
        .test(
          "fileSize",
          "حجم الصورة كبير جدًا",
          (value) => (value ? value.size <= 2 * 1024 * 1024 : false) // 2MB
        )
        .test("fileType", "نوع الملف غير مدعوم", (value) =>
          value ? ["image/jpeg", "image/png"].includes(value.type) : false
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(CreateCategory(values));
      resetForm();
    },
  });

  return (
    <div className="container py-4">
      <h2 className="mb-4"> Create Category </h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            className={`form-control ${
              formik.touched.image && formik.errors.image ? "is-invalid" : ""
            }`}
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="invalid-feedback">{formik.errors.image}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={IsLoading}>
          {IsLoading ? "جاري الإرسال..." : "Create Category"}
        </button>
      </form>
      <hr></hr>
      <div className="col-12 text-center mt-3">
        <Link to="/admin/GetAllCategoryAdmin">
          <Button variant="outline-primary" className="px-4">
            All Category
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
