import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/product';
import { editCart, removeFromCart, fetchCart } from '../store/cart';
import { deleteProduct } from '../store/product';
import NewProductButton from './NewProductButton';
import DeleteProductButton from './DeleteProductButton';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const { products, cart } = useSelector((state) => state);
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();
  const [guestCart, setGuestCart] = useState({ lineItems: [] });

  useEffect(() => {
    try {
      dispatch(getProducts());
      if (window.localStorage.getItem('token')) {
        dispatch(fetchCart());
      } else {
        // if (window.localStorage.getItem('tempCart') === null) {
        //   window.localStorage.setItem('tempCart', guestCart);
        // }
        // let newCart = window.localStorage.getItem('tempCart');
        // setGuestCart((prevCart) => {
        //   return {
        //     ...prevCart,
        //     lineItems: newCart.lineItems,
        //   };
        // });
      }
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

  const deleteProductFromStore = (productId) => {
    dispatch(deleteProduct(productId));
  };

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
        // let lineItem = guestCart.lineItems.find((lineItem) => {
        //   return lineItem.productId === productId;
        // });
        // if (lineItem) {
        //   lineItem.quantity += quantity[productId];
        //   setGuestCart({ ...guestCart, lineItems: guestCart.lineItems.map((element) => {
        //     if (element.product.id === productId) {
        //       return
        //     }
        //   })})
        // } else {
        //   await conn.models.lineItem.create({
        //     orderId: cart.id,
        //     productId: product.id,
        //     quantity,
        //   });
        // }
        // setGuestCart(guestCart.lineItems.push(cartProduct));
        console.log(guestCart);
        // dispatch(
        //   setTempCart({
        //     ...tempCart,
        //     lineItems: tempCart.lineItems.push(cartProduct),
        //   })
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
        console.log(guestCart.lineItems);
        // dispatch(
        //   setTempCart({
        //     ...tempCart,
        //     lineItems: tempCart.lineItems.push(cartProduct),
        //   })
        // );
      }
    }
  };

  const { auth } = useSelector((state) => state);

  return (
    <div id="allProducts">
      <h1>All Products</h1>
      {auth.isAdmin === true ? <NewProductButton /> : []}
      <ul>
        <hr />
        {products.map((product) => {
          return (
            <div key={product.id}>
              <li>
                <Link
                  to={`/products/${product.id}`}
                  replace
                >
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
              {auth.isAdmin === true ? (
                <DeleteProductButton
                  productId={product.id}
                  handleDelete={deleteProductFromStore}
                />
              ) : null}
              <hr />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;
