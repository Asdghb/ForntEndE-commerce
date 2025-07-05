import React from "react";
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 px-3 px-md-5 mt-1">
      <div className="container">
        {/* ✅ Section 1: Payment & Delivery */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 mb-4 border-bottom pb-3">
          {/* 💳 Payment Partners */}
          <div className="text-center text-md-start">
            <p className="mb-2 fw-bold">طرق الدفع المتاحة:</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <img
                src="https://www.svgrepo.com/show/508404/amazon-pay.svg"
                alt="Amazon Pay"
                width={50}
              />
              <img
                src="https://img.icons8.com/color/48/mastercard-logo.png"
                alt="Mastercard"
                width={40}
              />
              <img
                src="https://img.icons8.com/color/48/paypal.png"
                alt="Paypal"
                width={40}
              />
            </div>
          </div>

          {/* 📦 Delivery Apps */}
          <div className="text-center text-md-end">
            <p className="mb-2 fw-bold">حمّل تطبيق FreshCart الآن:</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#!" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://img.icons8.com/color/512/apple-app-store--v3.png"
                  alt="App Store"
                  width={35}
                />
              </a>
              <a href="#!" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://img.icons8.com/color/48/google-play.png"
                  alt="Google Play"
                  width={35}
                />
              </a>
            </div>
          </div>
        </div>
        {/* ✅ Section 2: Legal Links */}
        <div className="text-center d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="m-0">
            &copy; {new Date().getFullYear()} FreshCart. جميع الحقوق محفوظة.
          </p>

          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <a
              href="/privacy-policy"
              className="text-white text-decoration-none small"
            >
              سياسة الخصوصية
            </a>
            <a
              href="/terms-of-use"
              className="text-white text-decoration-none small"
            >
              الشروط والأحكام
            </a>
            <a
              href="/return-policy"
              className="text-white text-decoration-none small"
            >
              سياسة الاسترجاع
            </a>
            <a
              href="/contact"
              className="text-white text-decoration-none small"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
