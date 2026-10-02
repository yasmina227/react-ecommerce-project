import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cart/CartSlice";

const ProductCard = ({ product, isInCart }) => {
  // ------------------------ ADD AND REMOVE FROM CART------------------
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //  --------------------------------------------------------------------
  return (
    <div className="card h-100 shadow-sm border-0 position-relative">
      <div className="text-center p-3" style={{ backgroundColor: "#f8f9fa" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top img-fluid"
          style={{ height: "180px", objectFit: "contain" }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <small className="text-uppercase text-muted fw-bold">
            {product.category}
          </small>
          <span className="badge bg-warning text-dark">★ {product.rating}</span>
        </div>

        <h6
          className="card-title text-truncate fw-bold mb-2"
          title={product.title}
        >
          {product.title}
        </h6>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5 fw-bold text-primary">${product.price}</span>
          <span
            className={`badge ${product.stock > 0 ? "bg-success" : "bg-danger"}`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary btn-sm flex-grow-1"
          >
            Details
          </Link>

          <span className="">
            {isInCart ? (
              <button
                className="btn text-danger border"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                remove from cart
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(product))}
                disabled={product.stock === 0}
              >
                add to cart
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
