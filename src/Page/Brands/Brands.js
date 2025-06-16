import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../Redux/UserRedux/BrandSlice";
import { Helmet } from "react-helmet-async";

const Brands = () => {
  const dispatch = useDispatch();
  const { Brands, IsLoding, IsError } = useSelector(({ Brand }) => Brand);

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
    <div className="container my-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand</title>
      </Helmet>
      <h2 className="mb-4">العلامات التجارية:</h2>
      <div className="row">
        {Brands.map((brand) => (
          <div className="col-md-3 mb-4" key={brand._id}>
            <div className="card shadow-sm h-100">
              <img
                src={brand.image.url}
                className="card-img-top"
                alt={brand.name}
                style={{ height: "120px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-capitalize">{brand.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
