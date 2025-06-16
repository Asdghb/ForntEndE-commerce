// ✅ Home.js
import React, { useEffect, useState } from "react";
import FeaturedProducts from "../../component/FeaturedProducts/FeaturedProducts";
import MainSlider from "../../component/MainSlider/MainSlider";
import CategorysSlider2 from "../../component/MainSlider/CategorysSlider2";
import { Helmet } from "react-helmet-async";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../global.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  // const handleCategoryClick = (category) => {
  //   navigate(`/SubCategory/${category._id}`, {
  //     state: { subcategories: category.subcategoryid },
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:3000/Product"),
          axios.get("http://localhost:3000/category/"),
        ]);
        setProducts(productsRes.data.results);
        setCategories(categoriesRes.data.results);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل البيانات.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Home</title>
      </Helmet>
      <MainSlider />
      <CategorysSlider2
        data={categories}
        // onCategoryClick={handleCategoryClick}
      />

      <FeaturedProducts data={products} />
    </div>
  );
};

export default Home;
