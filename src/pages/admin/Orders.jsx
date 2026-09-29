import { useState } from "react";

function Orders() {
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

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: status,
            }
          : order
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Order Management</h1>
          <p>Manage customer orders.</p>
        </div>
      </div>

      <div className="dashboard-box mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>

                  <td>{order.customer}</td>

                  <td>${order.total}</td>

                  <td>
                    <select
                      className={`form-select form-select-sm ${getStatusClass(
                        order.status
                      )}`}
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
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

export default Orders;