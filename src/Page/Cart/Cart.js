import React, { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../Context/CounterContext";
import "../../global.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { GetCartItems, RemoveCartItems, UpdateCartItems, ClearToCart } =
    useContext(StoryContext);
  const [Cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const BackPage = () => {
    navigate(-1);
  };

  async function deleteCartItems(productId) {
    setLoading(true);
    try {
      await RemoveCartItems(productId);
      const updatedCart = await GetCartItems();
      setCart(updatedCart?.results?.products || []);
    } catch (err) {
      console.error("فشل حذف المنتج:", err);
    } finally {
      setLoading(false);
    }
  }

  async function UpdateCart(productId, quantity) {
    setLoading(true);
    if (quantity < 1) {
      deleteCartItems(productId);
      return;
    }
    try {
      await UpdateCartItems(productId, quantity);
      const updatedCart = await GetCartItems();
      setCart(updatedCart?.results?.products || []);
    } catch (err) {
      console.error("فشل تحديث المنتج:", err);
    } finally {
      setLoading(false);
    }
  }

  async function ClearCart() {
    setLoading(true);
    try {
      const data = await ClearToCart();
      toast.success(data.message);
      const updatedCart = await GetCartItems();
      setCart(updatedCart?.results?.products || []);
    } catch (error) {
      toast.error("فشل في تفريغ العربة");
      console.error("ClearCart error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCartItems() {
      setLoading(true);
      try {
        let data = await GetCartItems();
        setCart(data?.results?.products || []);
      } catch (error) {
        console.error("فشل في جلب بيانات العربة:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCartItems();
  }, [GetCartItems]);

  if (loading) {
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

  if (!Cart || Cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Cart</title>
          <meta name="description" content="عربتك فارغة، أضف بعض المنتجات." />
        </Helmet>

        <h4 className="text-center mt-5">لا توجد منتجات في العربة.</h4>

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
    <>
      <Helmet>
        <title>My Cart</title>
        <meta
          name="description"
          content="تصفح سلة المشتريات الخاصة بك وقم بمتابعة الشراء."
        />
      </Helmet>

      <div className="container my-5">
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary d-inline-flex align-items-center"
            onClick={BackPage}
          >
            <span className="me-2">←</span> back
          </button>
        </div>

        <h1 className="mb-4 text-primary fw-bold text-start">My Cart</h1>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <p className="fs-5 mb-2">
            {`الإجمالي الكلي: `}
            <strong className="text-success">
              {Cart.reduce(
                (acc, item) =>
                  acc + parseFloat(item.productId.finalPrice) * item.quantity,
                0
              ).toFixed(2)}{" "}
              ج.م
            </strong>
          </p>

          <Button onClick={ClearCart} variant="danger">
            تفريغ العربة
          </Button>
        </div>

        {Cart.map((item, index) => {
          const product = item.productId;
          const quantity = item.quantity;
          const total = (parseFloat(product.finalPrice) * quantity).toFixed(2);

          return (
            <div
              key={index}
              className="d-flex flex-column flex-md-row justify-content-between border rounded-4 p-3 mb-4 shadow-sm bg-light"
            >
              <div className="d-flex flex-column flex-md-row align-items-center flex-grow-1 text-center text-md-start">
                <img
                  src={product.defaultImage?.url}
                  alt={product.name}
                  className="img-fluid mb-3 mb-md-0 me-md-4 rounded shadow"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <h5 className="mb-1">{product.name}</h5>
                  <p className="mb-1 text-muted">
                    السعر الأصلي: {product.price} ج.م
                  </p>
                  <p className="mb-1 text-success">
                    السعر بعد الخصم: {product.finalPrice} ج.م
                  </p>
                  <p className="mb-1">الكمية: {quantity}</p>
                  <p className="mb-0">الإجمالي: {total} ج.م</p>
                </div>
              </div>

              <div className="text-center mt-3 mt-md-0">
                <div className="mb-2">
                  <Button
                    onClick={() =>
                      UpdateCart(item.productId._id, item.quantity + 1)
                    }
                    variant="success"
                    className="me-2"
                  >
                    + زيادة
                  </Button>

                  <Button
                    onClick={() =>
                      UpdateCart(item.productId._id, item.quantity - 1)
                    }
                    variant="danger"
                  >
                    - إنقاص
                  </Button>
                </div>
                <Button
                  onClick={() => deleteCartItems(item.productId._id)}
                  variant="outline-danger"
                >
                  🗑️ حذف المنتج
                </Button>
              </div>
            </div>
          );
        })}

        <div className="text-center mt-5">
          <Link
            to="/shippingaddress"
            className="btn btn-primary btn-lg w-100 w-md-auto px-4 py-3 rounded-pill shadow"
          >
            💳 متابعة الشراء
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
