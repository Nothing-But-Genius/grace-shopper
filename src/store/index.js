import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import cart from "./cart";
import productsReducer from "./product";
import userReducer from "./user";
import guest from "./guest";
import singleProduct from "./singleProduct";
import { _deleteProduct } from "./product";
import reviewsReducer from "./reviews";
import order from './order';

const reducer = combineReducers({
  auth,
  cart,
  products: productsReducer,
  users: userReducer,
  guest,
  singleProduct,
  _deleteProduct: productsReducer,
  reviews:reviewsReducer,
  order,

});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './product';
export * from './user';
export * from './guest';
export * from './order';
