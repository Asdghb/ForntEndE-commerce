import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, Carousel, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "../../global.css";
import { StoryContext } from "../../Context/CounterContext";

const Productdetails = () => {
  const UrlProgect = process.env.REACT_APP_API_URL;
  let { AddToCart } = useContext(StoryContext);
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState("");
  const queryClient = useQueryClient();

  async function AddToCart2(id) {
    await AddToCart(id);
  }

  // جلب بيانات المنتج
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

  // إرسال تعليق جديد (تم تصحيح الرابط هنا ✅)
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
      queryClient.invalidateQueries(["product", id]); // إعادة تحميل بيانات المنتج
    },
  });

  if (isLoading) {
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
        <meta charSet="utf-8" />
        <title>{name} 📱</title>
      </Helmet>

      <h2 className="mb-4 text-center">{name}</h2>

      <div className="row">
        <div className="col-md-6">
          {images?.length > 0 ? (
            <Carousel>
              {images.map((img) => (
                <Carousel.Item key={img._id}>
                  <img
                    className="d-block w-100"
                    src={img.url}
                    alt="product"
                    style={{
                      height: "400px",
                      objectFit: "contain",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Card.Img
              variant="top"
              src={defaultImage?.url}
              alt={name}
              style={{
                height: "400px",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
              }}
            />
          )}
        </div>

        <div className="col-md-6">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{description}</Card.Text>

              <div className="mb-2">
                <span className="text-decoration-line-through text-danger me-2">
                  {price}$
                </span>
                <span className="fw-bold text-success">{finalPrice}$</span>
                <Badge bg="warning" text="dark" className="ms-2">
                  خصم {discount}%
                </Badge>
              </div>

              <div className="mb-2">
                <small>عدد القطع المتوفرة: {availableItems}</small>
                <br />
                <small>عدد القطع المباعة: {soldItems}</small>
              </div>

              <button
                className="btn btn-primary mt-3"
                onClick={() => AddToCart2(id)}
              >
                أضف إلى السلة
              </button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* قسم التعليقات */}
      <div className="mt-5">
        <h4 className="mb-3">آراء المستخدمين</h4>

        {/* نموذج إضافة تعليق */}
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
                تم التعليق في{" "}
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
