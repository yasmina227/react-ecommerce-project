import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import emailjs from "@emailjs/browser";
import { clearCart } from "../features/cart/CartSlice";

const Confirm = () => {
  const cart = useSelector((state) => state.cart) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  const guestData = JSON.parse(sessionStorage.getItem("guestCustomer")) || {};
  const customerInfo = user || guestData;

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isProcessing, setIsProcessing] = useState(false);

  const currentShipping = cart.cartItems.length > 0 ? cart.shippingFee : 0;
  const grandTotal = cart.totalAmount + currentShipping;

  const handleOrderCompletion = (paymentDetails = null) => {
    setIsProcessing(true);

    const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      trackingCode,
      customer: customerInfo,
      items: cart.cartItems,
      totalAmount: grandTotal,
      paymentMethod,
      paymentId: paymentDetails?.id || "COD-OFFLINE",
      status: "Placed",
      createdAt: Date.now(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    localStorage.setItem(
      "myOrders",
      JSON.stringify([...existingOrders, newOrder]),
    );

    const emailParams = {
      to_name: customerInfo.fullName || customerInfo.name || "Valued Customer",
      to_email: customerInfo.email,
      order_id: trackingCode,
      total_amount: grandTotal.toFixed(2),
      shipping_address: customerInfo.address || "Address provided during order",
      items_summary: cart.cartItems
        .map((i) => `${i.title} (x${i.quantity || 1})`)
        .join(", "),
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        emailParams,
        "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        console.log("Confirmation Email Sent Successfully!");
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
      })
      .finally(() => {
        dispatch(clearCart());
        sessionStorage.removeItem("guestCustomer");
        setIsProcessing(false);

        navigate(`/track-order?code=${trackingCode}`);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">Order Confirmation</h2>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-light py-3">
              <h5 className="mb-0 fs-6 fw-bold d-flex align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Shipping Information
              </h5>
            </div>
            <div className="card-body">
              <p className="mb-1">
                <strong>Name:</strong>{" "}
                {customerInfo.name || "user"}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {customerInfo.email ||"user@gmail.com"}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {customerInfo.phone||"012345678902"}
              </p>
              <p className="mb-0">
                <strong>Address:</strong> {customerInfo.address||"US"},{" "}
                {customerInfo.city||"NewYork"}
              </p>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-header bg-light py-3">
              <h5 className="mb-0 fs-6 fw-bold d-flex align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2h13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                Order Summary ({cart.cartItems.length} items)
              </h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {cart.cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center py-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                        />
                      )}
                      <div>
                        <h6 className="mb-0 fs-6">{item.title}</h6>
                        <small className="text-muted">
                          Quantity: {item.quantity || 1}
                        </small>
                      </div>
                    </div>
                    <span className="fw-semibold">
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div
            className="card shadow-sm border-0 position-sticky"
            style={{ top: "20px" }}
          >
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0 fs-6">Payment Details</h5>
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping Fee</span>
                <span>${currentShipping.toFixed(2)}</span>
              </div>
              {cart.coupon?.isApplied && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount Applied</span>
                  <span>-${cart.coupon.discount || 0}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-4 h5 fw-bold">
                <span>Total Amount</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>

              <h6 className="fw-bold mb-3">Select Payment Method</h6>

              <div className="form-check p-3 border rounded mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label
                  className="form-check-label d-flex align-items-center justify-content-between w-100 ms-2"
                  htmlFor="paypal"
                >
                  <span>PayPal / Credit Card</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l.82-5.197-.026.167a.7.7 0 0 1 .691-.59h1.794c2.612 0 4.65-1.06 5.25-4.148.016-.08.026-.16.035-.24.168-.823.11-1.428-.128-1.914z" />
                  </svg>
                </label>
              </div>

              <div className="form-check p-3 border rounded mb-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label
                  className="form-check-label d-flex align-items-center justify-content-between w-100 ms-2"
                  htmlFor="cod"
                >
                  <span>Cash on Delivery (COD)</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm1 0v7h14V5H1z" />
                  </svg>
                </label>
              </div>

              {paymentMethod === "paypal" ? (
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AU2E3dieGWtfYzjZErP0pZglg35Pbc9Cx0D_G-ungPD97b6-lyXPc1pU7tJmNthh7dGdMF1ZPBK6DEW3",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical", height: 45 }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: grandTotal.toFixed(2) },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handleOrderCompletion(details);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <button
                  className="btn btn-success w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleOrderCompletion()}
                  disabled={isProcessing || grandTotal === 0}
                >
                  {isProcessing ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
