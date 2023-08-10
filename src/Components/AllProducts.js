import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getSingleProduct } from '../store/product';
import { editCart, fetchCart } from '../store/cart';
import axios from 'axios';

const AllProducts = () => {
  const { products, cart, auth } = useSelector((state) => state);
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getProducts());
      dispatch(fetchCart());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      quantity[product.id] = 0;
    });
    cart.lineItems.forEach((lineItem) => {
      quantity[lineItem.product.id] = lineItem.quantity;
    });
  }, [products, cart]);

  const decrement = (ev) => {
    setQuantity({
      ...quantity,
      [ev.target.name]: quantity[ev.target.name] - 1,
    });
  };

  const increment = (ev) => {
    setQuantity({
      ...quantity,
      [ev.target.name]: quantity[ev.target.name] + 1,
    });
  };

  const addProdToCart = (productId) => {
    let [cartProduct] = products.filter((product) => product.id === productId);
    let [cartLineItem] = cart.lineItems.filter(
      (lineItem) => lineItem.productId === productId
    );
    if (!cartLineItem) {
      cartLineItem = {
        quantity: 0,
      };
    }
    let currentQuantity = cartLineItem.quantity;
    let newCartQuantity = quantity[cartProduct.id] - currentQuantity;
    dispatch(editCart({ product: cartProduct, quantity: newCartQuantity }));
  };

  return (
    <div id="allProducts">
      <h1>All Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <li>{product.name}</li>
              Quantity: {quantity[product.id]}
              <button
                name={product.id}
                onClick={(ev) => decrement(ev)}
              >
                -
              </button>
              <button
                name={product.id}
                onClick={(ev) => increment(ev)}
              >
                +
              </button>
              <button
                type="button"
                value={product.id}
                onClick={(ev) => addProdToCart(ev.target.value)}
              >
                Update Cart
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;
