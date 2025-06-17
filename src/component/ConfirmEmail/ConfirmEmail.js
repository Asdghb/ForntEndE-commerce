import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const { activationCode } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await axios.get(
          `https://backende-commerce-t418.onrender.com/api/v1/auth/confirmEmail/${activationCode}`
        );

        if (res.status === 200) {
          setStatus("success");
          setMessage("تم تفعيل حسابك بنجاح! جاري تحويلك لصفحة تسجيل الدخول...");
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "حدث خطأ أثناء تفعيل الحساب، يرجى المحاولة لاحقًا."
        );
      }
    };

    activate();
  }, [activationCode, navigate]);

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      {status === "pending" && <p>جاري تفعيل حسابك، الرجاء الانتظار...</p>}
      {status === "success" && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
      {status === "error" && (
        <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
};

export default ConfirmEmail;
