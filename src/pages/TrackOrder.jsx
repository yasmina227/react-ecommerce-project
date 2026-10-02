import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(
    JSON.parse(localStorage.getItem("guestCustomer")),
  );
  const [error, setError] = useState("");

  const STEPS = ["Placed", "Processing", "Shipped", "Delivered"];

  const calculateCurrentStatus = (createdAt) => {
    const minutesPassed = (Date.now() - createdAt) / (1000 * 60);

    if (minutesPassed < 2) return "Placed";
    if (minutesPassed < 5) return "Processing";
    if (minutesPassed < 10) return "Shipped";
    return "Delivered";
  };

  const handleSearch = (codeToSearch) => {
    setError("");
    const formattedCode = codeToSearch.trim().toUpperCase();

    if (!formattedCode) {
      setError("Please enter a tracking code");
      setOrderDetails(null);
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    const foundOrder = savedOrders.find(
      (order) => order.trackingCode === formattedCode,
    );

    if (foundOrder) {
      setOrderDetails({
        ...foundOrder,
        currentStatus: calculateCurrentStatus(foundOrder.createdAt),
      });
    } else {
      setOrderDetails(null);
      setError(
        "No order found with this tracking code. Please check your email.",
      );
    }
  };

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      setTrackingCode(codeFromUrl);
      handleSearch(codeFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(trackingCode);
  };

  const getStepIndex = (status) => STEPS.indexOf(status);

  return (
    <div className="container my-5" style={{ maxWidth: "750px" }}>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-info text-white py-3">
          <h4 className="mb-0 fs-5 fw-semibold">Track Your Order</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="trackingInput" className="form-label fw-semibold">
              Tracking Code
            </label>
            <div className="input-group">
              <input
                type="text"
                id="trackingInput"
                className="form-control"
                placeholder="e.g. ORD-123456"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
              <button type="submit" className="btn btn-info px-4">
                Track
              </button>
            </div>
            {error && <div className="text-danger small mt-2">{error}</div>}
          </form>

          {orderDetails && (
            <div className="border rounded p-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-1 text-muted">Order ID</h6>
                  <span className="fw-bold fs-5 text-info">
                    {orderDetails.trackingCode}
                  </span>
                </div>
                <div className="text-end">
                  <h6 className="mb-1 text-muted">Current Status</h6>
                  <span className="badge bg-success fs-6 fw-normal py-2 px-3">
                    {orderDetails.currentStatus}
                  </span>
                </div>
              </div>

              <hr />

              {/* Stepper Progress Bar */}
              <div className="my-4 position-relative">
                <div className="d-flex justify-content-between align-items-center">
                  {STEPS.map((step, index) => {
                    const currentStepIndex = getStepIndex(
                      orderDetails.currentStatus,
                    );
                    const isCompleted = index <= currentStepIndex;

                    return (
                      <div
                        key={step}
                        className="text-center position-relative z-1"
                      >
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 fw-bold ${
                            isCompleted
                              ? "bg-success text-white"
                              : "bg-secondary text-white"
                          }`}
                          style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "14px",
                          }}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`small d-block ${
                            isCompleted ? "fw-bold text-success" : "text-muted"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr />

              <div className="row g-3 my-2">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-2">Customer Info</h6>
                  <p className="mb-1 small">
                    <strong>Name:</strong>{" "}
                    {orderDetails.customer?.fullName ||
                      orderDetails.customer?.name}
                  </p>
                  <p className="mb-1 small">
                    <strong>Email:</strong> {orderDetails.customer?.email}
                  </p>
                  <p className="mb-0 small">
                    <strong>Address:</strong> {orderDetails.customer?.address}{" "}
                    {orderDetails.customer?.city}
                  </p>
                </div>

                <div className="col-md-6">
                  <h6 className="fw-bold mb-2">Payment Summary</h6>
                  <p className="mb-1 small">
                    <strong>Method:</strong>{" "}
                    {orderDetails.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </p>
                  <p className="mb-1 small">
                    <strong>Payment ID:</strong> {orderDetails.paymentId}
                  </p>
                  <p className="mb-0 small">
                    <strong>Total Amount:</strong> $
                    {(orderDetails.totalAmount || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <hr />

              <h6 className="fw-bold mb-2">Items Ordered</h6>
              <ul className="list-group list-group-flush mb-3">
                {orderDetails.items?.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2 small"
                  >
                    <span>
                      {item.title} (x{item.quantity || 1})
                    </span>
                    <span className="fw-semibold">
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-info btn-sm px-4">
                  Back to Shop
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
