import React from "react";
import { backendAPI } from "../../../api/AxiosConfig";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteAccountForm = () => {
  const { setUser } = useAuth();
  const nav = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await backendAPI.delete("/delete/");
        alert("Account successfully deleted.");
        setUser(null);
        nav("/");
      } catch (error) {}
    }
  };
  return (
    <>
      <h3>Delete account</h3>
      <button onClick={handleDelete}>Delete account</button>
    </>
  );
};

export default DeleteAccountForm;
