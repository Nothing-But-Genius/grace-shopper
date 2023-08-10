import axios from 'axios';

const SET_CART = 'SET_CART';
const EDIT_CART = 'EDIT_CART';

const cart = (state = { lineItems: [] }, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case EDIT_CART:
      return action.cart;
    default:
      return state;
  }
};

export const editCart = ({ product, quantity }) => {
  console.log(product);
  console.log(quantity);
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(
      '/api/orders/cart',
      { product, quantity },
      {
        headers: {
          authorization: token,
          product,
          quantity,
        },
      }
    );
    dispatch({ type: EDIT_CART, cart: response.data });
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: SET_CART, cart: response.data });
  };
};

export default cart;
