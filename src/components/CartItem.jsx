import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/CartSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="shadow-sm d-flex justify-content-between  p-2 m-3 rounded border align-items-center">
      <img
        src={props.item.thumbnail}
        alt={props.item.category}
        className="img-thumbnail "
        style={{ width: "50px" }}
      />
      <div className="">
        <p className="text-info  " style={{ fontWeight: "bold" }}>
          {props.item.title}
        </p>
        <span className="text-secondary text-xs">{props.category}</span>
        <div className="mt-3" style={{ fontSize: "1.5rem" }}>
          <span
            className="bg-secondary font-bold  px-2  rounded-3  text-light"
            onClick={() => dispatch(decreaseQuantity(props.item.id))}
            style={{ cursor: "pointer" }}
          >
            -
          </span>
          <span className="mx-1">{props.item.quantity}</span>
          <span
            className="bg-secondary px-2  rounded-3 text-light"
            onClick={() => dispatch(increaseQuantity(props.item.id))}
            style={{ cursor: "pointer" }}
          >
            +
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <span className="text-secondary">total price</span>
        <span className="text-success h5">
          {(props.item.quantity * props.item.price).toFixed(2)}
        </span>
      </div>
      <div
        className="text-danger "
        onClick={() => dispatch(removeFromCart(props.item.id))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-trash-fill "
          viewBox="0 0 16 16"
          style={{ cursor: "pointer" }}
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </div>
    </div>
  );
};

export default CartItem;
