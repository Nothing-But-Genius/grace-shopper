
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCart, removeFromCart, fetchCart } from '../store/cart';
import tempCart from '../store/tempCart';


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
    if (auth.id) {
      let [editLineItem] = cart.lineItems.filter(
        (lineItem) => lineItem.productId === ev.target.name
      );
      editLineItem.quantity = 1;
      dispatch(
        removeFromCart({
          product: editLineItem.product,
          quantityToRemove: editLineItem.quantity,
        })
      );
    } else {
      let newCart = guestCart;
      let lineItemLocation = 0;
      let lineItem = guestCart.lineItems.find((lineItem, index) => {
        if (lineItem.product.id === ev.target.name) {
          lineItemLocation = index;
        }
        return lineItem.product.id === ev.target.name;
      });
      lineItem.quantity -= 1;
      newCart.lineItems[lineItemLocation] = lineItem;
      setGuestCart(newCart);
      console.log(guestCart);
      window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
    }
  };

  const increment = (ev) => {
    if (auth.id) {
      let [editLineItem] = cart.lineItems.filter(
        (lineItem) => lineItem.productId === ev.target.name
      );
      editLineItem.quantity = 1;
      dispatch(
        editCart({
          product: editLineItem.product,
          quantity: editLineItem.quantity,
        })
      );
    } else {
      let newCart = guestCart;
      let lineItemLocation = 0;
      let lineItem = guestCart.lineItems.find((lineItem, index) => {
        if (lineItem.product.id === ev.target.name) {
          lineItemLocation = index;
        }
        return lineItem.product.id === ev.target.name;
      });
      lineItem.quantity += 1;
      newCart.lineItems[lineItemLocation] = lineItem;
      setGuestCart(newCart);
      console.log(guestCart);
      window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
    }
  };

  const removeLineItemFromCart = (ev) => {
    let [removedLineItem] = cart.lineItems.filter(
      (lineItem) => lineItem.productId === ev.target.name
    );
    if (auth.id) {
      dispatch(
        removeFromCart({
          product: removedLineItem.product,
          quantityToRemove: removedLineItem.quantity,
        })
      );
    } else {
      let newCart = guestCart;
      let lineItemLocation = 0;
      let lineItem = guestCart.lineItems.find((lineItem, index) => {
        if (lineItem.product.id === ev.target.name) {
          lineItemLocation = index;
        }
        return lineItem.product.id === ev.target.name;
      });
      lineItem.quantity = 0;
      newCart.lineItems.splice(lineItemLocation, 1);
      setGuestCart(newCart);
      console.log(guestCart);
      window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
    }
  };
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.lineItems.length === 0 && auth.id ? (
        <div>
          <hr />
          <h2>Your Cart is Empty!</h2>
        </div>
      ) : (
        <ul id="products-list">
          <hr />

          {auth.id
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
    </div>
  );
};

export default Cart;
