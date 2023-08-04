import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const getProducts = () => {
  return (dispatch) => {
    axios
      .get('/products')
      .then((response) => {
        dispatch(_getProducts(response.data));
      })
      .catch((error) => {
        console.log('error getting products', error);
      });
  };
};

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default productsReducer;
