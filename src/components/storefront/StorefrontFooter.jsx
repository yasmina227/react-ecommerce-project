import React from 'react';
import { Link } from 'react-router-dom';

const StorefrontFooter = () => (
  <footer className="store-footer">
    <div className="container">
      <div className="row g-4 align-items-start">
        <div className="col-lg-5">
          <Link className="store-brand footer-brand" to="/">nook<span className="brand-period">.</span></Link>
          <p className="footer-note">Thoughtful finds for the everyday. Good things, gathered in one place.</p>
          <div className="footer-socials"><a href="https://instagram.com" aria-label="Instagram"><i className="bi bi-instagram" /></a><a href="https://pinterest.com" aria-label="Pinterest"><i className="bi bi-pinterest" /></a><a href="https://facebook.com" aria-label="Facebook"><i className="bi bi-facebook" /></a></div>
        </div>
        <div className="col-6 col-lg-2"><h2 className="footer-heading">Explore</h2><Link to="/products">Shop all</Link><Link to="/wishlist">Favorites</Link><Link to="/orders">Your orders</Link></div>
        <div className="col-6 col-lg-2"><h2 className="footer-heading">Your account</h2><Link to="/profile">My profile</Link><Link to="/login">Sign in</Link><Link to="/register">Create account</Link></div>
        <div className="col-lg-3"><h2 className="footer-heading">Here to help</h2><a href="mailto:hello@nook.example">hello@nook.example</a><p className="footer-hours">Sunday–Thursday, 9am–5pm</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 nook market</span><span>Made for finding your next favorite.</span></div>
    </div>
  </footer>
);

export default StorefrontFooter;