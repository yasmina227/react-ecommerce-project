import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser, logoutUser } from '../../services/authService';

const StorefrontNavbar = () => {
  const [user, setUser] = useState(getCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart?.totalQuantity || 0);

  useEffect(() => setUser(getCurrentUser()), [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <div className="store-promo-bar">A little treat for your first order <span>Use HELLO10 for 10% off</span></div>
      <nav className="navbar navbar-expand-lg store-navbar">
        <div className="container">
          <Link className="navbar-brand store-brand" to="/" aria-label="Nook home">
            <span className="brand-mark"><i className="bi bi-bag-heart-fill" /></span>
            nook<span className="brand-period">.</span>
          </Link>
          <button className="navbar-toggler store-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#storeNavigation" aria-controls="storeNavigation" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-list" />
          </button>
          <div className="collapse navbar-collapse" id="storeNavigation">
            <div className="navbar-nav store-nav-links mx-auto">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/products">Shop all</NavLink>
              <NavLink className="nav-link" to="/products?category=beauty">Beauty</NavLink>
              <NavLink className="nav-link" to="/products?category=fragrances">Fragrance</NavLink>
            </div>
            <div className="store-nav-actions">
              <Link to="/wishlist" className="store-icon-link" aria-label="Wishlist" title="Wishlist"><i className="bi bi-heart" /></Link>
              {user ? (
                <div className="dropdown">
                  <button className="store-icon-link" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Account menu"><i className="bi bi-person-circle" /></button>
                  <ul className="dropdown-menu dropdown-menu-end store-dropdown">
                    <li><Link className="dropdown-item" to="/profile">My profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">Order history</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                  </ul>
                </div>
              ) : <Link to="/login" className="store-icon-link" aria-label="Sign in" title="Sign in"><i className="bi bi-person" /></Link>}
              <Link to="/cart" className="store-icon-link store-cart-link" aria-label={`Cart, ${cartCount} items`} title="Cart"><i className="bi bi-bag" />{cartCount > 0 && <span>{cartCount}</span>}</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default StorefrontNavbar;