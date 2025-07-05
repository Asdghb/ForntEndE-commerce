import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../Redux/AdminRedux/GetAllCategoryAdminSlice";
import { getProduct } from "../../../Redux/UserRedux/GetAllProductSlice";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { DeleteApiproductId } from "../../../Redux/AdminRedux/DeleteProductAdminSlice";
import { clearDeleteProductMessage } from "../../../Redux/AdminRedux/DeleteProductAdminSlice";

const GetAllProductAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Categorys } = useSelector((state) => state.AllCategorys);
  const { Products, IsLoding, IsError } = useSelector(
    (state) => state.GetAllProducts
  );
  const {
    IsError: errorDleteid,
    message,
    currentDeletingId,
  } = useSelector((state) => state.DeleteProductId);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearDeleteProductMessage());
    }
  }, [message]);

  const DeleteProductId = async (id) => {
    const resultAction = await dispatch(DeleteApiproductId(id));
    if (DeleteApiproductId.fulfilled.match(resultAction)) {
      dispatch(getCategory());
      dispatch(getProduct());
    } else {
      toast.error(resultAction.payload || "حدث خطأ أثناء الحذف");
    }
  };

  const getCategoryName = (id) => {
    const category = Categorys?.find((cat) => cat._id === id);
    return category?.name || "غير معروف";
  };

  if (IsLoding) {
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
  }

  if (IsError || errorDleteid) {
    return (
      <h4 className="text-danger text-center">
        {IsError || "حدث خطأ غير متوقع"}
      </h4>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-start mb-3">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          ← back
        </Button>
      </div>

      <h6 className="mb-4 text-center text-success">
        قائمة المنتجات (تحكم الأدمن)
      </h6>

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <table
          className="table table-striped table-bordered table-hover text-center align-middle"
          style={{
            minWidth: "1000px",
            fontSize: "clamp(12px, 2vw, 15px)",
          }}
        >
          <thead className="table-success">
            <tr>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>بعد الخصم</th>
              <th>الكمية</th>
              <th>المباعة</th>
              <th>التصنيف</th>
              <th>الحالة</th>
              <th>تاريخ الإضافة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {Products && Products.length > 0 ? (
              Products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.defaultImage?.url}
                      alt={product.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>${Number(product.finalPrice).toFixed(2)}</td>
                  <td>{product.availableItems}</td>
                  <td>{product.soldItems}</td>
                  <td>{getCategoryName(product.categoryId)}</td>
                  <td>
                    {Number(product.availableItems) > 0 ? (
                      <span className="badge bg-success">متوفر</span>
                    ) : (
                      <span className="badge bg-danger">غير متوفر</span>
                    )}
                  </td>
                  <td>
                    {new Date(product.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => DeleteProductId(product._id)}
                      disabled={currentDeletingId === product._id}
                    >
                      {currentDeletingId === product._id
                        ? "جارٍ الحذف..."
                        : "حذف"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-muted">
                  لا توجد منتجات لعرضها.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default GetAllProductAdmin;
