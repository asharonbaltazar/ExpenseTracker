import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthState";

const AuthLinks = () => {
  const authContext = useContext(AuthContext);

  const { isAuth, logout, user } = authContext;

  const authenticatedLinks = () => (
    <>
      <li>
        <a href="#!">
          <span>Logout</span>
        </a>
      </li>
    </>
  );

  return (
    <>
      <ul className="navbar-links">{isAuth && authenticatedLinks()}</ul>
    </>
  );
};

export default AuthLinks;
