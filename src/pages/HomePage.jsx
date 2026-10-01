import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getCategories } from '../services/productService';
import StoreProductCard from '../components/storefront/StoreProductCard';

const categoryLooks = {
  beauty: { icon: 'bi-stars', label: 'Beauty & care' },
  fragrances: { icon: 'bi-flower1', label: 'Fragrance' },
  furniture: { icon: 'bi-lamp', label: 'Home finds' },
  'home-decoration': { icon: 'bi-house-heart', label: 'Home decor' },
  groceries: { icon: 'bi-basket2', label: 'Everyday goods' },
  'womens-bags': { icon: 'bi-handbag', label: 'Accessories' },
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    Promise.all([getAllProducts(), getCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData.slice(0, 4));
        setCategories(categoryData.slice(0, 6));
      })
      .catch(() => setError('We could not load the shop right now. Please try again in a moment.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="store-hero">
        <div className="container">
          <div className="hero-panel">
            <div className="hero-copy">
              <span className="eyebrow"><span /> THE EVERYDAY, CONSIDERED</span>
              <h1>Find the little<br />things that feel <em>like you.</em></h1>
              <p>Good design, useful details, and feel-good finds for wherever life takes you.</p>
              <div className="hero-actions"><Link to="/products" className="btn btn-store-primary">Explore the shop <i className="bi bi-arrow-up-right" /></Link><span className="hero-caption">A better kind of browsing.</span></div>
              <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span></div><span>Loved by <strong>2,400+</strong> happy shoppers</span></div>
            </div>
            <div className="hero-visual" role="img" aria-label="A favorite everyday sneaker"><div className="hero-photo" /><div className="hero-sticker"><i className="bi bi-sparkle" /><span>Good things<br />live here</span></div><div className="hero-image-label"><span>THE WEEKEND EDIT</span><i className="bi bi-arrow-down-right" /></div></div>
            <div className="hero-index">01 <span>/</span> 04</div>
          </div>
        </div>
      </section>

      <section className="service-strip"><div className="container"><div className="service-item"><i className="bi bi-box-seam" /><span><strong>Free delivery</strong> on orders over $50</span></div><div className="service-item"><i className="bi bi-arrow-repeat" /><span><strong>Easy returns</strong> within 30 days</span></div><div className="service-item"><i className="bi bi-shield-check" /><span><strong>Secure checkout</strong> every time</span></div><div className="service-item"><i className="bi bi-chat-heart" /><span><strong>Real humans</strong> ready to help</span></div></div></section>

      <section className="store-section container">
        <div className="section-heading"><div><span className="eyebrow">A GOOD PLACE TO START</span><h2>Shop by feeling</h2></div><Link to="/products" className="store-text-link">See everything <i className="bi bi-arrow-up-right" /></Link></div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const look = categoryLooks[category] || { icon: 'bi-stars', label: category.replaceAll('-', ' ') };
            return <Link className={`category-tile category-tile-${index % 4}`} key={category} to={`/products?category=${encodeURIComponent(category)}`}><span className="category-icon"><i className={`bi ${look.icon}`} /></span><span>{look.label}</span><i className="bi bi-arrow-up-right category-arrow" /></Link>;
          })}
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">THE ONES YOU CAME FOR</span><h2>Little things, big favorites</h2></div><Link to="/products" className="store-text-link">Shop all finds <i className="bi bi-arrow-up-right" /></Link></div>
          {error && <div className="alert alert-light border" role="alert">{error}</div>}
          {loading ? <div className="row g-4">{[1, 2, 3, 4].map((item) => <div className="col-6 col-lg-3" key={item}><div className="product-skeleton" /></div>)}</div> : <div className="row g-4">{products.map((product) => <div className="col-6 col-lg-3" key={product.id}><StoreProductCard product={product} /></div>)}</div>}
        </div>
      </section>

      <section className="newsletter-section"><div className="container newsletter-inner"><div><span className="eyebrow">GOOD THINGS, OCCASIONALLY</span><h2>A little note from nook.</h2><p>Fresh finds, small joys, and a welcome treat for your next order.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label className="visually-hidden" htmlFor="newsletterEmail">Email address</label><input id="newsletterEmail" type="email" className="form-control" placeholder="Your email address" required /><button className="btn btn-store-primary" type="submit">{subscribed ? 'You are on the list' : 'Count me in'} <i className={`bi ${subscribed ? 'bi-check2' : 'bi-arrow-right'}`} /></button><small>{subscribed ? 'Thanks for joining us. This demo stores no email addresses.' : 'By subscribing, you agree to our email updates. Unsubscribe anytime.'}</small></form></div></section>
    </>
  );
};

export default HomePage;