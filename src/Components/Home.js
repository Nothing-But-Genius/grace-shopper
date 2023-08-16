import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";


const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home</h1>
<<<<<<< HEAD
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <NewProductButton />

=======
      <div>Welcome {auth.username ? auth.username : "Guest"}!!</div>
>>>>>>> main
    </div>
  );
};

export default Home;
