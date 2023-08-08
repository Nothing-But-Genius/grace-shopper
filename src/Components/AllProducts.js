import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/product';
import { fetchCart } from '../store/cart';
import axios from 'axios';

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
      quantity[product.name] = 0;
    });
    cart.lineItems.forEach((lineItem) => {
      quantity[lineItem.product.name] = lineItem.quantity;
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
  const addToCart = async (product) => {
    dispatch();
  };
  return (
    <div id="allProducts">
      <h1>All Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <li>{product.name}</li>
              Quantity: {quantity[product.name]}
              <button
                name={product.name}
                onClick={(ev) => decrement(ev)}
              >
                -
              </button>
              <button
                name={product.name}
                onClick={(ev) => increment(ev)}
              >
                +
              </button>
              <button
                type="button"
                onClick={(product) => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;
