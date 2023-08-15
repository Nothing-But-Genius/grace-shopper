import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/product';
import { editCart, removeFromCart, fetchCart } from '../store/cart';
import { Link } from "react-router-dom"
import Product from './Product';

const AllProducts = () => {
  const { products, cart } = useSelector((state) => state);
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
    if (quantity[ev.target.name] <= 1) {
      setQuantity({
        ...quantity,
        [ev.target.name]: 0,
      });
    } else {
      setQuantity({
        ...quantity,
        [ev.target.name]: quantity[ev.target.name] - 1,
      });
    }
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
    if (newCartQuantity > 0) {
      if (window.localStorage.getItem('token')) {
        dispatch(editCart({ product: cartProduct, quantity: newCartQuantity }));
      } else {
        // dispatch(
        //   editTempCart(...)
        // );
      }
    } else {
      if (window.localStorage.getItem('token')) {
        dispatch(
          removeFromCart({
            product: cartProduct,
            quantityToRemove: -newCartQuantity,
          })
        );
      } else {
        // dispatch(
        //   removeFromTempCart(..)
        // );
      }
    }
  };

  return (
    <div id="allProducts">
      <h1>All Products</h1>
      <ul>
        <hr />
        {products.map((product) => {
          return (
            <div key={product.id}>
              <li>
                <Link to = {`/products/${product.id}`} replace> 
                <span id="large-text">{product.name} </span>
                </Link>
                <div> Price : ${product.price}</div>
              </li>
              Quantity: {quantity[product.id] ? quantity[product.id] : 0}
              <br />
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
                Add to Cart
              </button>
              <hr />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;
