import { useEffect, useState } from "react";

function SellerOrders() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("sellerOrders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [
          {
            id: 1001,
            customer: "Ahmed Mohamed",
            total: 120,
            status: "Pending",
          },
          {
            id: 1002,
            customer: "Sara Ali",
            total: 85,
            status: "Processing",
          },
          {
            id: 1003,
            customer: "Omar Hassan",
            total: 200,
            status: "Shipped",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("sellerOrders", JSON.stringify(orders));
  }, [orders]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
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
      return "";
  }
};

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Seller Orders</h1>
          <p>Manage your customer orders.</p>
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
                <td colSpan="4" className="text-center py-4">
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
                      className={`form-select ${getStatusClass(
                        order.status
                      )}`}
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
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

export default SellerOrders;