import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link, useParams } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Cart</h1>
      <pre>This is my cart</pre>
      <button>checkout</button>
      <button>Remove</button>
    </div>
  );
};

export default Cart;
