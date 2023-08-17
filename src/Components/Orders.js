<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/order';
=======
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  createOrderThunk,
  updateOrderStatusThunk,
} from "../store/orders";
>>>>>>> main

function Orders() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

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
      <br />
      <br />
      <hr />
      <h2>Past Orders</h2>
      {order.orders ? order.orders.map((order) => console.log(order)) : <br />}
    </div>
  );
}

export default Orders;
