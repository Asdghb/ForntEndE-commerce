import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleShare = () => {
    // هنا يمكنك إضافة منطق إرسال الرابط بالبريد إذا أردت
    console.log("Email to send:", email);

    // تفريغ الحقل بعد الضغط
    setEmail("");
  };
  return (
    <>
      {/* <div className="bg-dark mt-5 p-4">
        <div className="text-center text-white">
          <h5>Get the FreshCart app</h5>
          <p>
            We will send you a link, open it on your phone to download the app
          </p>
        </div>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control w-50"
            placeholder="البريد الإلكتروني..."
          />
          <button className="btn btn-success" onClick={handleShare}>
            أرسل الرابط
          </button>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0 text-white">
            Payment Partners:
            <img
              src="https://www.svgrepo.com/show/508404/amazon-pay.svg"
              alt="Amazon Pay"
              width={80}
              className="mx-2"
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
              className="ms-2"
            />
          </p>

          <p className="mb-0 text-white">
            Get deliveries with FreshCart:
            <img
              src="https://img.icons8.com/ios-filled/50/000000/apple-app-store--v1.png"
              alt="AppStore"
              width={30}
              className="mx-2"
            />
            <img
              src="https://img.icons8.com/color/48/google-play.png"
              alt="GooglePlay"
              width={30}
            />
          </p>
        </div>
      </div> */}
      <div className="bg-dark p-4">
        <div className="text-center text-white">
          <h5>Get the FreshCart app</h5>
          <p>
            We will send you a link, open it on your phone to download the app
          </p>
        </div>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control w-50"
            placeholder="البريد الإلكتروني..."
          />
          <button className="btn btn-success" onClick={handleShare}>
            أرسل الرابط
          </button>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0 text-white">
            Payment Partners:
            <img
              src="https://www.svgrepo.com/show/508404/amazon-pay.svg"
              alt="Amazon Pay"
              width={80}
              className="mx-2"
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
              className="ms-2"
            />
          </p>

          <p className="mb-0 text-white">
            Get deliveries with FreshCart:
            <img
              src="https://img.icons8.com/color/512/apple-app-store--v3.png"
              alt="AppStore"
              width={30}
              className="mx-2"
            />
            <img
              src="https://img.icons8.com/color/48/google-play.png"
              alt="GooglePlay"
              width={30}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
