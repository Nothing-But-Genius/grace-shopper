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
    products.products.forEach((product) => {
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

  const addProdToCart = (productId) => {
    let newProduct = dispatch(getSingleProduct(productId)).then(async () => {
      const token = window.localStorage.getItem('token');
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      let amount = quantity[newProduct.name];
      let user = response.data;
      console.log(user);
      user.addToCart({ product: newProduct, quantity: amount });
    });
    // let amount = quantity[newProduct.name];
    // console.log(newProduct);
    // console.log(amount);
    // auth.addToCart({ newProduct, amount });
  };

  return (
    <div id="allProducts">
      <h1>All Products</h1>
      <ul>
        {products.products.map((product) => {
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
                value={product.id}
                onClick={(ev) => addProdToCart(ev.target.value)}
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
