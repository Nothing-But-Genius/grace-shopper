import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';

import RegisterButton from './RegisterButton';

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    if (credentials.username !== '') {
      dispatch(attemptLogin(credentials));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(ev) => login(ev)}>
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
    </div>
  );
};

export default Login;
