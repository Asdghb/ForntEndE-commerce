import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, Carousel, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "../../global.css";
import { StoryContext } from "../../Context/CounterContext";
import { useNavigate } from "react-router-dom";

const Productdetails = () => {
  const navigate = useNavigate();
  const UrlProgect = process.env.REACT_APP_API_URL;
  const { AddToCart } = useContext(StoryContext);
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState("");
  const queryClient = useQueryClient();

  const BackPage = () => {
    navigate(-1);
  };

  async function AddToCart2(id) {
    await AddToCart(id);
  }

  const fetchProductDetails = async (id) => {
    const res = await axios.get(`${UrlProgect}/Product/${id}`);
    return res.data.results;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
  });

  const headers = {
    token: `Route__${localStorage.getItem("UserToken")}`,
  };

  const addReviewMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${UrlProgect}/Reviews/AddReview`,
        {
          content: reviewContent,
          productId: id,
        },
        { headers }
      );
      return res.data;
    },
    onSuccess: () => {
      setReviewContent("");
      queryClient.invalidateQueries(["product", id]);
    },
  });

  if (isLoading) {
    return (
      <div className="loader-overlay">
        <section className="dots-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </section>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-danger text-center mt-5">
        حدث خطأ أثناء تحميل تفاصيل المنتج.
      </div>
    );
  }

  const {
    name,
    description,
    defaultImage,
    images,
    price,
    finalPrice,
    discount,
    availableItems,
    soldItems,
    reviews,
  } = data;

  return (
    <div className="container py-4">
      <Helmet>
        <title>{name} 📱</title>
      </Helmet>
      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={BackPage}>
          ← back
        </button>
      </div>
      <h2 className="mb-4 text-center">{name}</h2>
      <div className="row gy-4">
        {/* صور المنتج */}
        <div className="col-12 col-md-6">
          <div className="ratio ratio-4x3 bg-light rounded overflow-hidden">
            {images?.length > 0 ? (
              <Carousel>
                {images.map((img) => (
                  <Carousel.Item key={img._id}>
                    <img
                      src={img.url}
                      alt="product"
                      className="d-block w-100 img-fluid"
                      style={{ objectFit: "contain", maxHeight: "400px" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img
                src={defaultImage?.url}
                alt={name}
                className="w-100 img-fluid"
                style={{ objectFit: "contain", maxHeight: "400px" }}
              />
            )}
          </div>
        </div>

        {/* معلومات المنتج */}
        <div className="col-12 col-md-6">
          <Card className="shadow-sm w-100 h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>{name}</Card.Title>
              <Card.Text className="mb-2">{description}</Card.Text>

              <div className="mb-2">
                <span className="text-decoration-line-through text-danger me-2">
                  {price}$
                </span>
                <span className="fw-bold text-success">{finalPrice}$</span>
                <Badge bg="warning" text="dark" className="ms-2">
                  خصم {discount}%
                </Badge>
              </div>

              <div className="small mb-3 text-muted">
                <div>عدد القطع المتوفرة: {availableItems}</div>
                <div>عدد القطع المباعة: {soldItems}</div>
              </div>

              <button
                className="btn btn-primary mt-auto"
                onClick={() => AddToCart2(id)}
              >
                أضف إلى السلة
              </button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* التعليقات */}
      <div className="mt-5">
        <h4 className="mb-3">آراء المستخدمين</h4>

        {/* نموذج كتابة تعليق */}
        <div className="mb-4">
          <textarea
            className="form-control"
            rows="3"
            placeholder="اكتب تعليقك هنا..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
          <button
            className="btn btn-outline-success mt-2"
            onClick={() => addReviewMutation.mutate()}
            disabled={!reviewContent.trim() || addReviewMutation.isLoading}
          >
            {addReviewMutation.isLoading ? "جاري الإرسال..." : "إضافة تعليق"}
          </button>
        </div>

        {/* عرض التعليقات */}
        {reviews?.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="border p-3 rounded mb-2 bg-light">
              <p className="mb-1">{rev.content}</p>
              <small className="text-muted">
                {new Date(rev.createdAt).toLocaleDateString("ar-EG")}
              </small>
            </div>
          ))
        ) : (
          <p className="text-muted">لا توجد تعليقات بعد.</p>
        )}
      </div>
    </div>
  );
};

export default Productdetails;
