// ✅ CategorysSlider2.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const CategorysSlider2 = ({ data, onCategoryClick }) => {
  console.log(data)
  return (
    <div style={{ padding: "10px" }}>
      <div className="flex justify-start items-start">
        <h1 className="p-1">Categories</h1>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {data?.map((category, index) => (
          <SwiperSlide key={index}>
            <div
              style={{ textAlign: "center", }}
              // onClick={() => onCategoryClick(category)}
            >
              <img
                src={category.image?.url}
                loading="lazy"
                alt={category.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              />
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <hr></hr>
    </div>
  );
};

export default CategorysSlider2;
