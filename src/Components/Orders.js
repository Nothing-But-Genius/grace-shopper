import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/order';

function Orders() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  // const buyNow = () => {
  //   cart.forEach((item) => {
  //     dispatch(createOrderThunk(item));
  //   });
  // };

  // const changeOrderStatus = (orderId, status) => {
  //   dispatch(updateOrderStatusThunk(orderId, status));
  // };

  return (
    <div>
      <br />
      <br />
      <hr />
      <h2>Past Orders</h2>
      {order.orders ? <p>{console.log(order.orders[0])}</p> : <br />}
    </div>
  );
}

export default Orders;
