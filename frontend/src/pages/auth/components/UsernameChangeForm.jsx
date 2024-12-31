import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { backendAPI } from "../../../api/AxiosConfig";

const UsernameChangeForm = () => {
  const { user, setUser } = useAuth();
  const [newUsername, setNewUsername] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors({});
    setNewUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await backendAPI.patch("/dj-rest-auth/user/", {
        username: newUsername,
      });
      if (response.status === 200) {
        setUser({
          ...user,
          username: newUsername,
        });
      }
      setNewUsername("");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div>
      <h3>Change username</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder={user.username}
          value={newUsername}
          onChange={handleChange}
          required
        />
        <br />
        <button
          type="submit"
          disabled={user?.username === newUsername || !newUsername}
        >
          Save changes
        </button>
        {errors.username?.map((message, i) => (
          <span key={i}>{message}</span>
        ))}
      </form>
    </div>
  );
};

export default UsernameChangeForm;
