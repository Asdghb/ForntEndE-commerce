import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetOrder } from "../../Redux/UserRedux/OrderSlice";
import { Card, Table, Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import "moment/locale/ar";

const GetAllOrder = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  const Dispatch = useDispatch();
  const { orders, IsLoding, IsError } = useSelector(({ Order }) => Order);

  const CancelOrder = async (id) => {
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
      default:
        return "light";
    }
  };

  useEffect(() => {
    Dispatch(GetOrder());
  }, []);

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
      <div className="text-center my-5">
        <h4>لا توجد طلبات حالياً.</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Order</title>
      </Helmet>
      <h2 className="text-center text-primary mb-4 fw-bold">
        📦 قائمة الطلبات
      </h2>

      {orders.map((order, index) => (
        <Card key={order._id} className="mb-4 shadow-sm border-0 rounded-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h5 className="text-dark fw-bold mb-0">طلب رقم #{index + 1}</h5>

              <div className="d-flex align-items-center gap-2">
                <Badge
                  bg={getStatusColor(order.status)}
                  className="fs-6 px-3 py-2 mb-0"
                >
                  الحالة: {order.status}
                </Badge>

                {order.status === "placed" ? (
                  <Button
                    variant="danger"
                    className="px-3 py-1"
                    onClick={() => CancelOrder(order._id)}
                  >
                    إلغاء الطلب
                  </Button>
                ) : null}
              </div>
            </div>

            <hr />

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

            <hr />

            <h6 className="fw-bold text-success">🧾 الفاتورة:</h6>
            <a
              href={order.invoice.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary btn-sm mb-3"
            >
              تحميل الفاتورة PDF
            </a>

            {order.coupon && (
              <div className="mb-3">
                <p className="mb-1">
                  🎟️ <strong>كود الخصم:</strong> {order.coupon.name}
                </p>
                <p className="mb-1">
                  💰 <strong>نسبة الخصم:</strong> {order.coupon.discount}%
                </p>
              </div>
            )}

            <h6 className="fw-bold">📋 المنتجات:</h6>
            <Table responsive bordered hover className="text-center">
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

            <div className="text-end mt-3">
              {order.coupon ? (
                <h5 className="text-primary fw-bold">
                  الإجمالي بعد الخصم:{" "}
                  <span className="text-success">
                    {order.price.toLocaleString()} ج.م
                  </span>
                </h5>
              ) : (
                <h5 className="text-dark fw-bold">
                  الإجمالي الكلي:{" "}
                  <span className="text-success">
                    {order.price.toLocaleString()} ج.م
                  </span>
                </h5>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GetAllOrder;
