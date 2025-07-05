import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetOrder } from "../../Redux/UserRedux/OrderSlice";
import { Card, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import axios from "axios";
import "moment/locale/ar";

const GetAllOrder = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const UrlProgect = process.env.REACT_APP_API_URL;
  const { orders, IsLoding, IsError } = useSelector(({ Order }) => Order);

  const BackPage = () => {
    navigate(-1);
  };

  const CancelOrder = async (id) => {
    setCancelingOrderId(id);
    const headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };
    try {
      const response = await axios.patch(
        `${UrlProgect}/Order/${id}`,
        {},
        { headers }
      );
      toast.success(response.data.message);
      Dispatch(GetOrder());
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء إلغاء الطلب");
      console.error("خطأ أثناء إلغاء الطلب:", err);
    } finally {
      setCancelingOrderId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "secondary";
      case "visa payed":
        return "primary";
      case "shipped":
        return "warning";
      case "delivered":
        return "success";
      case "cancelled":
        return "dark";
      case "refunded":
        return "info";
      case "failed to pay":
        return "danger";
      case "paid":
        return "primary";
      default:
        return "light";
    }
  };

  useEffect(() => {
    Dispatch(GetOrder());
  }, [Dispatch]);

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

  if (IsError) {
    return (
      <div className="alert alert-danger text-center">
        حدث خطأ أثناء جلب الطلبات.
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <>
        <div className="text-center mt-5">
          <h4>لا توجد طلبات حالياً.</h4>
        </div>
        <div className="text-center mt-3">
          <Link to="/">
            <Button variant="primary" className="px-4 py-2 rounded-pill shadow">
              تسوق الآن
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="container my-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Orders</title>
      </Helmet>
      <div className="mb-3">
        <button
          className="btn btn-outline-secondary d-inline-flex align-items-center"
          onClick={BackPage}
        >
          <span className="me-2">←</span> back
        </button>
      </div>
      <h2 className="text-center text-primary mb-4 fw-bold">
        📦 قائمة الطلبات الخاصة بك
      </h2>
      {orders.map((order, index) => (
        <Card
          key={order._id}
          className="mb-4 shadow border-0 rounded-4"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Card.Body>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <h5 className="fw-bold text-dark mb-0">
                🧾 الطلب رقم #{index + 1}
              </h5>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Badge
                  bg={getStatusColor(order.status)}
                  className="fs-6 px-3 py-2"
                >
                  الحالة: {order.status}
                </Badge>

                {order.status === "placed" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => CancelOrder(order._id)}
                    disabled={cancelingOrderId === order._id}
                  >
                    {cancelingOrderId === order._id
                      ? "جارٍ الإلغاء..."
                      : "إلغاء الطلب"}
                  </Button>
                )}
              </div>
            </div>
            <hr />
            <div className="row gy-2">
              <div className="col-12 col-md-6">
                <p className="mb-1">
                  <strong>📅 التاريخ:</strong>{" "}
                  {moment(order.createdAt).format("YYYY/MM/DD - hh:mm A")}
                </p>
                <p className="mb-1">
                  <strong>🏠 العنوان:</strong> {order.address}
                </p>
                <p className="mb-1">
                  <strong>📞 الهاتف:</strong> {order.phone}
                </p>
                <p className="mb-1">
                  <strong>💳 الدفع:</strong> {order.payment}
                </p>
              </div>
              <div className="col-12 col-md-6 text-md-end">
                {order.invoice?.url ? (
                  <a
                    href={order.invoice.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    تحميل الفاتورة PDF
                  </a>
                ) : (
                  <p className="text-muted">لا توجد فاتورة متاحة</p>
                )}
              </div>
            </div>
            {order.coupon && (
              <div className="alert alert-info mt-3 p-2 rounded-3">
                🎟️ <strong>كود الخصم:</strong> {order.coupon.name} —{" "}
                <strong>خصم:</strong> {order.coupon.discount}%
              </div>
            )}
            <div className="table-responsive mt-3">
              <Table bordered hover responsive className="text-center mb-0">
                <thead className="table-secondary">
                  <tr>
                    <th>المنتج</th>
                    <th>السعر</th>
                    <th>الكمية</th>
                    <th>الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((prod, idx) => (
                    <tr key={idx}>
                      <td>{prod.name}</td>
                      <td>{prod.itemprice.toLocaleString()} ج.م</td>
                      <td>{prod.quantity}</td>
                      <td>{prod.totalPrice.toLocaleString()} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="text-end mt-3">
              <h5 className="fw-bold">
                {order.coupon ? "الإجمالي بعد الخصم:" : "الإجمالي الكلي:"}{" "}
                <span className="text-success">
                  {order.price.toLocaleString()} ج.م
                </span>
              </h5>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GetAllOrder;
