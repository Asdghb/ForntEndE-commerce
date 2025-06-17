import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Detector } from "react-detect-offline";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1">
        {/* رسالة تظهر فقط عند انقطاع الاتصال بالسيرفر */}
        <Detector
          polling={{
            url: "https://backende-commerce-t418.onrender.com/ping", // رابط السيرفر الخاص بك
            timeout: 5000,
            interval: 10000,
          }}
          render={({ online }) =>
            !online && (
              <div
                style={{
                  backgroundColor: "#ffdddd",
                  color: "#b00020",
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                ⚠️ لا يوجد اتصال بالخادم أو الإنترنت - بعض الميزات قد لا تعمل
              </div>
            )
          }
        />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
