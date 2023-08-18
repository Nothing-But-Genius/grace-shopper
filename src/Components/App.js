import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import AllProducts from "./AllProducts";
import Admin from "./Admin";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart } from "../store";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Reviews from "./Reviews";
import OrderComplete from "./OrderComplete";
import Orders from "./Orders";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <NavBar />
      {
        <div>
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route exact path="/products" element={<AllProducts />} />
            <Route exact path="/products/:id" element={<Product />} />
            <Route exact path="/products/:id/reviews" element={<Reviews />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orderComplete" element={<OrderComplete />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
