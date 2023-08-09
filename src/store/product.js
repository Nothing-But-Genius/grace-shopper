import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const _getSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

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

export const getSingleProduct = (productId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios
      .get(`/api/products/${productId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        dispatch(_getSingleProduct(response.data));
      })
      .catch((error) => {
        console.log('error getting product', error);
      });
  };
};

const initialState = {
  products: [],
  product: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    case GET_SINGLE_PRODUCT:
      return { ...state, product: action.product };
    default:
      return state;
  }
};

export default productsReducer;
