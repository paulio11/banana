import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { backendAPI } from "../../../api/AxiosConfig";

const BioChangeForm = () => {
  const { user, setUser } = useAuth();
  const [newBio, setNewBio] = useState(user.bio);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await backendAPI.patch(`/profiles/${user.username}`, {
        bio: newBio,
      });
      if (response.status === 200) {
        setUser({
          ...user,
          bio: response.data.bio,
        });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.log(error);
        setErrors(error.response.data);
      }
    }
  };

  const handleChange = (e) => {
    setErrors({});
    setNewBio(e.target.value);
  };

  return (
    <>
      <h3>Change bio</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="bio"
          value={newBio}
          onChange={handleChange}
          required
          maxLength={400}
        />
        <br />
        <button disabled={!newBio || newBio === user.bio} type="submit">
          Save changes
        </button>
        <span> {newBio.length} / 400</span>
        <br />
        {errors.bio?.map((message, i) => (
          <span key={i}>{message}</span>
        ))}
      </form>
    </>
  );
};

export default BioChangeForm;
