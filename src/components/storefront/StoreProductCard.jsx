import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, toggleWishlistProduct } from '../../services/wishlistService';

const StoreProductCard = ({ product, onWishlistChange }) => {
  const [saved, setSaved] = useState(() => getWishlist().includes(product.id));

  const toggleSaved = () => {
    const isSaved = !saved;
    toggleWishlistProduct(product.id);
    setSaved(!saved);
    onWishlistChange?.(product.id, isSaved);
  };

  return (
    <article className="store-product-card">
      <div className="store-product-image-wrap">
        <Link to={`/products/${product.id}`} className="store-product-image-link" aria-label={`View ${product.title}`}>
          <img src={product.thumbnail || product.images?.[0]} alt={product.title} className="store-product-image" loading="lazy" />
        </Link>
        <button className={`product-heart${saved ? ' is-saved' : ''}`} onClick={toggleSaved} aria-label={saved ? 'Remove from favorites' : 'Add to favorites'} title={saved ? 'Remove from favorites' : 'Add to favorites'}><i className={`bi ${saved ? 'bi-heart-fill' : 'bi-heart'}`} /></button>
        {product.discountPercentage > 0 && <span className="product-discount">-{Math.round(product.discountPercentage)}%</span>}
      </div>
      <div className="store-product-info">
        <div className="product-meta"><span>{product.category}</span><span className="product-rating"><i className="bi bi-star-fill" /> {product.rating}</span></div>
        <Link to={`/products/${product.id}`} className="store-product-title">{product.title}</Link>
        <div className="store-product-price">${product.price.toFixed(2)}</div>
      </div>
    </article>
  );
};

export default StoreProductCard;