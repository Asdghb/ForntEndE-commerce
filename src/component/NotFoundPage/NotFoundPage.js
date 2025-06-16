import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = ({customPath}) => {



  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light">
      <h1 className="display-1 fw-bold text-success">404</h1>
      <h1 className="fs-3">
        <span className="text-success">عذرًا!</span> الصفحة غير موجودة.
      </h1>
      <h2 className="lead mb-4">الصفحة التي تحاول الوصول إليها غير متاحة.</h2>
      <Link to={customPath} className="btn btn-success px-4 py-2">
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFoundPage;
