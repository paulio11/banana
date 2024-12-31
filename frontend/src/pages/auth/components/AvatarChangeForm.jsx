import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { backendAPI } from "../../../api/AxiosConfig";

const AvatarChangeForm = () => {
  const { user, setUser } = useAuth();
  const fileInput = useRef();
  const [preview, setPreview] = useState(user.avatar);
  const [chosenFile, setChosenFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setError(null);
    setChosenFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chosenFile) return setError("Please select a file.");

    const formData = new FormData();
    formData.append("avatar", chosenFile);
    setUploading(true);

    try {
      const { data } = await backendAPI.patch(
        `/profiles/${user.username}`,
        formData
      );
      setUser({
        ...user,
        avatar: data.avatar,
      });
      setChosenFile(null);
      fileInput.current.value = null;
    } catch {
      setError("Failed to update avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <h3>Change Avatar</h3>
      <img src={preview} alt="Your avatar" className="avatar" />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleChange}
        />
        <br />
        <button type="submit" disabled={!chosenFile || uploading}>
          {uploading ? "Uploading..." : "Save Changes"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default AvatarChangeForm;
