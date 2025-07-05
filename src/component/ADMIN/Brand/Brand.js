import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBrand,
  resetBrandState,
} from "../../../Redux/AdminRedux/CreateBrandAdminSlice";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Brand = () => {
  const [name, setName] = useState("");
  const [imageBrand, setImageBrand] = useState(null);

  const dispatch = useDispatch();
  const { IsLoading, IsError, SuccessMessage } = useSelector(
    (state) => state.CreateBrand
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !imageBrand) {
      toast.error("❌ يجب ملء جميع الحقول");
      return;
    }

    dispatch(CreateBrand({ name, image: imageBrand }));
  };

  useEffect(() => {
    if (SuccessMessage) {
      toast.success(SuccessMessage);
      setName("");
      setImageBrand(null);
      dispatch(resetBrandState());
    }

    if (IsError) {
      toast.error(IsError);
      dispatch(resetBrandState());
    }
  }, [SuccessMessage, IsError, dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">إضافة براند جديد</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            اسم البراند
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="أدخل اسم البراند"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageBrand" className="form-label">
            صورة البراند
          </label>
          <input
            type="file"
            className="form-control"
            id="imageBrand"
            accept="image/*"
            onChange={(e) => setImageBrand(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={IsLoading}>
          {IsLoading ? "جارٍ الإرسال..." : "إرسال"}
        </button>
      </form>
      <hr></hr>
      <div className="col-12 text-center mt-3">
        <Link to="/admin/GetAllBrandAdmin">
          <Button variant="outline-primary" className="px-4">
            All Brand
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Brand;
