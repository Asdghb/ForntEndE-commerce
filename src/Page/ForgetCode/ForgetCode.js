import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetCode = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const mutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.patch(`${UrlProgect}/auth/forgetCode`, {
        email,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "تم إرسال الكود إلى بريدك.");
      navigate("/ResetPassword");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء الإرسال.");
    },
  });

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm border-0 rounded-4 p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h4 className="text-center text-primary mb-4 fw-bold">
          🔐 استعادة كلمة المرور
        </h4>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => mutation.mutate(values.email)}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  البريد الإلكتروني
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="example@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mt-1 small"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
                disabled={isSubmitting}
              >
                {isSubmitting ? "🔄 جارٍ الإرسال..." : "📤 إرسال الكود"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-3">
          <Link
            to="/login"
            className="btn btn-outline-secondary rounded-pill px-4 py-2"
          >
            ← الرجوع لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetCode;
