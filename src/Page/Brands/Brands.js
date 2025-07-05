import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../Redux/UserRedux/BrandSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Brands = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Brands, IsLoding, IsError } = useSelector(({ Brand }) => Brand);

  const BackPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  if (IsLoding)
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

  if (IsError)
    return <div className="alert alert-danger">فشل في تحميل البيانات</div>;

  return (
    <div className="container my-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>العلامات التجارية</title>
      </Helmet>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <button
          className="btn btn-outline-secondary d-inline-flex align-items-center"
          onClick={BackPage}
        >
          <span className="me-2">←</span> الرجوع
        </button>
        <h2 className="text-primary fw-bold mb-2">🏷️ العلامات التجارية</h2>
      </div>

      <div className="row g-4">
        {Brands.map((brand) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={brand._id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 brand-card overflow-hidden">
              <div
                className="bg-light d-flex align-items-center justify-content-center"
                style={{ height: "150px" }}
              >
                <img
                  src={brand.image.url}
                  alt={brand.name}
                  className="img-fluid p-2"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title text-capitalize fw-bold">
                  {brand.name}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
