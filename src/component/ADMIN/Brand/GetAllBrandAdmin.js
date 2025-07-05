import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../../Redux/UserRedux/BrandSlice";
import { DeleteApiBrandId } from "../../../Redux/AdminRedux/DeleteBrandAdminSlice";
import { EditApiBrandId } from "../../../Redux/AdminRedux/EditBrandAdminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GetAllBrandsAdmin = () => {
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // يرجع صفحة للخلف
  };

  // get Brand
  const { Brands, IsLoding, IsError } = useSelector(({ Brand }) => Brand);

  // Delete Brand
  const { IsLoding: isDeleting, IsError: deleteError } = useSelector(
    ({ DeleteBrand }) => DeleteBrand
  );

  // Edit Brand
  const { IsError: editError } = useSelector(
    ({ EditBrandAdmin }) => EditBrandAdmin
  );

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleCardClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCloseModal = () => {
    setSelectedBrand(null);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!selectedBrand?._id) return;
    console.log(selectedBrand._id);
    try {
      const result = await dispatch(
        DeleteApiBrandId(selectedBrand._id)
      ).unwrap();
      toast.success(result?.message || "تم الحذف بنجاح");
      dispatch(getBrand());
      setSelectedBrand(null);
    } catch (error) {
      toast.error(error || "حدث خطأ أثناء الحذف");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  // حالات التحميل / الأخطاء
  if (IsLoding)
    return (
      <div className="loader-overlay">
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    );

  if (IsError || deleteError || editError)
    return (
      <div className="text-danger text-center">حدث خطأ في تحميل البيانات</div>
    );

  return (
    <div className="container py-4">
      {/* زر الرجوع */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
          ← back
        </button>
        <h2 className="fw-bold text-primary fs-4 m-0">🏷️ جميع البراندات</h2>
      </div>

      {/* قائمة البراندات */}
      <div className="row g-3">
        {Brands?.map((brand) => (
          <div
            className="col-6 col-sm-4 col-md-3 col-lg-2"
            key={brand._id}
            onClick={() => handleCardClick(brand)}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 shadow-sm border-0 brand-card text-center p-2">
              <img
                src={brand.image?.url}
                alt={brand.name}
                className="img-fluid mb-2"
                style={{
                  height: "100px",
                  objectFit: "contain",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                }}
              />
              <h6 className="fw-semibold text-dark">{brand.name}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal إدارة البراند */}
      {selectedBrand && !editMode && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">إدارة البراند</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>
                  هل تريد تعديل أو حذف البراند:{" "}
                  <strong>{selectedBrand.name}</strong>؟
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  إلغاء
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "جاري الحذف..." : "حذف"}
                </button>
                <button className="btn btn-warning" onClick={handleEdit}>
                  تعديل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal تعديل البراند */}
      {editMode && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">تعديل البراند</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <Formik
                initialValues={{
                  name: selectedBrand.name || "",
                  image: null,
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .required("اسم البراند مطلوب")
                    .min(2, "يجب أن يحتوي على حرفين على الأقل"),
                  image: Yup.mixed()
                    .nullable()
                    .test(
                      "fileType",
                      "يجب أن تكون الصورة (jpg, jpeg, png)",
                      (value) =>
                        !value ||
                        ["image/jpeg", "image/jpg", "image/png"].includes(
                          value.type
                        )
                    ),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const result = await dispatch(
                      EditApiBrandId({
                        BrandId: selectedBrand._id,
                        name: values.name,
                        image: values.image,
                      })
                    ).unwrap();

                    toast.success(result?.message || "تم التعديل بنجاح");
                    dispatch(getBrand());
                    setEditMode(false);
                    setSelectedBrand(null);
                    resetForm();
                  } catch (error) {
                    toast.error(error || "حدث خطأ أثناء التعديل");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">اسم البراند</label>
                        <Field name="name" className="form-control" />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">الصورة (اختياري)</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) =>
                            setFieldValue("image", e.currentTarget.files[0])
                          }
                        />
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllBrandsAdmin;
