import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../Redux/AdminRedux/GetAllCategoryAdminSlice";
import { DeleteApiCategoryId } from "../../../Redux/AdminRedux/DeleteCategoryAdminSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditApiCategoryId } from "../../../Redux/AdminRedux/EditCategoryAdminSlice";

const GetAllCategoryAdmin = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editMode, seteditMode] = useState(null);
  const itemsPerPage = 18;

  // Get Category
  const { Categorys, IsLoding, IsError } = useSelector(
    (state) => state.AllCategorys
  );

  // Delete Category
  const { IsLoding: isLoadingDelete, IsError: isErrorDelete } = useSelector(
    (state) => state.deleteCategoryMessage
  );

  // Edit Category
  const {  IsError: isErrorEdit } = useSelector(
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
      <h2 className="fw-bold mb-4 text-primary fs-4">📁 All Categories</h2>
      <div className="row g-3">
        {currentItems.length > 0 ? (
          currentItems.map((cat, index) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              key={index}
              onClick={() => handleItemClick(cat)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 shadow-sm p-1 border-0">
                <img
                  src={cat.image?.url}
                  className="card-img-top"
                  alt={cat.name}
                  style={{
                    height: "100px",
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <div className="card-body p-2 text-center">
                  <h6
                    className="card-title fw-semibold mb-0"
                    style={{ fontSize: "14px" }}
                  >
                    {cat.name}
                  </h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">لا توجد تصنيفات بعد.</p>
        )}
      </div>

      {/* Pagination Controls */}
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

      {/* ✅ Modal */}
      {selectedCategory && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">إدارة التصنيف</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>
                  هل تريد تعديل أو حذف التصنيف:{" "}
                  <strong>{selectedCategory.name}</strong>؟
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

      {/* edit category */}
      {editMode && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">تعديل التصنيف</h5>
                <button
                  type="button"
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
                        (value &&
                          ["image/jpeg", "image/jpg", "image/png"].includes(
                            value.type
                          ))
                    ),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const formData = new FormData();
                    formData.append("name", values.name);
                    if (values.image) {
                      formData.append("image", values.image);
                    }

                    let resolt = await dispatch(
                      EditApiCategoryId({
                        Categoryid: selectedCategory._id,
                        name: values.name,
                        image: values.image,
                      })
                    ).unwrap();

                    toast.success(resolt?.message || "تم التعديل بنجاح");
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
                          onChange={(e) => {
                            setFieldValue("image", e.currentTarget.files[0]);
                          }}
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
