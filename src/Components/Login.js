import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { attemptRegister } from '../store';

import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useNavigate();

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    const isSuccess = await dispatch(attemptLogin(credentials));
    if (isSuccess) {
      history('/');
    } else {
      console.log('bad credentials');
    }
  };

  const registerUser = async (ev) => {
    ev.preventDefault();

    const isSuccess = await dispatch(attemptRegister(credentials));

    if (isSuccess) {
      history('/');
    } else {
      console.log('User Already Exist');
    }
  };

  return (
    <div id="loginform">
      <FormHeader title="Login" />

      <div>
        <FormInput
          description="Username"
          placeholder="Enter your username"
          type="text"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <FormInput
          description="Password"
          placeholder="Enter your password"
          type="password"
          value={credentials.password}
          name="password"
          onChange={onChange}
        />
        <FormButton
          title="Log in"
          onClick={login}
        />
        <FormButton
          title="Register"
          onClick={registerUser}
        />
      </div>
    </div>
  );
};

const FormHeader = ({ title }) => <h2 id="headerTitle">{title}</h2>;

const FormInput = ({
  description,
  placeholder,
  type,
  value,
  name,
  onChange,
}) => (
  <div className="row">
    <label>{description}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  </div>
);

const FormButton = ({ title, onClick }) => (
  <div
    id="button"
    className="row"
  >
    <button onClick={onClick}>{title}</button>
  </div>
);

export default Login;
