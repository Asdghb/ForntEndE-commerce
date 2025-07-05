import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoryContext } from "../../Context/CounterContext";
import { jwtDecode } from "jwt-decode";

import styles from "./Login.module.css";

const Login = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { setUserToken, setUserRole } = useContext(StoryContext);

  const mutation = useMutation({
    mutationFn: (values) => axios.post(`${UrlProgect}/auth/login`, values),
    onSuccess: (res) => {
      toast.success(res.data.message);
      localStorage.setItem("UserToken", res.data.results); // التوكن
      const decoded = jwtDecode(res.data.results);
      if (decoded) {
        setUserRole(decoded.role);
      }
      setUserToken(res.data.results);
      navigate("/");
    },
    onError: (err) => {
      const message = err.response?.data?.message || "فشل تسجيل الدخول";
      toast.error(message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
      password: Yup.string()
        .min(6, "كلمة السر قصيرة")
        .required("كلمة السر مطلوبة"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login Now :</h1>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email :
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`${styles.input} ${
                formik.touched.email && formik.errors.email
                  ? styles.invalid
                  : ""
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.errorMsg}>{formik.errors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password :
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className={`${styles.input} ${
                formik.touched.password && formik.errors.password
                  ? styles.invalid
                  : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.errorMsg}>{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                جاري الدخول...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className={styles.btnGroup}>
          <Link
            to="/Register"
            className={`${styles.linkBtn} ${styles.primary}`}
          >
            إنشاء حساب
          </Link>
          <Link
            to="/ForgetCode"
            className={`${styles.linkBtn} ${styles.danger}`}
          >
            إعادة تعيين كلمة المرور
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
