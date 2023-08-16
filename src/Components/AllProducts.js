import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/product";
import { editCart, removeFromCart, fetchCart } from "../store/cart";
import { deleteProduct } from "../store/product";
import NewProductButton from "./NewProductButton";
import DeleteProductButton from "./DeleteProductButton";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { products, cart, auth } = useSelector((state) => state);
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();
  const [guestCart, setGuestCart] = useState({ lineItems: [] });

  useEffect(() => {
    try {
      dispatch(getProducts());
      if (auth.id) {
        dispatch(fetchCart());
      } else {
        let tempCart = JSON.parse(window.localStorage.getItem("tempCart"));
        if (!tempCart || !tempCart.lineItems) {
          tempCart = { lineItems: [] };
          window.localStorage.setItem("tempCart", JSON.stringify(tempCart));
        }
        setGuestCart(tempCart);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      quantity[product.id] = 0;
    });
    if (auth.id) {
      cart.lineItems.forEach((lineItem) => {
        quantity[lineItem.product.id] = lineItem.quantity;
      });
    } else {
      guestCart.lineItems.forEach((lineItem) => {
        quantity[lineItem.product.id] = lineItem.quantity;
      });
    }
  }, [products, cart, guestCart]);

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
      if (auth.id) {
        dispatch(editCart({ product: cartProduct, quantity: newCartQuantity }));
      } else {
        let newCart = guestCart;
        let lineItemLocation = 0;
        let lineItem = guestCart.lineItems.find((lineItem, index) => {
          if (lineItem.product.id === cartProduct.id) {
            lineItemLocation = index;
          }
          return lineItem.product.id === cartProduct.id;
        });
        if (lineItem) {
          lineItem.quantity += quantity[productId];
          newCart.lineItems[lineItemLocation] = lineItem;
          setGuestCart(newCart);
          window.localStorage.setItem("tempCart", JSON.stringify(guestCart));
        } else {
          newCart.lineItems.push({
            product: cartProduct,
            quantity: newCartQuantity,
          });
          setGuestCart(newCart);
          window.localStorage.setItem("tempCart", JSON.stringify(guestCart));
        }
      }
    } else {
      if (auth.id) {
        dispatch(
          removeFromCart({
            product: cartProduct,
            quantityToRemove: -newCartQuantity,
          })
        );
      } else {
        let newCart = guestCart;
        let lineItemLocation = 0;
        let lineItem = guestCart.lineItems.find((lineItem, index) => {
          if (lineItem.product.id === productId) {
            lineItemLocation = index;
          }
          return lineItem.product.id === cartProduct.id;
        });
        if (lineItem) {
          lineItem.quantity -= quantity[productId];
          newCart.lineItems[lineItemLocation] = lineItem;
          setGuestCart(newCart);
          window.localStorage.setItem("tempCart", JSON.stringify(guestCart));
        } else {
          newCart.lineItems.push({
            product: cartProduct,
            quantity: newCartQuantity,
          });
          setGuestCart(newCart);
          window.localStorage.setItem("tempCart", JSON.stringify(guestCart));
        }
      }
    }
  };

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
                <Link to={`/products/${product.id}`} replace>
                  <span id="large-text">{product.name} </span>
                </Link>
                <div> Price : ${product.price}</div>
              </li>
              Quantity: {quantity[product.id] ? quantity[product.id] : 0}
              <br />
              <button name={product.id} onClick={(ev) => decrement(ev)}>
                -
              </button>
              <button name={product.id} onClick={(ev) => increment(ev)}>
                +
              </button>
              <button
                type="button"
                value={product.id}
                onClick={(ev) => addProdToCart(ev.target.value)}>
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
