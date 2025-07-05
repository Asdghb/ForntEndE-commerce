import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Brand from "../../component/ADMIN/Brand/Brand";
import Category from "../../component/ADMIN/Category/Category";
import Coupon from "../../component/ADMIN/Coupon/Coupon";
import NewCreateAdmin from "../../component/ADMIN/NewCreateAdmin/NewCreateAdmin";
import Product from "../../component/ADMIN/Product/Product";
import SubCategory from "../../component/ADMIN/Subcategory/Subcategory";
import GetAllAdmin from "../../component/ADMIN/GetAllAdmin/GetAllAdmin";
import GetAllCategoryAdmin from "../../component/ADMIN/Category/GetAllCategoryAdmin";
import GetAllBrandAdmin from "../../component/ADMIN/Brand/GetAllBrandAdmin";
import GetAllProductAdmin from "../../component/ADMIN/Product/GetAllProductAdmin";
import GetAllCouponAdmin from "../../component/ADMIN/Coupon/GetAllCouponAdmin";
import ALLOrdersAdmin from "../../component/ADMIN/Order/ALLOrdersAdmin";

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="d-flex py-1"
      style={{ minHeight: "50vh", flexDirection: "column" }}
    >
      <div className="d-flex flex-grow-1" style={{ position: "relative" }}>
        {/* Sidebar */}
        <div
          className="bg-dark text-white"
          style={{
            width: isSidebarOpen ? "250px" : "0",
            minHeight: "70vh",
            overflow: "hidden",
            transition: "width 0.5s ease",
            boxSizing: "border-box",
            padding: isSidebarOpen ? "10px 15px" : "0",
          }}
        >
          {isSidebarOpen && (
            <>
              <h4 className="text-center mb-4">لوحة التحكم</h4>
              <ul className="nav flex-column px-0">
                <li className="nav-item">
                  <Link to="/admin/product" className="nav-link text-white">
                    Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/category" className="nav-link text-white">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/brand" className="nav-link text-white">
                    Brand
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/coupon" className="nav-link text-white">
                    Coupon
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/ALLOrdersAdmin"
                    className="nav-link text-white"
                  >
                    Order
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/GetAllAdmin" className="nav-link text-white">
                    All Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/newcreateadmin"
                    className="nav-link text-white"
                  >
                    New Create Admin
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1"
          style={{
            paddingLeft: "0",
            transition: "all 0.5s ease",
          }}
        >
          <nav className="navbar navbar-light bg-light px-3">
            <button className="btn btn-outline-dark" onClick={toggleSidebar}>
              ☰
            </button>
            <span className="navbar-brand mb-0 h1">Admin Panel</span>
          </nav>

          <div className="p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="container py-5 text-center">
                      <div className="bg-light p-4 rounded shadow-sm">
                        <h2 className="text-success mb-3 fw-bold">
                          مرحبًا بك في لوحة التحكم
                        </h2>
                        <p className="mb-2 fs-5 text-secondary">
                          اختر قسمًا من القائمة الجانبية لبدء الإدارة.
                        </p>
                        <p
                          className="text-muted fst-italic"
                          style={{ fontSize: "0.9rem" }}
                        >
                          ⚠️ قد لا تتجاوب لوحة التحكم بشكل كامل على الشاشات
                          الصغيرة. يُفضل استخدام جهاز سطح المكتب للتحكم الأمثل.
                        </p>
                      </div>
                    </div>
                  </>
                }
              />
              <Route path="brand" element={<Brand />} />
              <Route path="category" element={<Category />} />
              <Route path="subcategory" element={<SubCategory />} />
              <Route path="product" element={<Product />} />
              <Route path="coupon" element={<Coupon />} />
              <Route path="ALLOrdersAdmin" element={<ALLOrdersAdmin />} />
              <Route path="newcreateadmin" element={<NewCreateAdmin />} />
              <Route path="GetAllAdmin" element={<GetAllAdmin />} />
              <Route
                path="GetAllCategoryAdmin"
                element={<GetAllCategoryAdmin />}
              />
              <Route path="GetAllBrandAdmin" element={<GetAllBrandAdmin />} />
              <Route
                path="GetAllProductAdmin"
                element={<GetAllProductAdmin />}
              />
              <Route path="GetAllCouponAdmin" element={<GetAllCouponAdmin />} />
              <Route path="*" element={<Navigate to="/NotFoundPage" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
