import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/product';
import { editCart, removeFromCart, fetchCart } from '../store/cart';
import { deleteProduct } from '../store/product';
import NewProductButton from './NewProductButton';
import DeleteProductButton from './DeleteProductButton';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
          setGuestCart((prevCart) => ({ ...prevCart, newCart }));
          window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
        } else {
          newCart.lineItems.push({
            product: cartProduct,
            quantity: newCartQuantity,
          });
          setGuestCart((prevCart) => ({ ...prevCart, newCart }));
          window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
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
          setGuestCart((prevCart) => ({ ...prevCart, newCart }));
          window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
        } else {
          newCart.lineItems.push({
            product: cartProduct,
            quantity: newCartQuantity,
          });
          setGuestCart((prevCart) => ({ ...prevCart, newCart }));
          window.localStorage.setItem('tempCart', JSON.stringify(guestCart));
        }
      }
    }
  };

  return (
    <div id="allProducts">
      <h1>All Products</h1>
      {auth.isAdmin === true ? <NewProductButton /> : null}

      <div className="productsContainer">
        {products.map((product) => (
          <div
            key={product.id}
            className="productCard"
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 200 }} /* Reduced from 140 to 100 */
                image={product.imageUrl}
                title={product.name}
              />
              <CardContent style={{ padding: '8px' }}>
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    replace
                  >
                    <Typography
                      gutterBottom
                      variant="body1"
                      id="large-text"
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography variant="caption">
                    Price: ${product.price}
                  </Typography>
                </div>
                <Typography>
                  Quantity: {quantity[product.id] ? quantity[product.id] : 0}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  name={product.id}
                  onClick={(ev) => decrement(ev)}
                >
                  -
                </Button>
                <Button
                  name={product.id}
                  onClick={(ev) => increment(ev)}
                >
                  +
                </Button>
                <Button
                  size="small"
                  type="button"
                  value={product.id}
                  onClick={(ev) => addProdToCart(ev.target.value)}
                >
                  Add to Cart
                </Button>
              </CardActions>

              {auth.isAdmin && (
                <DeleteProductButton
                  productId={product.id}
                  handleDelete={deleteProductFromStore}
                />
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
