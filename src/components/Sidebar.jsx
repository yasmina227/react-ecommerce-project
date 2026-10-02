import { NavLink } from "react-router-dom";

function Sidebar({ type }) {
  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: "bi-speedometer2" },
    { name: "Users", path: "/admin/users", icon: "bi-people" },
    { name: "Products", path: "/admin/products", icon: "bi-box-seam" },
    { name: "Categories", path: "/admin/categories", icon: "bi-grid" },
    { name: "Orders", path: "/admin/orders", icon: "bi-cart" },
    { name: "Shipping", path: "/admin/shipping", icon: "bi-truck" },
    { name: "Promo Codes", path: "/admin/promo-codes", icon: "bi-tag" },
    { name: "Banners", path: "/admin/banners", icon: "bi-image" },
  ];

  const sellerLinks = [
    { name: "Dashboard", path: "/seller", icon: "bi-speedometer2" },
    { name: "Profile", path: "/seller/profile", icon: "bi-person" },
    { name: "Products", path: "/seller/products", icon: "bi-box-seam" },
    { name: "Inventory", path: "/seller/inventory", icon: "bi-stack" },
    { name: "Orders", path: "/seller/orders", icon: "bi-cart" },
    { name: "Earnings", path: "/seller/earnings", icon: "bi-cash-stack" },
  ];

  const links = type === "admin" ? adminLinks : sellerLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <i className="bi bi-shop"></i>
        </div>

        <div>
          <h2>{type === "admin" ? "Admin Panel" : "Seller Panel"}</h2>
          <span>Management System</span>
        </div>
      </div>

      <div className="sidebar-section-title">
        {type === "admin" ? "ADMIN MENU" : "SELLER MENU"}
      </div>

      <nav className="sidebar-links">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === `/${type}`}
            className="sidebar-link"
          >
            <i className={`bi ${link.icon}`}></i>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">
          <i className="bi bi-person"></i>
        </div>

        <div>
          <strong>{type === "admin" ? "Administrator" : "Seller"}</strong>
          <small>Online</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
