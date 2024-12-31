import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { backendAPI } from "../../api/AxiosConfig";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const { username, password1, password2 } = registerData;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    setErrors({});
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await backendAPI.post(
        "/dj-rest-auth/registration/",
        registerData
      );
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.status === 400) {
        setErrors(error.response.data);
      }
    }
  };

  if (success) {
    return (
      <p>
        You have successfully registered. You can now{" "}
        <Link to={"/login"}>login</Link>.
      </p>
    );
  }

  if (user) {
    return "You are already registered.";
  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        {errors.username?.map((error, i) => (
          <span key={i}>{error}</span>
        ))}
        <br />
        <input
          type="password"
          name="password1"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {errors.password1?.map((error, i) => (
          <span key={i}>{error}</span>
        ))}
        <br />
        <input
          type="password"
          name="password2"
          placeholder="Confirm password"
          onChange={handleChange}
          required
        />
        {errors.non_field_errors?.map((error, i) => (
          <span key={i}>{error}</span>
        ))}
        <br />
        <button
          disabled={
            !username || !password1 || !password2 || password1 !== password2
          }
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
