import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const loggedInLinks = (
    <>
      <li>
        <Link to={`/u/${user?.username}`}>{user?.username}</Link>
      </li>
      <li>
        <Link to={"/settings"}>Settings</Link>
      </li>
      <li>
        <Link to={"/logout"}>Logout</Link>
      </li>
    </>
  );

  const loggedOutLinks = (
    <>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
    </>
  );

  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/users"}>Users</Link>
        </li>
        {user ? loggedInLinks : loggedOutLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
