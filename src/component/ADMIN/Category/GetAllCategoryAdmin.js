import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../Redux/AdminRedux/GetAllCategoryAdminSlice";
import { EditApiCategoryId } from "../../../Redux/AdminRedux/EditCategoryAdminSlice";
import { DeleteApiCategoryId } from "../../../Redux/AdminRedux/DeleteCategoryAdminSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const GetAllCategoryAdmin = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editMode, seteditMode] = useState(null);
  const itemsPerPage = 18;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Get Category
  const { Categorys, IsLoding, IsError } = useSelector(
    (state) => state.AllCategorys
  );

  console.log( "Categorys :",Categorys)

  // Delete Category
  const { IsLoding: isLoadingDelete, IsError: isErrorDelete } = useSelector(
    (state) => state.deleteCategoryMessage
  );

  // Edit Category
  const { IsError: isErrorEdit } = useSelector(
    (state) => state.EditCategoryError
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const totalPages = Math.ceil(Categorys.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Categorys.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleItemClick = (cat) => {
    setSelectedCategory(cat);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleDelete = async () => {
    if (!selectedCategory?._id) return;
    try {
      const result = await dispatch(
        DeleteApiCategoryId(selectedCategory._id)
      ).unwrap();
      dispatch(getCategory());
      setCurrentPage(1);
      console.log(result?.message);
      toast.success(result?.message);
      setSelectedCategory(null);
    } catch (error) {
      toast.error(error || "حدث خطأ أثناء الحذف");
    }
  };

  const handleEdit = () => {
    console.log(selectedCategory._id);
    seteditMode(true);
  };

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

  if (IsError)
    return (
      <h4 className="text-danger text-center">
        {IsError || "حذث خطاء غير متوقع"}
      </h4>
    );

  if (isErrorEdit)
    return (
      <h4 className="text-danger text-center">
        {isErrorEdit || "حذث خطاء غير متوقع"}
      </h4>
    );

  if (isErrorDelete)
    return (
      <h4 className="text-danger text-center">
        {isErrorDelete || "حذث خطاء غير متوقع"}
      </h4>
    );

  return (
    <div className="container py-4">
      {/* رأس الصفحة */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
          ← back
        </button>
        <h2 className="fw-bold text-primary fs-4 m-0">📁 جميع التصنيفات</h2>
      </div>

      {/* عرض التصنيفات */}
      <div className="row g-3">
        {currentItems.length > 0 ? (
          currentItems.map((cat, index) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              key={index}
              onClick={() => handleItemClick(cat)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 shadow-sm p-2 border-0 text-center">
                <img
                  src={cat.image?.url}
                  alt={cat.name}
                  className="img-fluid mb-2"
                  style={{
                    height: "100px",
                    objectFit: "contain",
                    background: "#f8f9fa",
                    borderRadius: "10px",
                  }}
                />
                <h6
                  className="fw-semibold text-dark"
                  style={{ fontSize: "14px" }}
                >
                  {cat.name}
                </h6>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">لا توجد تصنيفات بعد.</p>
        )}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            className="btn btn-dark btn-sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            السابق
          </button>
          <span className="fw-bold">
            الصفحة {currentPage} من {totalPages}
          </span>
          <button
            className="btn btn-dark btn-sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>
      )}

      {/* ✅ Modal حذف/تعديل */}
      {selectedCategory && !editMode && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">إدارة التصنيف</h5>
                <button
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>
                  هل تريد تعديل أو حذف التصنيف:{" "}
                  <strong>{selectedCategory.name}</strong>؟
                  <p><h5>id Category:</h5>{selectedCategory.id}</p>
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
                  disabled={isLoadingDelete}
                >
                  {isLoadingDelete ? "جاري الحذف..." : "حذف"}
                </button>
                <button className="btn btn-warning" onClick={handleEdit}>
                  تعديل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal التعديل */}
      {editMode && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">تعديل التصنيف</h5>
                <button
                  className="btn-close"
                  onClick={() => seteditMode(false)}
                ></button>
              </div>
              <Formik
                initialValues={{
                  name: selectedCategory?.name || "",
                  image: null,
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .required("اسم التصنيف مطلوب")
                    .min(2, "يجب أن يحتوي على حرفين على الأقل"),
                  image: Yup.mixed()
                    .nullable()
                    .test(
                      "fileType",
                      "يجب أن تكون الصورة (jpg, jpeg, png)",
                      (value) =>
                        !value ||
                        ["image/jpeg", "image/jpg", "image/png"].includes(
                          value?.type
                        )
                    ),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const result = await dispatch(
                      EditApiCategoryId({
                        Categoryid: selectedCategory._id,
                        name: values.name,
                        image: values.image,
                      })
                    ).unwrap();

                    toast.success(result?.message || "تم التعديل بنجاح");
                    dispatch(getCategory());
                    seteditMode(false);
                    setSelectedCategory(null);
                    resetForm();
                  } catch (err) {
                    toast.error(err || "حدث خطأ أثناء التعديل");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">اسم التصنيف</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="أدخل اسم التصنيف"
                        />
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
                        onClick={() => seteditMode(false)}
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "جاري التعديل..." : "حفظ التعديلات"}
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

export default GetAllCategoryAdmin;
