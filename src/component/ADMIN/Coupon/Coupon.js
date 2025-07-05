import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCoupon,
  resetCouponState,
} from "../../../Redux/AdminRedux/CreateCouponAdminSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const couponSchema = Yup.object().shape({
  discount: Yup.number()
    .required("مطلوب")
    .min(1, "القيمة لا يمكن أن تقل عن 1%")
    .max(100, "القيمة لا يمكن أن تزيد عن 100%"),
  expiredAt: Yup.string().required("تاريخ الانتهاء مطلوب"),
});

const Coupon = () => {
  const dispatch = useDispatch();
  const { IsLoading, IsError, SuccessMessage } = useSelector(
    (state) => state.Coupon
  );

  // ✅ Toast feedback
  useEffect(() => {
    if (SuccessMessage) {
      toast.success(`${SuccessMessage}`);
      setTimeout(() => dispatch(resetCouponState()), 2000);
    }
    if (IsError) {
      toast.error(`${IsError}`);
      setTimeout(() => dispatch(resetCouponState()), 2000);
    }
  }, [SuccessMessage, IsError, dispatch]);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <h3 className="mb-4 text-center">إنشاء كوبون خصم جديد</h3>

          <Formik
            initialValues={{ discount: "", expiredAt: "" }}
            validationSchema={couponSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(CreateCoupon(values))
                .unwrap()
                .then(() => resetForm()) 
                .catch(() => {}); 
            }}
          >
            {() => (
              <Form>
                {/* نسبة الخصم */}
                <div className="mb-3">
                  <label htmlFor="discount" className="form-label">
                    نسبة الخصم (%)
                  </label>
                  <Field
                    type="number"
                    id="discount"
                    name="discount"
                    className="form-control"
                    placeholder="مثال: 10"
                    min="1"
                    max="100"
                  />
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* تاريخ الانتهاء */}
                <div className="mb-3">
                  <label htmlFor="expiredAt" className="form-label">
                    تاريخ انتهاء الصلاحية
                  </label>
                  <Field
                    type="date"
                    id="expiredAt"
                    name="expiredAt"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="expiredAt"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* زر الإنشاء */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={IsLoading}
                >
                  {IsLoading ? "جارٍ إنشاء الكوبون..." : "إنشاء الكوبون"}
                </button>
              </Form>
            )}
          </Formik>

          {/* زر عرض كل الكوبونات */}
          <div className="text-center mt-4">
            <Link to="/admin/GetAllCouponAdmin">
              <Button variant="outline-primary" className="px-4">
                ALL Coupon
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
