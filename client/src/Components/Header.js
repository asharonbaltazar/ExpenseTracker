import React, { useContext } from "react";
import { AuthContext } from "../context/auth/AuthState";

const Header = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  return (
    <h1 className="bold-title">
      {user ? `Welcome, ${user.username}` : "Expense Tracker"}
    </h1>
  );
};

export default Header;
