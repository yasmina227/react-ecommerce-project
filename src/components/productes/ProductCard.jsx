import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
     <div className="card h-100 shadow-sm border-0 position-relative">
     <div className="text-center p-3" style={{ backgroundColor: '#f8f9fa' }}>
     <img
         src={product.thumbnail}
         alt={product.title}
         className="card-img-top img-fluid"
         style={{ height: '180px', objectFit: 'contain' }}  />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <small className="text-uppercase text-muted fw-bold">{product.category}</small>
          <span className="badge bg-warning text-dark">
            ★ {product.rating}
          </span>
        </div>

        <h6 className="card-title text-truncate fw-bold mb-2" title={product.title}>
          {product.title}
        </h6>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5 fw-bold text-primary">${product.price}</span>
          <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="mt-auto d-flex gap-2">
          <Link to={`/products/${product.id}`} className="btn btn-outline-primary btn-sm flex-grow-1">
            Details
          </Link>
          <button 
         className="btn btn-primary btn-sm"
         disabled={product.stock === 0}>
            Add to Cart
          </button>
     </div>
     </div>
    </div>
  );
};

export default ProductCard;