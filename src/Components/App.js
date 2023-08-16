import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import AllProducts from './AllProducts';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Product from './Product';

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
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route 
              path ='/products/:id' 
              exact component = {<Product />}/>
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
