import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoryContext } from "../../Context/CounterContext";

const FeaturedProducts = ({ data }) => {
  let { AddToCart } = useContext(StoryContext);

  async function ProIdToCart(id) {
    let data = await AddToCart(id);
  }

  return (
    <div className="container py-4">
      <div className="flex justify-start items-start">
        <h1 className="p-1">Product</h1>
      </div>
      <div className="row">
        {data?.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
            <Card className="h-100 shadow-sm d-flex flex-column">
              <Link
                to={`/Productdetails/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Img
                  variant="top"
                  src={product.defaultImage?.url}
                  alt={product.name}
                  style={{
                    height: "180px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                />
                <Card.Body style={{ fontSize: "0.9rem" }}>
                  <Card.Title className="fs-6">{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-1 text-truncate">
                    {product.description}
                  </Card.Text>
                  <div className="mb-2">
                    <span className="text-decoration-line-through text-danger me-2">
                      {product.price}$
                    </span>
                    <span className="fw-bold text-success">
                      {product.finalPrice}$
                    </span>
                  </div>
                  <div className="small">
                    <div>المتوفر: {product.availableItems}</div>
                    <div>تم البيع: {product.soldItems}</div>
                  </div>
                </Card.Body>
              </Link>
              <div className="px-3 pb-3 mt-auto">
                <Button
                  onClick={() => ProIdToCart(product.id)}
                  variant="primary"
                  className="w-100"
                  size="sm"
                >
                  أضف إلى السلة
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
