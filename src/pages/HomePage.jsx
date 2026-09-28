import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/shopData";

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((product) => product.category))];

function ProductCard({ product, saved, onToggleWishlist }) {
  const navigate = useNavigate();

  const toggle = () => {
    if (!onToggleWishlist(product.id)) navigate("/login", { state: { from: "/wishlist" } });
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <button className={`favorite-button${saved ? " is-saved" : ""}`} onClick={toggle} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} title={saved ? "Remove from wishlist" : "Add to wishlist"}>
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}<span>★ {product.rating}</span></div>
        <h3>{product.name}</h3>
        <div className="product-price"><strong>EGP {product.price.toLocaleString("en-EG")}</strong>{product.oldPrice && <del>EGP {product.oldPrice.toLocaleString("en-EG")}</del>}</div>
      </div>
    </article>
  );
}

export default function HomePage({ user, wishlist, onToggleWishlist }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const products = useMemo(() => PRODUCTS.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSearch = product.name.includes(query.trim()) || product.category.includes(query.trim());
    return matchesCategory && matchesSearch;
  }), [category, query]);

  return (
    <>
      <section className="hero-band">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">MADE FOR YOUR EVERYDAY</span>
            <h1>Little details,<br /><em>big feeling.</em></h1>
            <p>Thoughtful pieces for your day, from considered accessories to forever essentials.</p>
            <a className="btn btn-dark hero-button" href="#shop">Explore the edit <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-visual" role="img" aria-label="A curated selection of fashion and accessories" />
          <div className="hero-note"><span>01 / 03</span><span>THE SEASONAL EDIT</span></div>
        </div>
      </section>

      <section className="container shop-section" id="shop">
        <div className="section-heading">
          <div><span className="eyebrow">THE NOMA EDIT</span><h2>Most loved</h2></div>
          <p>Everyday pieces with a point of view, ready to become part of your routine.</p>
        </div>
        <div className="shop-controls">
          <div className="category-tabs" role="group" aria-label="Filter by category">
            {CATEGORIES.map((item) => <button key={item} className={`category-tab${category === item ? " selected" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" /></label>
        </div>
        {products.length ? (
          <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} saved={wishlist.includes(product.id)} onToggleWishlist={onToggleWishlist} />)}</div>
        ) : <div className="empty-search">No products match your search. Try another keyword or category.</div>}
      </section>

      <section className="service-strip">
        <div className="container service-grid"><div><span>01</span><strong>Thoughtfully selected</strong><small>Pieces picked with care</small></div><div><span>02</span><strong>Delivery, made easy</strong><small>Keep track of every order</small></div><div><span>03</span><strong>Your account, in one place</strong><small>{user ? <Link to="/profile">Manage your profile</Link> : <Link to="/register">Create an account</Link>}</small></div></div>
      </section>
    </>
  );
}