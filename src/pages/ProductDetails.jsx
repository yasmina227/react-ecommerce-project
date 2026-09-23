import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ProductDetails = () =>
     {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => 
    {
    const fetchProduct = async () =>
         {
      try 
      {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images[0]);
      } 
      catch (error)
       {
        console.error('error fetching product details:', error);
      }
       finally 
      {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) 
    {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) 
    {
    return (
      <div className="container my-5 text-center">
        <h3>no product found</h3>
        <Link to="/products" className="btn btn-primary mt-3">
        back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link to="/products" className="btn btn-outline-secondary mb-4">
        &rarr;
        back to products
      </Link>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm mb-3">
            <img
              src={selectedImage}
              alt={product.title}
              className="card-img-top p-3"
              style={{ maxHeight: '400px', objectFit: 'contain' }} />
          </div>
    
        <div className="d-flex gap-2 overflow-auto">
            {product.images?.map((img, idx) => (
         <img
         key={idx}
         src={img}
         alt={`preview-${idx}`}
         className={`img-thumbnail cursor-pointer ${selectedImage === img ? 'border-primary border-2' : ''}`}
         style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
           onClick={() => setSelectedImage(img)} />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">brand: <strong>{product.brand || 'Unknown'}</strong> | category: <strong>{product.category}</strong></p>
        
          <div className="mb-3">
            <span className="fs-3 fw-bold text-success">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="badge bg-danger ms-2">
             offer 
             {product.discountPercentage}%
              </span>
            )}
          </div>

          <p className="lead">{product.description}</p>

          <div className="mb-3">
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'} p-2 me-2`}>
              {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
            </span>
            <span className="badge bg-warning text-dark p-2">
              ★ {product.rating} / 5
            </span>
          </div>
          <button 
            className="btn btn-primary btn-lg mt-3 w-100" 
            disabled={product.stock === 0}  >
           add to cart
      </button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;