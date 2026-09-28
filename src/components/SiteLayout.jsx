import { Link, NavLink } from "react-router-dom";

export default function SiteLayout({ user, wishlistCount, onLogout, children }) {
  return (
    <div className="site-shell" dir="ltr">
      <div className="announcement-bar">Free delivery on orders over EGP 2,000 <span>·</span> Shop with ease</div>
      <header className="site-header">
        <nav className="navbar navbar-expand-lg container site-nav" aria-label="Main navigation">
          <Link className="navbar-brand brand-mark" to="/" aria-label="Noma, home">noma<span>.</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Open navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavigation">
            <div className="navbar-nav nav-links me-auto">
              <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/">Home</NavLink>
              {user && <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/orders">Orders</NavLink>}
            </div>
            <div className="nav-actions">
              <Link className="nav-icon-link" to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} title="Wishlist">
                <span aria-hidden="true">&#9825;</span><span className="wishlist-count">{wishlistCount}</span>
              </Link>
              {user ? (
                <>
                  <Link className="account-link" to="/profile">Hi, {user.name.split(" ")[0]}</Link>
                  <button className="btn btn-outline-dark btn-sm signout-button" onClick={onLogout}>Log out</button>
                </>
              ) : (
                <Link className="btn btn-dark btn-sm login-nav-button" to="/login">Log in / Sign up</Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Link className="brand-mark footer-brand" to="/">noma<span>.</span></Link>
          <p>Everyday finds, thoughtfully chosen.</p>
          <div className="footer-links"><Link to="/">Home</Link><Link to="/profile">My account</Link><Link to="/orders">Orders</Link></div>
          <small>© 2026 Noma. A React course project demo.</small>
        </div>
      </footer>
    </div>
  );
}