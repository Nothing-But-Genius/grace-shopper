import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import Reviews from "./Reviews";


const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home</h1>
      <div>Welcome {auth.username ? auth.username : "Guest"}!!</div>
      <Reviews />
    </div>

    
  );
};

export default Home;
