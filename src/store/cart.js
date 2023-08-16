import axios from 'axios';

const SET_CART = 'SET_CART';
const EDIT_CART = 'EDIT_CART';
const CLEAR_CART = 'CLEAR_CART';
const SET_ORDERS = 'SET_ORDERS';

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === SET_CART) {
    return action.cart;
  }
  if (action.type === EDIT_CART) {
    return action.cart;
  }
  if (action.type === CLEAR_CART) {
    return { lineItems: [] };
  }
  if (action.type === SET_ORDERS) {
    return action.orders;
  }
  return state;
};

export const editCart = ({ product, quantity }) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(
      '/api/orders/cart',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: EDIT_CART, cart: response.data });
  };
};

export const removeFromCart = ({ product, quantityToRemove }) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(
      '/api/orders/cart',
      { product, quantityToRemove },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: EDIT_CART, cart: response.data });
  };
};

export const placeOrder = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/orders', {
      authorization: token,
    });
    dispatch({ type: CLEAR_CART, cart: response.data });
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

export const fetchOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: SET_ORDERS, orders: response.data });
  };
};

export default cart;
