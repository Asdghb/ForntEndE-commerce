import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ConfirmEmail = () => {
  const { activationCode } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("جاري تأكيد الحساب...");

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/confirmEmail/${activationCode}`
        );
        setMessage("تم تفعيل حسابك بنجاح ✅، سيتم تحويلك إلى تسجيل الدخول.");
        toast.success("تم تفعيل الحساب بنجاح");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setMessage("الرابط غير صالح أو الحساب مفعّل مسبقًا ❌");
        toast.error("فشل في تفعيل الحساب");
      }
    };

    confirmAccount();
  }, [activationCode, navigate]);

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ConfirmEmail;
