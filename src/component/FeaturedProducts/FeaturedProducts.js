import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoryContext } from "../../Context/CounterContext";

const FeaturedProducts = ({ data }) => {
  const { AddToCart } = useContext(StoryContext);

  async function ProIdToCart(id) {
    await AddToCart(id);
  }

  return (
    <div className="container py-4">
      <div className="mb-3">
        <h2 className="fw-bold">Product</h2>
      </div>

      <div className="row">
        {data?.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
            key={product._id}
          >
            <Card className="shadow-sm w-100 d-flex flex-column mb-4">
              <Link
                to={`/Productdetails/${product._id}`}
                className="text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src={product.defaultImage?.url}
                  alt={product.name}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-2 text-truncate">
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

                  <div className="small text-muted mb-2">
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
