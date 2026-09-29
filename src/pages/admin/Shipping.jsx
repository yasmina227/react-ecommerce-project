import { useEffect, useState } from "react";
import { getAllOrders, getAllUsers } from "../../services/adminService";

function Shipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const [ordersData, usersData] = await Promise.all([
        getAllOrders(),
        getAllUsers(),
      ]);

      const usersMap = {};
      usersData.forEach((user) => {
        usersMap[user.id] = `${user.firstName} ${user.lastName}`;
      });

      const formatted = ordersData.map((order) => ({
        id: order.id,
        customer: usersMap[order.userId] || `User #${order.userId}`,
        shippingStatus: "Pending",
      }));

      setOrders(formatted);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateShippingStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, shippingStatus: status } : order
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Processing":
        return "status-processing";
      case "Shipping":
        return "status-shipped";
      case "Delivered":
        return "status-delivered";
      default:
        return "status-pending";
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        Error: {error}
        <button className="btn btn-sm btn-dark ms-3" onClick={fetchOrders}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Shipping Management</h1>
          <p>Track and update shipping status.</p>
        </div>
      </div>

      <div className="dashboard-box mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Shipping Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>

                  <td>
                    <span
                      className={`badge ${getStatusClass(
                        order.shippingStatus
                      )}`}
                    >
                      {order.shippingStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      className={`form-select ${getStatusClass(
                        order.shippingStatus
                      )}`}
                      value={order.shippingStatus}
                      onChange={(e) =>
                        updateShippingStatus(order.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shipping;