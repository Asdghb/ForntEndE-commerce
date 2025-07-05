import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../../Redux/AdminRedux/GetAllCuponAdminSlice";
import {
  DeleteApiCouponId,
  resetCouponState,
} from "../../../Redux/AdminRedux/DeleteCouponAdminSlice";
import {
  EditCouponApi,
  resetEditCouponState,
} from "../../../Redux/AdminRedux/EditCouponAdminSlice";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GetAllCouponAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletingCouponName, setDeletingCouponName] = useState(null);
  const [showEditcomponan, setShowEditcomponan] = useState(false);
  const [editCouponData, setEditCouponData] = useState(null);

  // get all Coupons
  const { Coupons, IsLoding, IsError } = useSelector(
    (state) => state.GetAllCoupon
  );

  // Delete Coupon
  const { IsErrorDelete, IsMessageDeleted } = useSelector(
    (state) => state.DeleteCoupon
  );

// دى لو عايز يجيب البيانات لو حصل فيها تغير كل شوية من غير ريلود
//   useEffect(() => {
//   let previousCoupons = [];
//   const checkForUpdates = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/Coupon/`);
//       const latestCoupons = data.results;
//       const hasChanged =
//         previousCoupons.length !== latestCoupons.length ||
//         JSON.stringify(previousCoupons[0]) !== JSON.stringify(latestCoupons[0]);
//       if (hasChanged) {
//         previousCoupons = latestCoupons;
//         dispatch(getCoupon());
//       }
//     } catch (err) {
//       console.error("فشل التحقق من التحديثات:", err);
//     }
//   };
//   const intervalId = setInterval(checkForUpdates, 5000);
//   return () => clearInterval(intervalId);
// }, [dispatch]);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  useEffect(() => {
    if (IsMessageDeleted) {
      toast.success(IsMessageDeleted);
      setTimeout(() => dispatch(resetCouponState()), 2000);
    }
    if (IsErrorDelete) {
      toast.error(IsErrorDelete);
      setTimeout(() => dispatch(resetCouponState()), 2000);
    }
  }, [IsMessageDeleted, IsErrorDelete, dispatch]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async (couponName) => {
    setDeletingCouponName(couponName);
    const result = await dispatch(DeleteApiCouponId(couponName));
    if (DeleteApiCouponId.fulfilled.match(result)) {
      dispatch(getCoupon());
    }
    setDeletingCouponName(null);
  };

  const handleEdit = (couponName) => {
    const targetCoupon = Coupons.find((c) => c.name === couponName);
    if (targetCoupon) {
      setEditCouponData(targetCoupon);
      setShowEditcomponan(true);
    }
  };

  const {
    IsLoading: IsLoadingEdit,
    IsError: IsErrorEdit,
    SuccessMessage,
  } = useSelector((state) => state.EditCoupon);

  useEffect(() => {
    if (SuccessMessage) {
      toast.success(SuccessMessage);
      dispatch(resetEditCouponState());
      setShowEditcomponan(false);
      setEditCouponData(null);
      dispatch(getCoupon());
    }

    if (IsErrorEdit) {
      toast.error(IsErrorEdit);
      dispatch(resetEditCouponState());
    }
  }, [SuccessMessage, IsErrorEdit, dispatch]);

  const handleUpdate = async (values) => {
    dispatch(
      EditCouponApi({
        couponName: values.name,
        discount: values.discount,
        expiredAt: values.expiredAt,
      })
    );
  };

  return (
    <Container className="my-4">
      {/* نافذة تعديل */}
      {showEditcomponan && editCouponData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px 20px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            <button
              onClick={() => {
                setShowEditcomponan(false);
                setEditCouponData(null);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                border: "none",
                background: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>

            <h5 className="text-center mb-3">
              تعديل الكوبون ({editCouponData.name})
            </h5>

            <Formik
              initialValues={{
                discount: editCouponData.discount,
                expiredAt: new Date(editCouponData.expiredAt)
                  .toISOString()
                  .split("T")[0],
                name: editCouponData.name,
              }}
              validationSchema={Yup.object().shape({
                discount: Yup.number()
                  .required("مطلوب")
                  .min(1, "لا يمكن أن تقل عن 1%")
                  .max(100, "لا يمكن أن تزيد عن 100%"),
                expiredAt: Yup.string().required("تاريخ الانتهاء مطلوب"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                await handleUpdate(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <div className="mb-3">
                  <label className="form-label">نسبة الخصم</label>
                  <Field
                    type="number"
                    name="discount"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">تاريخ الانتهاء</label>
                  <Field
                    type="date"
                    name="expiredAt"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="expiredAt"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <Button type="submit" disabled={IsLoadingEdit}>
                    {IsLoadingEdit ? "جارٍ الحفظ..." : "حفظ التعديلات"}
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {/* رأس الصفحة */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
          ← back
        </button>
        <h2 className="fw-bold text-primary fs-4 m-0">قائمة الكوبونات</h2>
      </div>

      {/* تحميل أو عرض الكوبونات */}
      {IsLoding ? (
        <div className="loader-overlay">
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        </div>
      ) :
      //  IsError ? (
      //   <div className="alert alert-danger text-center">{IsError}</div>
      // ) :
       (
        <div className="table-responsive">
          <Table
            striped
            bordered
            hover
            className="text-center align-middle"
            style={{ minWidth: "900px" }}
          >
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>اسم الكوبون</th>
                <th>نسبة الخصم</th>
                <th>تاريخ الانتهاء</th>
                <th>تاريخ الإنشاء</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {Coupons && Coupons.length > 0 ? (
                Coupons.map((coupon, index) => (
                  <tr key={coupon._id}>
                    <td>{index + 1}</td>
                    <td>{coupon.name}</td>
                    <td>{coupon.discount}%</td>
                    <td>
                      {new Date(coupon.expiredAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td>
                      {new Date(coupon.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(coupon.name)}
                      >
                        تعديل
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(coupon.name)}
                        disabled={deletingCouponName === coupon.name}
                      >
                        {deletingCouponName === coupon.name
                          ? "جارٍ الحذف..."
                          : "حذف"}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted">
                    لا توجد كوبونات حتى الآن.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default GetAllCouponAdmin;
