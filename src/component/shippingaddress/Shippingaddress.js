import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { StoryContext } from "../../Context/CounterContext";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Shippingaddress = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  const { createOrder } = useContext(StoryContext);
  const [isPending, setisPending] = useState(false);
  const [couponData, setCouponData] = useState(null); // حالة الكوبون
  const navigate = useNavigate();

  // 🟡 جلب الكوبون عند تحميل الصفحة
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const { data } = await axios.get(`${UrlProgect}/Coupon/`);
        if (data.success && data.results.length > 0) {
          setCouponData(data.results[0]);
        }
      } catch (error) {
        console.error("فشل في جلب بيانات الكوبون", error);
      }
    };
    fetchCoupon();
  }, []);

  const CreateOrder = async (values, formikHelpers) => {
    setisPending(true);
    try {
      const data = await createOrder(values);
      if (data.results && values.payment === "visa") {
        formikHelpers.resetForm();
        window.location.href = data.results;
      } else {
        toast.success(data.message || "✅ تم إنشاء الطلب بنجاح!");
        formikHelpers.resetForm();
        navigate("/GetAllOrder");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء انشاء الطلب ");
      console.error("فشل في إنشاء الطلب:", err);
    } finally {
      setisPending(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      coupon: "",
      payment: "cash",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("العنوان مطلوب"),
      phone: Yup.string()
        .matches(/^\d{10,15}$/, "رقم الهاتف غير صالح")
        .required("رقم الهاتف مطلوب"),
      coupon: Yup.string().nullable(),
      payment: Yup.string().oneOf(["cash", "visa"], "نوع الدفع غير صالح"),
    }),
    onSubmit: (values, formikHelpers) => CreateOrder(values, formikHelpers),
  });

  return (
    <div className="container m-5">
      <h2 className="mb-4 text-center text-primary">📦 Shipping address</h2>

      {/* ✅ عرض بيانات الكوبون إن وُجد */}
      {couponData && (
        <div className="alert alert-success text-center">
          <strong>: كوبون متاح {couponData.discount}%  خصم{" "} <h2> {couponData.name} </h2> </strong>    
        </div>
      )}

      <Form
        onSubmit={formik.handleSubmit}
        className="shadow p-4 rounded bg-light"
      >
        <Form.Group className="mb-3">
          <Form.Label>العنوان</Form.Label>
          <Form.Control
            type="text"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            isInvalid={formik.touched.address && formik.errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            isInvalid={formik.touched.phone && formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>كوبون الخصم</Form.Label>
          <Form.Control
            type="text"
            name="coupon"
            onChange={formik.handleChange}
            value={formik.values.coupon}
            placeholder={couponData?.name || "أدخل الكوبون (إن وجد)"}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>طريقة الدفع</Form.Label>
          <Form.Select
            name="payment"
            onChange={formik.handleChange}
            value={formik.values.payment}
          >
            <option value="cash">الدفع نقدًا</option>
            <option value="visa">الدفع أونلاين</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                جارٍ إرسال الطلب...
              </>
            ) : (
              "تأكيد الطلب"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Shippingaddress;
