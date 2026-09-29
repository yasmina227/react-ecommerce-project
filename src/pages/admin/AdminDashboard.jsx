import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://dummyjson.com/products";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: "Ahmed Mohamed",
      total: 150,
      status: "Delivered",
    },
    {
      id: 1002,
      customer: "Sara Ali",
      total: 90,
      status: "Pending",
    },
  ]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(API);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalSellers = 1;
  const totalUsers = 3;

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "dashboard-status pending";

      case "Processing":
        return "dashboard-status processing";

      case "Shipped":
        return "dashboard-status shipped";

      case "Delivered":
        return "dashboard-status delivered";

      case "Cancelled":
        return "dashboard-status cancelled";

      default:
        return "dashboard-status";
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <div>
          <span className="page-label">OVERVIEW</span>
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening in your store.</p>
        </div>

        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>
          <span>Store Overview</span>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-3 col-md-6">
          <div className="stat-card users-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <i className="bi bi-people"></i>
              </div>

              <span className="stat-change">
                <i className="bi bi-arrow-up"></i>
                Active
              </span>
            </div>

            <p>Total Users</p>
            <h2>{totalUsers}</h2>
            <span className="stat-description">
              Registered users
            </span>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="stat-card products-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <i className="bi bi-box-seam"></i>
              </div>

              <span className="stat-change">
                <i className="bi bi-arrow-up"></i>
                Active
              </span>
            </div>

            <p>Total Products</p>
            <h2>{totalProducts}</h2>
            <span className="stat-description">
              Products in store
            </span>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="stat-card orders-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <i className="bi bi-cart3"></i>
              </div>

              <span className="stat-change">
                <i className="bi bi-arrow-up"></i>
                Today
              </span>
            </div>

            <p>Total Orders</p>
            <h2>{totalOrders}</h2>
            <span className="stat-description">
              Customer orders
            </span>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="stat-card sellers-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <i className="bi bi-shop"></i>
              </div>

              <span className="stat-change">
                <i className="bi bi-check-lg"></i>
                Active
              </span>
            </div>

            <p>Total Sellers</p>
            <h2>{totalSellers}</h2>
            <span className="stat-description">
              Store sellers
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-box recent-orders-box">
        <div className="box-header">
          <div>
            <span className="box-label">ORDERS</span>
            <h4>Recent Orders</h4>
          </div>

          <span className="orders-count">
            {totalOrders} Orders
          </span>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table align-middle">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>TOTAL</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong className="order-id">
                        #{order.id}
                      </strong>
                    </td>

                    <td>
                      <div className="customer-info">
                        <div className="customer-avatar">
                          {order.customer.charAt(0)}
                        </div>

                        <span>{order.customer}</span>
                      </div>
                    </td>

                    <td>
                      <strong>${order.total}</strong>
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          order.status
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;