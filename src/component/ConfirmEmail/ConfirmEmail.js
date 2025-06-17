import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ConfirmEmail = () => {
  const { activationCode } = useParams();
  const navigate = useNavigate();
  const UrlProject = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const { data } = await axios.get(`${UrlProject}/auth/confirmEmail/${activationCode}`);
        toast.success("تم تفعيل الحساب بنجاح");
        navigate("/login");
      } catch (err) {
        toast.error("الرابط غير صالح أو منتهي");
        navigate("/register");
      }
    };

    if (activationCode) {
      confirmEmail();
    }
  }, [activationCode, UrlProject, navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>جارٍ تفعيل حسابك...</h2>
    </div>
  );
};

export default ConfirmEmail;
