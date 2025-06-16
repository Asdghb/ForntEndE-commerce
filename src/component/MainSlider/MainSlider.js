import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import m2 from "../../Assets/Images/img2.jpg";
import m5 from "../../Assets/Images/m5.jpg";
import m6 from "../../Assets/Images/m6.jpg";
import m7 from "../../Assets/Images/m7.jpg";
import m8 from "../../Assets/Images/m8.avif";
import m9 from "../../Assets/Images/m9.avif";
import m10 from "../../Assets/Images/m10.jpg";
import m11 from "../../Assets/Images/m11.avif";
import m12 from "../../Assets/Images/m12.avif";
import m13 from "../../Assets/Images/m13.avif";
import m14 from "../../Assets/Images/m14.avif";
import m15 from "../../Assets/Images/m15.avif";
import m16 from "../../Assets/Images/m16.avif";
import m17 from "../../Assets/Images/m17.avif";
import m18 from "../../Assets/Images/m18.avif";
import m19 from "../../Assets/Images/m19.avif";
import m20 from "../../Assets/Images/m20.avif";
import m21 from "../../Assets/Images/m21.avif";
import m22 from "../../Assets/Images/m22.avif";

const images = [
  m2,
  m5,
  m6,
  m7,
  m8,
  m9,
  m10,
  m11,
  m12,
  m13,
  m14,
  m15,
  m16,
  m17,
  m18,
  m19,
  m20,
  m21,
  m22,
];

const MainSlider = () => {
  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "20px" }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={2} // ← عرض 3 صور بجانب بعض
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        style={{ borderRadius: "30px" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover", // أو "contain" للحفاظ على أبعاد الصورة الأصلية
                  borderRadius: "16px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <hr></hr>
    </div>
  );
};

export default MainSlider;
