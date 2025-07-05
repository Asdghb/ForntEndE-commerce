import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const UrlProgect = process.env.REACT_APP_API_URL
  const [activationCode, setActivationCode] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const { data } = await axios.post(
        `${UrlProgect}/auth/confirmEmail`,
        {
          activationCode,
        }
      );
      toast.success(data.message);
      console.log(data.message)
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في تفعيل الحساب ❌");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h3>تفعيل الحساب</h3>
      <p>من فضلك أدخل كود التفعيل الذي تم إرساله إلى بريدك الإلكتروني:</p>
      <input
        type="text"
        value={activationCode}
        onChange={(e) => setActivationCode(e.target.value)}
        className="form-control w-50 mx-auto"
        placeholder="ادخل كود التفعيل"
      />
      <button className="btn btn-success mt-3" onClick={handleConfirm}>
        تفعيل
      </button>
    </div>
  );
};

export default ConfirmEmail;
