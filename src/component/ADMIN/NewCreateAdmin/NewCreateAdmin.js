// components/NewCreateAdmin.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNewAdmin,
  resetAdminState,
} from "../../../Redux/AdminRedux/CreateNewAdminSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const NewCreateAdmin = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, successMessage } = useSelector(
    (state) => state.CreateAdmin
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateNewAdmin(formData));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setFormData({ email: "", password: "" });
      dispatch(resetAdminState());
    }

    if (isError) {
      toast.error(isError);
      dispatch(resetAdminState());
    }
  }, [successMessage, isError, dispatch]);

  return (
    <div className="container py-5">
      <h3 className="mb-4"> New Create admin</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Create..." : "New Create admin"}
        </button>
      </form>
    </div>
  );
};

export default NewCreateAdmin;
