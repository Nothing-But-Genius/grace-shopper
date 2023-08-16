import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import cart from "./cart";
import productsReducer from "./product";
import userReducer from "./user";
import guest from "./guest";
<<<<<<< HEAD
import singleProductReducer from "./singleProduct";
=======
import { _deleteProduct } from "./product";
>>>>>>> main

const reducer = combineReducers({
  auth,
  cart,
  products: productsReducer,
  users: userReducer,
  guest,
<<<<<<< HEAD
  product:singleProductReducer,
=======
  _deleteProduct: productsReducer,
>>>>>>> main
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./cart";
