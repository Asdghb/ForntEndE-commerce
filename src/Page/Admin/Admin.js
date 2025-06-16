import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Brand from "../../component/ADMIN/Brand/Brand";
import Category from "../../component/ADMIN/Category/Category";
import Coupon from "../../component/ADMIN/Coupon/Coupon";
import NewCreateAdmin from "../../component/ADMIN/NewCreateAdmin/NewCreateAdmin";
import Order from "../../component/ADMIN/Order/Order";
import Product from "../../component/ADMIN/Product/Product";
import SubCategory from "../../component/ADMIN/Subcategory/Subcategory";
import GetAllAdmin from "../../component/ADMIN/GetAllAdmin/GetAllAdmin";
import GetAllCategoryAdmin from "../../component/ADMIN/Category/GetAllCategoryAdmin";

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="d-flex py-1"
      style={{ minHeight: "100vh", flexDirection: "column" }}
    >
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`bg-dark text-white ${
            isSidebarOpen ? "d-block" : "d-none"
          }`}
          style={{
            width: "250px",
            minHeight: "100vh",
            paddingTop: "10px",
            paddingBottom: "10px",
            transition: "0.3s",
          }}
        >
          <h4 className="text-center mb-4">لوحة التحكم</h4>
          <ul className="nav flex-column">
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
              <Link to="/admin/subcategory" className="nav-link text-white">
                SubCategory
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
              <Link to="/admin/order" className="nav-link text-white">
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/GetAllAdmin" className="nav-link text-white">
                All Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/newcreateadmin" className="nav-link text-white">
                New Create Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1">
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
                    <h2>مرحبًا بك في لوحة التحكم</h2>
                    <p>اختر قسمًا من القائمة الجانبية لبدء الإدارة.</p>
                  </>
                }
              />
              <Route path="brand" element={<Brand />} />
              <Route path="category" element={<Category />} />
              <Route path="subcategory" element={<SubCategory />} />
              <Route path="product" element={<Product />} />
              <Route path="coupon" element={<Coupon />} />
              <Route path="order" element={<Order />} />
              <Route path="newcreateadmin" element={<NewCreateAdmin />} />
              <Route path="GetAllAdmin" element={<GetAllAdmin />} />
              <Route path="GetAllCategoryAdmin" element={<GetAllCategoryAdmin />} />
              <Route path="*" element={<Navigate to="/NotFoundPage" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
