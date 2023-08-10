import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import AllProducts from './AllProducts';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';

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
      {/* {auth.id ? <Home /> : <Login />} */}
      {
        <div>
          <Routes>
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/products"
              element={<AllProducts />}
            />
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
