import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1">
        {/* رسالة تظهر فقط عند عدم الاتصال */}
        <Offline>
          <div
            style={{
              backgroundColor: "#ffdddd",
              color: "#b00020",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ⚠️ لا يوجد اتصال بالإنترنت  او الاتصال ضعيف ! - بعض الميزات قد لا تعمل
          </div>
        </Offline>
        {children}
        {/* <Online>
          <div style={{ textAlign: "center", color: "green" }}>✅ أنت متصل بالإنترنت</div>
        </Online> */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
