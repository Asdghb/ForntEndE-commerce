import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetCode = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
  });

  // ✅ طلب الإرسال
  const mutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.patch(
        "http://localhost:3000/auth/forgetCode",
        { email }
      );
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
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      {/* <h3 className="text-center mb-4">ارسل كود</h3> */}
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutation.mutate(values.email)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                البريد الإلكتروني
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="أدخل بريدك الإلكتروني"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger mt-1"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جارٍ الإرسال..." : "إرسال الكود"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetCode;
