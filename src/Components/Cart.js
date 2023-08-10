import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCart, removeFromCart } from '../store/cart';

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   cart.lineItems.forEach((lineItem) => {
  //     quantity[lineItem.product.id] = lineItem.quantity;
  //   });
  // }, [cart]);

  const decrement = (ev) => {
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
  };

  const increment = (ev) => {
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
  };

  const removeLineItemFromCart = (ev) => {
    let [removedLineItem] = cart.lineItems.filter(
      (lineItem) => lineItem.productId === ev.target.name
    );
    dispatch(
      removeFromCart({
        product: removedLineItem.product,
        quantityToRemove: removedLineItem.quantity,
      })
    );
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul id="products-list">
        <hr />
        {cart.lineItems.map((lineItem) => {
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
        })}
      </ul>
    </div>
  );
};

export default Cart;
