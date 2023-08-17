import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  createOrderThunk,
  updateOrderStatusThunk,
} from "../store/orders";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const buyNow = () => {
    cart.forEach((item) => {
      dispatch(createOrderThunk(item));
    });
  };

  const changeOrderStatus = (orderId, status) => {
    dispatch(updateOrderStatusThunk(orderId, status));
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          {order.status === "active" ? (
            <button onClick={() => changeOrderStatus(order.id, "past")}>
              Set as Past
            </button>
          ) : (
            <button onClick={() => changeOrderStatus(order.id, "active")}>
              Set as Active
            </button>
          )}
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}></div>
      ))}
      <button onClick={buyNow}>Buy Now</button>
    </div>
  );
}

export default Orders;
