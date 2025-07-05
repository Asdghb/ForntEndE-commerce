import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../../Redux/AdminRedux/GetAllAdminSlice";
import {
  deleteAdminById,
  clearDeleteAdminState,
} from "../../../Redux/AdminRedux/DeleteAdminSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetAllAdmin = () => {
  const [deletingAdminId, setDeletingAdminId] = useState(null);

  const dispatch = useDispatch();

  const { admins, isLoading, isError } = useSelector(
    (state) => state.GetAllAdmin
  );

  const { message: deleteMessage, isError: deleteError } = useSelector(
    (state) => state.DeleteAdmin
  );

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  useEffect(() => {
    if (deleteMessage) {
      toast.success(deleteMessage, { toastId: "delete-success" });
      dispatch(clearDeleteAdminState());
    } else if (deleteError) {
      toast.error(deleteError, { toastId: "delete-error" });
      dispatch(clearDeleteAdminState());
    }
  }, [deleteMessage, deleteError, dispatch]);

  const DeleteAdminId = (adminId) => {
    setDeletingAdminId(adminId);
    dispatch(deleteAdminById(adminId)).then(() => {
      dispatch(getAllAdmins());
      setDeletingAdminId(null);
    });
  };

  if (isLoading)
    return (
      <div className="loader-overlay">
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    );

  if (isError)
    return (
      <div className="alert alert-danger text-center w-75 mx-auto mt-5">
        ❌ {isError}
      </div>
    );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📋 ALL Admin</h2>
      {admins.length === 0 ? (
        <div className="alert alert-warning text-center">
          لا يوجد إدمنز حتى الآن
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>الاسم</th>
                <th>الإيميل</th>
                <th>تاريخ الإنشاء</th>
                <th>الاجراء</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>
                    {new Date(admin.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => DeleteAdminId(admin._id)}
                      disabled={deletingAdminId === admin._id}
                    >
                      {deletingAdminId === admin._id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllAdmin;
