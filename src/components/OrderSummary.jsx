import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyCoupon } from "../features/cart/CartSlice";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    totalQuantity = 0,
    totalAmount = 0,
    shippingFee = 0,
    coupon,
  } = useSelector((state) => state.cart || {});

  const [promoInput, setPromoInput] = useState("");
  const [statusMessage, setStatusMessage] = useState({
    text: "",
    isError: false,
  });
  const [discount, setDiscount] = useState(0);

  const VALID_CODES = {
    SAVE10: 10,
    DISCOUNT20: 20,
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();

    const formattedCode = promoInput.trim().toUpperCase();

    if (!formattedCode) {
      setStatusMessage({ text: "Please enter a promo code", isError: true });
      return;
    }

    if (VALID_CODES[formattedCode]) {
      const discount = VALID_CODES[formattedCode];
      if (discount === "SAVE10") {
        setDiscount(0.1);
      } else {
        setDiscount(0.2);
      }
      dispatch(applyCoupon({ code: formattedCode, discount }));
      setStatusMessage({
        text: "Discount applied successfully!",
        isError: false,
      });
    } else {
      setStatusMessage({ text: "Not correct code", isError: true });
    }
  };

  const currentShipping = totalQuantity > 0 ? shippingFee : 0;
  const grandTotal = totalAmount + currentShipping;

  const handleCompleteOrder = () => {
    if (cart.login) {
      navigate("/cart/confirm");
    } else {
      let answer = window.confirm("are you want to continue as guest?");
      if (answer) {
        navigate("/cart/completeOrder");
      } else {
        navigate("/");
      }
    }
  };
  return (
    <div
      className="shadow-sm p-3 m-3 rounded border text-end"
      style={{ height: "70vh" }}
    >
      <div>
        <h3 className="text-start">Order Summary</h3>

        <div className="d-flex justify-content-between my-2">
          <span>Items Count</span>
          <span className="h6">{totalQuantity}</span>
        </div>

        <div className="d-flex justify-content-between my-2">
          <span>Subtotal</span>
          <span className="text-success h6">${totalAmount.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between my-2">
          <span>Estimated Shipping Fee</span>
          <span className="text-success h6">${currentShipping.toFixed(2)}</span>
        </div>

        <form onSubmit={handleApplyPromo} className="pt-3">
          <div className="input-group">
            <label
              className="input-group-text bg-info text-light"
              htmlFor="promo"
            >
              PROMO CODE
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="DISCOUNT CODE"
              id="promo"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
            />
          </div>

          {statusMessage.text && (
            <span
              className={`d-block text-start mt-1 ${
                statusMessage.isError ? "text-danger" : "text-success"
              }`}
            >
              {statusMessage.text}
            </span>
          )}

          <button className="btn bg-info text-light m-2" type="submit">
            Apply
          </button>
        </form>

        <hr />

        <div className="d-flex justify-content-between align-items-center h4">
          <span>Total</span>
          <div className="text-success text-end">
            {coupon?.isApplied && (
              <span className="text-danger h6 d-block mb-0">
                <del>${(totalAmount + currentShipping).toFixed(2)}</del>
              </span>
            )}
            <span>${(grandTotal - grandTotal * discount).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        className="btn bg-success text-light m-2 w-100"
        onClick={() => handleCompleteOrder()}
        disabled={totalQuantity === 0}
      >
        Buy
      </button>
    </div>
  );
};

export default OrderSummary;
