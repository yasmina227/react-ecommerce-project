import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, updateCurrentUser } from '../services/authService';

const AccountPage = ({ initialTab = 'profile' }) => {
  const [user, setUser] = useState(getCurrentUser);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', paymentPreference: 'cash' });

  useEffect(() => {
    if (!user) return;
    setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', paymentPreference: 'cash', ...user });
    const allOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    setOrders(allOrders.filter((order) => order.customer?.email?.toLowerCase() === user.email?.toLowerCase()));
  }, [user]);

  useEffect(() => setActiveTab(initialTab), [initialTab]);

  if (!user) return <div className="container account-gate"><div className="account-empty-icon"><i className="bi bi-person-lock" /></div><h1>Your account, your way.</h1><p>Sign in to manage your profile and keep track of your orders.</p><Link to="/login" className="btn btn-store-primary">Sign in</Link></div>;

  const saveProfile = (event) => {
    event.preventDefault();
    const updated = updateCurrentUser(form);
    setUser(updated);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2800);
  };

  return (
    <section className="account-page container">
      <div className="account-heading"><span className="eyebrow">YOUR LITTLE CORNER</span><h1>Hi, {user.firstName || 'there'}.</h1><p>Everything you need, all in one place.</p></div>
      <div className="account-layout">
        <aside className="account-sidebar"><div className="account-user-card"><div className="account-avatar">{user.firstName?.[0]?.toUpperCase() || <i className="bi bi-person" />}</div><div><strong>{user.firstName} {user.lastName}</strong><small>{user.email}</small></div></div><nav className="account-nav"><button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}><i className="bi bi-person" /> Personal details</button><button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}><i className="bi bi-box-seam" /> Order history</button><Link to="/wishlist"><i className="bi bi-heart" /> Saved favorites</Link></nav></aside>
        <div className="account-content">
          {activeTab === 'profile' ? <div className="account-panel"><div className="account-panel-heading"><div><h2>Personal details</h2><p>Update the details attached to your account.</p></div><i className="bi bi-person-vcard" /></div>{saved && <div className="alert alert-success py-2" role="status">Your details have been saved.</div>}<form className="profile-form" onSubmit={saveProfile}><div className="row g-3"><div className="col-md-6"><label className="form-label" htmlFor="profileFirstName">First name</label><input className="form-control" id="profileFirstName" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} required /></div><div className="col-md-6"><label className="form-label" htmlFor="profileLastName">Last name</label><input className="form-control" id="profileLastName" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} required /></div><div className="col-md-6"><label className="form-label" htmlFor="profileEmail">Email address</label><input className="form-control" id="profileEmail" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></div><div className="col-md-6"><label className="form-label" htmlFor="profilePhone">Phone number</label><input className="form-control" id="profilePhone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div><div className="col-12"><label className="form-label" htmlFor="profileAddress">Delivery address</label><input className="form-control" id="profileAddress" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} placeholder="Street and building" /></div><div className="col-md-6"><label className="form-label" htmlFor="profileCity">City</label><input className="form-control" id="profileCity" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} /></div><div className="col-md-6"><label className="form-label" htmlFor="paymentPreference">Preferred payment</label><select className="form-select" id="paymentPreference" value={form.paymentPreference} onChange={(event) => setForm({ ...form, paymentPreference: event.target.value })}><option value="cash">Cash on delivery</option><option value="card">Credit / debit card</option><option value="paypal">PayPal</option></select></div></div><div className="profile-form-footer"><span><i className="bi bi-lock" /> Payment details are handled at checkout.</span><button className="btn btn-store-primary" type="submit">Save changes <i className="bi bi-check2" /></button></div></form></div> : <div className="account-panel"><div className="account-panel-heading"><div><h2>Order history</h2><p>All the good things headed your way.</p></div><i className="bi bi-box-seam" /></div>{orders.length ? <div className="order-list">{orders.map((order) => <article className="order-row" key={order.trackingCode || order.createdAt}><div className="order-icon"><i className="bi bi-box" /></div><div className="order-info"><strong>{order.trackingCode || 'Order'}</strong><span>{new Date(order.createdAt || Date.now()).toLocaleDateString()} · {order.items?.length || 0} items</span></div><span className="order-status">{order.status || 'Placed'}</span><strong className="order-total">${Number(order.totalAmount || 0).toFixed(2)}</strong></article>)}</div> : <div className="account-orders-empty"><span className="account-empty-icon"><i className="bi bi-box2-heart" /></span><h3>No orders just yet</h3><p>Your next favorite thing is waiting to be found.</p><Link to="/products" className="btn btn-store-outline">Explore the shop</Link></div>}</div>}
        </div>
      </div>
    </section>
  );
};

export default AccountPage;