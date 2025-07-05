import React, { useEffect } from "react";
import FeaturedProducts from "../../component/FeaturedProducts/FeaturedProducts";
import CategorysSlider2 from "../../component/MainSlider/CategorysSlider2";
import { getProduct } from "../../Redux/UserRedux/GetAllProductSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MainSlider from "../../component/MainSlider/MainSlider";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../../global.css";
import axios from "axios";
const UrlProgect = process.env.REACT_APP_API_URL;

const Home = () => {
  const dispatch = useDispatch();

  const { Products, IsLoding, IsError } = useSelector(
    (state) => state.GetAllProducts
  );

  const [categories, setCategories] = React.useState([]);
  const [catError, setCatError] = React.useState(null);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${UrlProgect}/category/`);
        setCategories(res.data.results);
        setCatError(null);
      } catch (err) {
        console.error(err);
        setCatError("حدث خطأ أثناء تحميل التصنيفات.");
      }
    };
    fetchCategories();
  }, []);

  if (IsLoding) {
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
  }

  if (IsError || catError) {
    return <div className="text-center text-danger">{IsError || catError}</div>;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Home</title>
      </Helmet>

      <Link
        to="/cart"
        className="position-fixed end-0 me-3 bg-success text-white rounded-circle d-flex justify-content-center align-items-center shadow"
        style={{
          width: "50px",
          height: "50px",
          zIndex: 1050,
          fontSize: "22px",
          textDecoration: "none",
          bottom: "20px",
        }}
        title="اذهب إلى العربة"
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </Link>

      <MainSlider />
      <CategorysSlider2 data={categories} />
      <FeaturedProducts data={Products} />
    </div>
  );
};

export default Home;
