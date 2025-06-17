import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    forgetCode: Yup.string()
      .required("كود التحقق مطلوب")
      .matches(/^\d+$/, "يجب أن يكون الكود أرقامًا فقط"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
      .required("كلمة المرور مطلوبة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await axios.patch(
        `${UrlProgect}/auth/resetPassword`,
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "تم تغيير كلمة المرور بنجاح");
      navigate("/Login");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور"
      );
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4 text-center">إعادة تعيين كلمة المرور</h3>
      <Formik
        initialValues={{
          forgetCode: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="forgetCode" className="form-label">
                كود التحقق
              </label>
              <Field
                type="text"
                name="forgetCode"
                className="form-control"
                placeholder="أدخل كود التحقق المرسل"
              />
              <ErrorMessage
                name="forgetCode"
                component="div"
                className="text-danger mt-1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                كلمة المرور الجديدة
              </label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="أدخل كلمة المرور الجديدة"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger mt-1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                تأكيد كلمة المرور
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="أعد إدخال كلمة المرور"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جارٍ التحديث..." : "تحديث كلمة المرور"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
