import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const PaymentSuccess = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "50vh", padding: "1rem" }}
    >
      <Card
        className="text-center shadow p-3 rounded w-100"
        style={{ maxWidth: "360px" }}
      >
        <Card.Body>
          <h2 className="text-success mb-3">✅ تمت عملية الدفع بنجاح</h2>
          <p className="mb-4">
            شكرًا لك! لقد تم تأكيد طلبك بنجاح. سيتم التواصل معك قريبًا.
          </p>
          <Link to="/">
            <Button variant="success" className="w-100">
              العودة إلى الصفحة الرئيسية
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
