import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Register.module.css";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (values) => axios.post(`${UrlProgect}/auth/register`, values),
    onSuccess: (response) => {
      toast.success(response.data.message);
      setTimeout(() => navigate("/ConfirmEmail"), 2000);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ أثناء التسجيل";
      toast.error(message);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("اسم المستخدم مطلوب"),
      email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
      password: Yup.string()
        .min(6, "كلمة السر على الأقل 6 حروف")
        .required("كلمة السر مطلوبة"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "كلمتا السر غير متطابقتين")
        .required("تأكيد كلمة السر مطلوب"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}> Register Now</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username :
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              {...formik.getFieldProps("username")}
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className={styles.error}>{formik.errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              {...formik.getFieldProps("email")}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              {...formik.getFieldProps("password")}
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password :
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Re-enter password"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className={styles.error}>
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <button
            type="submit"
            className={`btn btn-success ${styles.button}`}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                جاري التسجيل...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
