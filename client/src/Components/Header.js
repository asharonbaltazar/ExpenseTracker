import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthState";

const Header = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const authenticatedLinks = () => (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!">
          <span>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = () => (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <h1 className="bold-title">Expense Tracker</h1>

      <ul>{user ? authenticatedLinks() : guestLinks()}</ul>
    </div>
  );
};

export default Header;
