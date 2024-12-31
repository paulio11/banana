import React from "react";
import UsernameChangeForm from "./components/UsernameChangeForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import AvatarChangeForm from "./components/AvatarChangeForm";
import { useAuth } from "../../contexts/AuthContext";
import BioChangeForm from "./components/BioChangeForm";
import DeleteAccountForm from "./components/DeleteAccountForm";

const Settings = () => {
  const { user } = useAuth();

  if (!user) {
    return "You must be logged in to view this page.";
  }

  return (
    <>
      <h2>Settings</h2>
      <UsernameChangeForm />
      <PasswordChangeForm />
      <AvatarChangeForm />
      <BioChangeForm />
      <DeleteAccountForm />
    </>
  );
};

export default Settings;
