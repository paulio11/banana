import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { username, password } = loginData;
  const [errors, setErrors] = useState({});
  const { user, handleLogin } = useAuth();

  const handleChange = (e) => {
    setErrors({});
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await handleLogin(loginData);
    if (error) {
      console.log(error);
      setErrors(error);
    }
  };

  if (user) {
    return "You are already logged in.";
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" disabled={!username || !password}>
          Login
        </button>
        <br />
        {errors.non_field_errors?.map((message, i) => (
          <p>{message}</p>
        ))}
      </form>
    </>
  );
};

export default Login;
