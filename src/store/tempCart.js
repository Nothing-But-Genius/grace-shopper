const SET_TEMP_CART = 'SET_TEMP_CART';
const FETCH_TEMP_CART = 'FETCH_TEMP_CART';

const initialState = { lineItems: [] };

const tempCart = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_CART:
      return action.cart;
    case FETCH_TEMP_CART:
      return state;
    default:
      return state;
  }
};

export const setTempCart = (newCart) => {
  return async (dispatch) => {
    dispatch({ type: SET_TEMP_CART, cart: newCart });
  };
};

export const fetchTempCart = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TEMP_CART, cart: initialState });
  };
};

export default tempCart;
