import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import cart from "./cart";
import productsReducer from "./product";
import userReducer from "./user";
import guest from "./guest";
import { _deleteProduct } from "./product";

const reducer = combineReducers({
  auth,
  cart,
  products: productsReducer,
  users: userReducer,
  guest,
  _deleteProduct: productsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./cart";
