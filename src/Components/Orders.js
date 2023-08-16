import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../store/cart";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}></div>
      ))}

      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}></div>
      ))}
    </div>
  );
}

export default Orders;
