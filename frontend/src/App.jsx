import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { setBackendAvailabilityCallback } from "./api/AxiosConfig";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Logout from "./utils/Logout";
import Error404 from "./pages/Error404";
import { useAuth } from "./contexts/AuthContext";
import Settings from "./pages/auth/Settings";
import UserList from "./pages/UserList";
import Profile from "./pages/Profile";
import NetworkError from "./pages/NetworkError";

function App() {
  const { userLoading } = useAuth();
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    setBackendAvailabilityCallback(setBackendAvailable);
  }, []);

  if (userLoading) {
    return;
  }

  if (!backendAvailable) {
    return <NetworkError />;
  }

  return (
    <>
      <Navbar />
      <h1>Banana 🍌</h1>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/u/:username" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
