import { useState } from "react";

function Shipping() {
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

  const updateShippingStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              shippingStatus: status,
            }
          : order
      )
    );
  };

  const getShippingStatus = (order) => {
    if (order.shippingStatus) {
      return order.shippingStatus;
    }

    if (order.status === "Delivered") {
      return "Delivered";
    }

    if (order.status === "Shipped") {
      return "Shipping";
    }

    return "Pending";
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
                <td
                  colSpan="4"
                  className="text-center py-4"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const shippingStatus =
                  getShippingStatus(order);

                return (
                  <tr key={order.id}>
                    <td>#{order.id}</td>

                    <td>{order.customer}</td>

                    <td>
                      <span
                        className={`badge ${getStatusClass(
                          shippingStatus
                        )}`}
                      >
                        {shippingStatus}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`form-select ${getStatusClass(
                          shippingStatus
                        )}`}
                        value={shippingStatus}
                        onChange={(e) =>
                          updateShippingStatus(
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

                        <option value="Shipping">
                          Shipping
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shipping;