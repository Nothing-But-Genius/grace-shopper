import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editCart, removeFromCart, fetchCart, placeOrder } from '../store/cart';
import Orders from './Orders';
import { fetchOrders } from '../store/order';
import OrderComplete from './OrderComplete';

const Cart = () => {
  const { cart, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [guestCart, setGuestCart] = useState({ lineItems: [] });

  useEffect(() => {
    try {
      if (auth.id) {
        dispatch(fetchCart());
      } else {
        let tempCart = JSON.parse(window.localStorage.getItem('tempCart'));
        if (!tempCart.lineItems) {
          tempCart = { lineItems: [] };
          window.localStorage.setItem('tempCart', JSON.stringify(tempCart));
        }
        setGuestCart(tempCart);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const decrement = (ev) => {
    const productId = ev.target.name;

    if (auth.id) {
      let [editLineItem] = cart.lineItems.filter(
        (lineItem) => lineItem.productId === productId
      );
      editLineItem.quantity = 1;
      dispatch(
        removeFromCart({
          product: editLineItem.product,
          quantityToRemove: editLineItem.quantity,
        })
      );
    } else {
      let newCart = { ...guestCart };
      const lineItem = newCart.lineItems.find(
        (item) => item.product.id === productId
      );

      if (lineItem) {
        lineItem.quantity -= 1;
        if (lineItem.quantity <= 0) {
          newCart.lineItems = newCart.lineItems.filter(
            (item) => item.product.id !== productId
          );
        }
      }

      setGuestCart(newCart);
      window.localStorage.setItem('tempCart', JSON.stringify(newCart));
    }
  };

  const increment = (ev) => {
    const productId = ev.target.name;

    if (auth.id) {
      let [editLineItem] = cart.lineItems.filter(
        (lineItem) => lineItem.productId === productId
      );
      editLineItem.quantity = 1;
      dispatch(
        editCart({
          product: editLineItem.product,
          quantity: editLineItem.quantity,
        })
      );
    } else {
      let newCart = { ...guestCart };
      const lineItem = newCart.lineItems.find(
        (item) => item.product.id === productId
      );

      if (lineItem) {
        lineItem.quantity += 1;
      }

      setGuestCart(newCart);
      window.localStorage.setItem('tempCart', JSON.stringify(newCart));
    }
  };

  const removeLineItemFromCart = (ev) => {
    const productId = ev.target.name;

    if (auth.id) {
      let [removedLineItem] = cart.lineItems.filter(
        (lineItem) => lineItem.productId === productId
      );
      dispatch(
        removeFromCart({
          product: removedLineItem.product,
          quantityToRemove: removedLineItem.quantity,
        })
      );
    } else {
      let newCart = { ...guestCart };
      newCart.lineItems = newCart.lineItems.filter(
        (item) => item.product.id !== productId
      );

      setGuestCart(newCart);
      window.localStorage.setItem('tempCart', JSON.stringify(newCart));
    }
  };

  const placeCartOrder = () => {
    if (auth.id) {
      dispatch(placeOrder());
      dispatch(fetchOrders());
    }
    return;
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {auth.id && cart.lineItems && cart.lineItems.length === 0 ? (
        <div>
          <hr />
          <h2>Your Cart is Empty!</h2>
        </div>
      ) : (
        <ul id="products-list">
          <hr />

          {auth.id && cart.lineItems
            ? cart.lineItems.map((lineItem) => {
                return (
                  <div key={lineItem.id}>
                    <li>
                      <span id="large-text">{lineItem.product.name}</span>
                      <br />
                      Quantity: {lineItem.quantity}
                      <br />
                      <button
                        name={lineItem.productId}
                        onClick={(ev) => decrement(ev)}
                      >
                        -
                      </button>
                      <button
                        name={lineItem.productId}
                        onClick={(ev) => increment(ev)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        name={lineItem.productId}
                        onClick={(ev) => removeLineItemFromCart(ev)}
                      >
                        Remove From Cart
                      </button>
                    </li>
                    <hr />
                  </div>
                );
              })
            : guestCart.lineItems.map((lineItem, index) => {
                return (
                  <div key={lineItem.product.id}>
                    <li>
                      <span id="large-text">{lineItem.product.name}</span>
                      <br />
                      Quantity: {lineItem.quantity}
                      <br />
                      <button
                        name={lineItem.product.id}
                        onClick={(ev) => decrement(ev)}
                      >
                        -
                      </button>
                      <button
                        name={lineItem.product.id}
                        onClick={(ev) => increment(ev)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        name={lineItem.product.id}
                        onClick={(ev) => removeLineItemFromCart(ev)}
                      >
                        Remove From Cart
                      </button>
                    </li>
                    <hr />
                  </div>
                );
              })}
        </ul>
      )}
      {cart.lineItems && auth.id && cart.lineItems.length > 0 ? (
        <button onClick={() => placeCartOrder()}>
          <Link to={'/orderComplete'}>Place Order</Link>
        </button>
      ) : (
        <br />
      )}
      {auth.id ? <Orders /> : <h2>Sign In to Complete Purchase!</h2>}
    </div>
  );
};

export default Cart;
