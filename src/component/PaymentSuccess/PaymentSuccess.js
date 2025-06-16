import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const PaymentSuccess = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        className="text-center shadow p-4 rounded"
        style={{ maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-success mb-3">✅ تمت عملية الدفع بنجاح</h2>
          <p className="mb-4">
            شكرًا لك! لقد تم تأكيد طلبك بنجاح. سيتم التواصل معك قريبًا.
          </p>
          <Link to="/">
            <Button variant="success">العودة إلى الصفحة الرئيسية</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
