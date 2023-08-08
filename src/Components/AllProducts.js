import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/product';
import { fetchCart } from '../store/cart';
import axois from 'axios';

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
  products.forEach((product) => {
    quantity[product.name] = 0;
  });
  cart.lineItems.forEach((lineItem) => {
    quantity[lineItem.product.name] = lineItem.quantity;
  });
  // const onChange = (ev) => {
  //   setQuantity({ ...quantity, [ev.target.name]: ev.target.value });
  //   console.log(quantity);
  // };
  const decrement = (ev) => {
    let productCount = quantity[ev.target.name];
    let productName = ev.target.name;
    // setQuantity({ ...quantity, [productName]: productCount - 1 });
    quantity[productName] = productCount - 1;
    setQuantity({ ...quantity });
    console.log(quantity);
  };
  const increment = (ev) => {
    let productCount = quantity[ev.target.name];
    let productName = ev.target.name;
    // setQuantity({ ...quantity, [productName]: productCount + 1 });
    quantity[productName] = productCount + 1;
    setQuantity({ ...quantity });
    console.log(quantity);
  };
  const addToCart = async (product) => {
    await axios.post('/api/orders/cart', product, quantity[product.name]);
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
              {/* <input
                type="number"
                min="0"
                value={quantity[product.name]}
                name={product.name}
                onChange={onChange}
              ></input> */}
              <button
                name={product.name}
                onClick={decrement}
              >
                -
              </button>
              <button
                name={product.name}
                onClick={increment}
              >
                +
              </button>
              <button
                type="button"
                onClick={addToCart}
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
