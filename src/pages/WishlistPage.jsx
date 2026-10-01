import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/productService';
import StoreProductCard from '../components/storefront/StoreProductCard';
import { getWishlist } from '../services/wishlistService';

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((allProducts) => {
        const savedIds = getWishlist();
        setProducts(allProducts.filter((product) => savedIds.includes(product.id)));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return <section className="container wishlist-page"><div className="account-heading"><span className="eyebrow">THE ONES YOU LOVE</span><h1>Your saved finds</h1><p>A little collection of things worth coming back to.</p></div>{loading ? <div className="text-center py-5"><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading favorites</span></div></div> : products.length ? <div className="row g-4">{products.map((product) => <div className="col-6 col-lg-3" key={product.id}><StoreProductCard product={product} onWishlistChange={(id, isSaved) => { if (!isSaved) setProducts((current) => current.filter((item) => item.id !== id)); }} /></div>)}</div> : <div className="wishlist-empty"><span className="account-empty-icon"><i className="bi bi-heart" /></span><h2>Nothing saved for now</h2><p>When something catches your eye, tap the heart to keep it here.</p><Link className="btn btn-store-primary" to="/products">Find your next favorite <i className="bi bi-arrow-right" /></Link></div>}</section>;
};

export default WishlistPage;