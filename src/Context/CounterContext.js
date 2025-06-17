import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UrlProgect = process.env.REACT_APP_API_URL;

export const StoryContext = createContext();

export function StoryContextProvider({ children }) {
  // _______________________________TOKEN_________________
  const [UserToken, setUserToken] = useState(null);
  const [UserRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // _______________________AddToCart_____________________
  function AddToCart(productId, quantity) {
    let Headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };

    return axios
      .post(
        `${UrlProgect}/Cart/`,
        { productId, quantity: 1 },
        {
          headers: Headers,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        return res.data;
      })
      .catch((err) => {
        toast.error(err.response?.data || err.message);
        throw err;
      });
  }
  // _____________________________________________________
  function GetCartItems() {
    let Headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };
    return axios
      .get(`${UrlProgect}/Cart/`, {
        headers: Headers,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  }
  // _____________________________________________________
  function RemoveCartItems(productId) {
    if (!productId) {
      console.warn("المعرف غير موجود");
      return;
    }

    let Headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };

    return axios
      .patch(`${UrlProgect}/Cart/${productId}`, {}, { headers: Headers })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("خطأ في حذف المنتج من السلة:", err);
        throw err;
      });
  }
  // _____________________________________________________

  function UpdateCartItems(productId, quantity) {
    if (!productId) {
      console.warn("المعرف غير موجود");
      return;
    }

    let headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };

    return axios
      .patch(
        `${UrlProgect}/Cart/`,
        { productId, quantity },
        { headers: headers }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("خطأ في تحديث المنتج في السلة:", err);
        throw err;
      });
  }
  // _____________________________________________________
  function createOrder(values) {
    console.log(values);
    const headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };
    return axios
      .post(`${UrlProgect}/Order`, values, { headers })
      .then((res) => res.data)
      .catch((err) => {
        console.error("❌ خطأ في إنشاء الطلب:", err);
        throw err;
      });
  }
  // _____________________________________________________
  function ClearToCart() {
    const headers = {
      token: `Route__${localStorage.getItem("UserToken")}`,
    };
    return axios
      .patch(`${UrlProgect}/Cart/clear`, {}, { headers })
      .then((res) => res.data)
      .catch((err) => {
        console.error("❌ خطأ في إنشاء الطلب:", err);
        throw err;
      });
  }
  // _____________________________________________________
  return (
    <StoryContext.Provider
      value={{
        UserToken,
        setUserToken,
        setIsLoading,
        isLoading,
        AddToCart,
        GetCartItems,
        RemoveCartItems,
        UpdateCartItems,
        createOrder,
        ClearToCart,
        UserRole,
        setUserRole,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}
