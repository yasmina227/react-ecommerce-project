import { useState } from "react";
import { Link } from "react-router-dom";
import { DEMO_ORDERS, PRODUCTS } from "../data/shopData";

function AccountHeading({ eyebrow, title, description }) {
  return <div className="account-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>;
}

function Profile({ user, onSave }) {
  const [form, setForm] = useState({ name: user.name || "", email: user.email || "", phone: user.phone || "", address: user.address || "" });
  const [saved, setSaved] = useState(false);
  const update = (event) => {
    setSaved(false);
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submit = (event) => {
    event.preventDefault();
    onSave(form);
    setSaved(true);
  };

  return (
    <section className="container account-section">
      <AccountHeading eyebrow="MY ACCOUNT" title="Your profile" description="Update your contact details and saved address." />
      <form className="profile-form account-form" onSubmit={submit}>
        <div className="profile-form-grid">
          <label>Full name<input name="name" value={form.name} onChange={update} autoComplete="name" required /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required /></label>
          <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" /></label>
          <label className="address-field">Address<input name="address" value={form.address} onChange={update} autoComplete="street-address" placeholder="City, street, building" /></label>
        </div>
        <div className="profile-form-actions">{saved && <span className="saved-note" role="status">Changes saved in this browser.</span>}<button className="btn btn-dark form-submit" type="submit">Save changes</button></div>
        <p className="demo-disclaimer">Payment details are not collected or stored in this demo.</p>
      </form>
    </section>
  );
}

function Wishlist({ wishlist, onToggleWishlist }) {
  const products = PRODUCTS.filter((product) => wishlist.includes(product.id));
  return (
    <section className="container account-section">
      <AccountHeading eyebrow="SAVED FOR LATER" title="Your wishlist" description="The pieces you love, all in one place." />
      {products.length ? <div className="product-grid">{products.map((product) => <article className="product-card" key={product.id}>
        <div className="product-image-wrap"><img className="product-image" src={product.image} alt={product.name} /><button className="favorite-button is-saved" onClick={() => onToggleWishlist(product.id)} aria-label={`Remove ${product.name} from wishlist`}>♥</button></div>
        <div className="product-info"><div className="product-category">{product.category}<span>★ {product.rating}</span></div><h3>{product.name}</h3><div className="product-price"><strong>EGP {product.price.toLocaleString("en-EG")}</strong></div></div>
      </article>)}</div> : <div className="empty-state"><span className="empty-heart">♡</span><h2>Your wishlist is waiting</h2><p>Save the pieces you love and find them here later.</p><Link className="btn btn-dark" to="/">Explore products</Link></div>}
    </section>
  );
}

function Orders() {
  return (
    <section className="container account-section">
      <AccountHeading eyebrow="MY ACCOUNT" title="Order history" description="Review your previous purchases and order status." />
      <div className="orders-list">{DEMO_ORDERS.map((order) => <article className="order-row" key={order.id}>
        <div className="order-main"><span className="order-number">Order {order.id}</span><span className="order-items">{order.items}</span></div>
        <div className="order-date">{order.date}</div>
        <div className="order-total">EGP {order.amount.toLocaleString("en-EG")}</div>
        <span className="order-status"><i />{order.status}</span>
      </article>)}</div>
      <p className="demo-disclaimer">These are sample orders for demonstration. No live payment or shipping service is connected.</p>
    </section>
  );
}

export default function AccountPages({ mode, user, onSave, wishlist, onToggleWishlist }) {
  if (mode === "profile") return <Profile user={user} onSave={onSave} />;
  if (mode === "wishlist") return <Wishlist wishlist={wishlist} onToggleWishlist={onToggleWishlist} />;
  return <Orders user={user} />;
}