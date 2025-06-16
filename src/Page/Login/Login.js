import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoryContext } from "../../Context/CounterContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { setUserToken, setUserRole } = useContext(StoryContext);
  const mutation = useMutation({
    mutationFn: (values) =>
      axios.post("http://localhost:3000/auth/login", values),
    onSuccess: (res) => {
      toast.success(res.data.message);
      localStorage.setItem("UserToken", res.data.results);
      const decoded = jwtDecode(res.data.results);
      localStorage.setItem("RoleUser", JSON.stringify(decoded.role));
      const UserRole = JSON.parse(localStorage.getItem("RoleUser"));
      if (UserRole) {
        setUserRole(UserRole);
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
    <>
      <div className="container m-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Login Now :</h1>
        </div>

        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              id="password"
              {...formik.getFieldProps("password")}
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 d-flex justify-content-center align-items-center"
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

        <div className="mt-4 d-flex justify-content-center gap-3">
          <Link to="/Register" className="btn btn-outline-primary px-4">
            إنشاء حساب
          </Link>
          <Link to="/ForgetCode" className="btn btn-outline-danger px-4">
            إعادة تعيين كلمة المرور
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
