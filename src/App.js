import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import MainLayout from "./component/MainLayout/MainLayout";
import Home from "./Page/Home/Home";
import ForgetCode from "./Page/ForgetCode/ForgetCode";
import ResetPassword from "./Page/ResetPassword/ResetPassword";
import Products from "./Page/Products/Products";
import Categories from "./Page/Categories/Categories";
import Brands from "./Page/Brands/Brands";
import Cart from "./Page/Cart/Cart";
import NotFoundPage from "./component/NotFoundPage/NotFoundPage";
import { useContext, useEffect } from "react";
import { StoryContext } from "./Context/CounterContext";
import Productdetails from "./Page/Productdetails/Productdetails";
import Shippingaddress from "./component/shippingaddress/Shippingaddress";
import PaymentSuccess from "./component/PaymentSuccess/PaymentSuccess";
import GetAllOrder from "./component/GetAllOrder/GetAllOrder";
import Admin from "./Page/Admin/Admin";
import ConfirmEmail from "./component/ConfirmEmail/ConfirmEmail";

function App() {
  let {
    UserToken,
    setUserToken,
    setIsLoading,
    isLoading,
    UserRole,
    setUserRole,
  } = useContext(StoryContext);

  const LoadingScreen = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="loader-overlay">
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </div>
  );

  useEffect(() => {
    const UserRole = JSON.parse(localStorage.getItem("RoleUser"));
    const token = localStorage.getItem("UserToken");
    if (token) {
      setUserToken(token);
    }
    if (UserRole) {
      setUserRole(UserRole);
    }
    setIsLoading(false);
  }, [setIsLoading, setUserToken, setUserRole]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              UserToken != null ? (
                <Navigate to="/" />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path="/Admin/*"
            element={
              isLoading ? (
                <LoadingScreen />
              ) : UserRole === "admin" ? (
                <MainLayout>
                  <Admin />
                </MainLayout>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/"
            element={
              UserToken == null ? (
                <Navigate to="/login" />
              ) : (
                <MainLayout>
                  <Home />
                </MainLayout>
              )
            }
          />
          {UserToken != null ? (
            <>
              <Route
                path="/Products"
                element={
                  <MainLayout>
                    <Products />
                  </MainLayout>
                }
              />
              <Route
                path="/Categories"
                element={
                  <MainLayout>
                    <Categories />
                  </MainLayout>
                }
              />
              <Route
                path="/Brands"
                element={
                  <MainLayout>
                    <Brands />
                  </MainLayout>
                }
              />
              <Route
                path="/Cart"
                element={
                  <MainLayout>
                    <Cart />
                  </MainLayout>
                }
              />
              <Route
                path="/shippingaddress"
                element={
                  <MainLayout>
                    <Shippingaddress />
                  </MainLayout>
                }
              />
              <Route
                path="/PaymentSuccess"
                element={
                  <MainLayout>
                    <PaymentSuccess />
                  </MainLayout>
                }
              />
              <Route
                path="/GetAllOrder"
                element={
                  <MainLayout>
                    <GetAllOrder />
                  </MainLayout>
                }
              />
              <Route
                path="/Productdetails/:id"
                element={
                  <MainLayout>
                    <Productdetails />
                  </MainLayout>
                }
              />
              <Route path="*" element={<NotFoundPage customPath="/" />} />
            </>
          ) : (
            <>
              <Route
                path="/Register"
                element={
                  <MainLayout>
                    <Register />
                  </MainLayout>
                }
              />
              <Route
                path="/ForgetCode"
                element={
                  <MainLayout>
                    <ForgetCode />
                  </MainLayout>
                }
              />
              <Route
                path="/ResetPassword"
                element={
                  <MainLayout>
                    <ResetPassword />
                  </MainLayout>
                }
              />
              <Route
                path="*"
                element={<NotFoundPage customPath="/Register" />}
              />
              <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
            </>
          )}
        </Routes>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
