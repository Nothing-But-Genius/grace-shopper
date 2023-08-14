import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import CreateUser from "./CreateUser";
import RegisterButton from "./RegisterButton";
import AllUsers from "./AllUsers";
import NavBar from "./NavBar";

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <RegisterButton />
      <AllUsers />
      <CreateUser />
    </div>
  );
};

export default Login;
