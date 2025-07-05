import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import m3 from "../../Assets/Images/m3.png";
import m6 from "../../Assets/Images/m6.png";
import m7 from "../../Assets/Images/m7.png";
import m8 from "../../Assets/Images/m8.png";

const images = [m3, m6, m7, m8];

const MainSlider = () => {
  return (
    <div style={{ width: "100%", padding: "20px", backgroundColor: "#fff" }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        style={{ borderRadius: "16px" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "50vw", // نسبة من عرض الشاشة، مناسبة للتجاوب
                maxHeight: "500px", // أقصى ارتفاع على الشاشات الكبيرة
                minHeight: "250px", // أقل ارتفاع على الشاشات الصغيرة
                backgroundColor: "#ffff",
                overflow: "hidden",
                borderRadius: "16px",
                border: "2px solid #ddd",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // يحافظ على أبعاد الصورة
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
