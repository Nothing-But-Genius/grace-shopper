import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

//thunks
export const getProducts = () => {
  return (dispatch) => {
    axios
      .get('/api/products')
      .then((response) => {
        dispatch(_getProducts(response.data));
      })
      .catch((error) => {
        console.log('error getting products', error);
      });
  };
};

//add new product thunk
export const addProduct = (productData) => (dispatch) => {
  axios
    .post('/api/products', productData)
    .then((response) => {
      const product = response.data;
      dispatch(_addProduct(product));
    })
    .catch((error) => {
      console.log(error);
    });
};

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default productsReducer;
