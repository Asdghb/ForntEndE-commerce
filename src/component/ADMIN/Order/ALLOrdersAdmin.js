import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrder } from "../../../Redux/AdminRedux/GetAllOrderAdminSlice";
import {
  EditOrderStatusApi,
  resetEditOrderStatus,
} from "../../../Redux/AdminRedux/EditOrderAdminSlice";
import {
  PatchOrderById,
  clearPatchOrderMessage,
} from "../../../Redux/AdminRedux/DeleteOrderAdminSlice";
import {
  Button,
  Container,
  Table,
  Modal,
  ListGroup,
  Badge,
  Row,
  Col,
  Card,
  Spinner,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

const ALLOrdersAdmin = () => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { AllOrders, IsLoading } = useSelector(
    (state) => state.GetALLOrdersAdmin
  );
  const {
    isLoading: deleting,
    message,
    currentUpdatingId,
  } = useSelector((state) => state.DeleteOrderId);
  const {
    IsLoading: editing,
    SuccessMessage,
    IsError,
  } = useSelector((state) => state.EditOrderSingle);

  useEffect(() => {
    dispatch(GetAllOrder());
  }, [dispatch]);

  useEffect(() => {
    if (SuccessMessage) {
      toast.success(SuccessMessage);
      setShowEditModal(false);
      dispatch(resetEditOrderStatus());
      dispatch(GetAllOrder());
    }
    if (IsError) {
      toast.error(IsError);
      dispatch(resetEditOrderStatus());
    }
  }, [SuccessMessage, IsError, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearPatchOrderMessage());
    }
  }, [message, dispatch]);

  const handleEditOrder = (order) => {
    setEditOrderId(order._id);
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleCancelOrder = (orderId) => {
    dispatch(PatchOrderById(orderId)).then(() => {
      dispatch(GetAllOrder());
    });
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleCloseDetails = () => setShowDetails(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditOrderId(null);
    setSelectedOrder(null);
    dispatch(resetEditOrderStatus());
  };

  const getStatusBadgeVariant = (status) => {
    if (status.includes("cancel")) return "danger";
    if (status.includes("paid") || status.includes("payed")) return "success";
    if (status.includes("shipped") || status.includes("delivered"))
      return "primary";
    if (status.includes("failed")) return "warning";
    return "secondary";
  };

  return (
    <Container className="my-4">
      {IsLoading ? (
        <div className="loader-overlay">
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        </div>
      ) : AllOrders && AllOrders.length > 0 ? (
        <>
          <h3 className="mb-4 text-primary fw-bold">جميع الطلبات</h3>
          <div className="table-responsive">
            <Table striped bordered hover className="text-center align-middle">
              <thead className="table-info">
                <tr>
                  <th>#</th>
                  <th>اسم المستخدم</th>
                  <th>الدفع</th>
                  <th>الحالة</th>
                  <th>السعر</th>
                  <th>التاريخ</th>
                  <th>الفاتورة</th>
                  <th>تفاصيل</th>
                  <th>الكوبون</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {AllOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order?.user?.username || "غير معروف"}</td>
                    <td>{order.payment}</td>
                    <td>
                      <Badge bg={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>{order.price.toLocaleString()} جنيه</td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td>
                      {order?.invoice?.url ? (
                        <a
                          href={order.invoice.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          عرض
                        </a>
                      ) : (
                        <span className="text-muted">لا توجد</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShowDetails(order)}
                      >
                        تفاصيل
                      </Button>
                    </td>
                    <td>
                      {order?.coupon ? (
                        <Badge bg="success">
                          {order.coupon.name} (-{order.coupon.discount}%)
                        </Badge>
                      ) : (
                        <span className="text-muted">لا يوجد</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditOrder(order)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={deleting && currentUpdatingId === order._id}
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        {deleting && currentUpdatingId === order._id ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "إلغاء"
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Modal تفاصيل الطلب */}
          <Modal
            show={showDetails}
            onHide={handleCloseDetails}
            centered
            size="lg"
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">تفاصيل الطلب</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedOrder && (
                <Card className="border-0 shadow-sm w-100">
                  <Card.Body>
                    <Row className="gy-3">
                      <Col xs={12} md={6}>
                        <p>
                          <strong>الاسم:</strong>{" "}
                          {selectedOrder?.user?.username}
                        </p>
                        <p>
                          <strong>البريد:</strong> {selectedOrder?.user?.email}
                        </p>
                        <p>
                          <strong>الهاتف:</strong> {selectedOrder?.phone}
                        </p>
                        <p>
                          <strong>العنوان:</strong> {selectedOrder?.address}
                        </p>
                      </Col>
                      <Col xs={12} md={6}>
                        <p>
                          <strong>الدفع:</strong> {selectedOrder?.payment}
                        </p>
                        <p>
                          <strong>الحالة:</strong> {selectedOrder?.status}
                        </p>
                        <p>
                          <strong>السعر:</strong>{" "}
                          {selectedOrder?.price?.toLocaleString()} جنيه
                        </p>
                        {selectedOrder?.coupon && (
                          <p>
                            <strong>الكوبون:</strong>{" "}
                            {selectedOrder?.coupon?.name} (-
                            {selectedOrder?.coupon?.discount}%)
                          </p>
                        )}
                      </Col>
                    </Row>
                    <hr />
                    <h5 className="text-primary">المنتجات</h5>
                    <ListGroup variant="flush">
                      {selectedOrder.products?.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <strong>{item.name}</strong> - الكمية: {item.quantity}{" "}
                          - السعر الفردي: {item.itemprice} جنيه - الإجمالي:{" "}
                          {item.totalPrice} جنيه
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetails}>
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>

          {/* مودال تعديل حالة الطلب */}
          <Modal
            show={showEditModal}
            onHide={handleCloseEditModal}
            centered
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>تعديل حالة الطلب</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{ status: selectedOrder?.status || "" }}
              enableReinitialize
              validationSchema={Yup.object({
                status: Yup.string().required("الحالة مطلوبة"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(
                  EditOrderStatusApi({
                    orderId: editOrderId,
                    status: values.status,
                  })
                )
                  .unwrap()
                  .then(() => setSubmitting(false))
                  .catch(() => setSubmitting(false));
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className="p-3">
                  <Form.Group className="mb-3">
                    <Form.Label>الحالة الجديدة</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      isInvalid={touched.status && !!errors.status}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="placed">تم الطلب</option>
                      <option value="paid">مدفوع</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="refunded">تم الاسترجاع</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                      <option value="visa payed">مدفوع بفيزا</option>
                      <option value="failed to pay">فشل الدفع</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={handleCloseEditModal}
                      className="me-2"
                      disabled={isSubmitting || editing}
                    >
                      إلغاء
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting || editing}
                    >
                      {editing || isSubmitting ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "تعديل"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        </>
      ) : (
        <h4 className="text-center mt-4">لا توجد طلبات حالياً.</h4>
      )}
    </Container>
  );
};

export default ALLOrdersAdmin;
