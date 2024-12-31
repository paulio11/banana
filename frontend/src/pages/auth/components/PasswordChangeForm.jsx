import React, { useState } from "react";
import { backendAPI } from "../../../api/AxiosConfig";

const PasswordChangeForm = () => {
  const [messages, setMessages] = useState({});
  const [formData, setFormData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const { old_password, new_password1, new_password2 } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await backendAPI.post(
        "/dj-rest-auth/password/change/",
        formData
      );
      if (response.status === 200) {
        setMessages({ success: true });
        setTimeout(() => setMessages(null), 5000);
        setFormData({
          old_password: "",
          new_password1: "",
          new_password2: "",
        });
      }
    } catch (error) {
      setMessages(error.response?.data);
    }
  };

  const handleChange = (e) => {
    setMessages([]);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h3>Change password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="old_password"
          placeholder="Old password"
          value={old_password}
          onChange={handleChange}
          required
        />
        {messages?.old_password && <span>{messages.old_password}</span>}
        <br />
        <input
          type="password"
          name="new_password1"
          placeholder="New password"
          value={new_password1}
          onChange={handleChange}
          required
        />

        <br />
        <input
          type="password"
          name="new_password2"
          placeholder="Confirm new password"
          value={new_password2}
          onChange={handleChange}
          required
        />
        {messages?.new_password2?.map((message, i) => (
          <span key={i}>{message}</span>
        ))}
        <br />
        <button
          disabled={
            !old_password ||
            !new_password1 ||
            !new_password2 ||
            new_password1 !== new_password2
          }
          type="submit"
        >
          Save changes
        </button>
        {messages?.success && "You successfully changed your password."}
      </form>
    </div>
  );
};

export default PasswordChangeForm;
