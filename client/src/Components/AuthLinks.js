import React, { useContext } from "react";
import { AuthContext } from "../context/auth/AuthState";
import { GlobalContext } from "../context/transactions/TransactionState";

const AuthLinks = () => {
  const transactionsContext = useContext(GlobalContext);
  const authContext = useContext(AuthContext);

  const { isAuth, logout } = authContext;
  const { clearTransactions } = transactionsContext;

  const onLogout = () => {
    logout();
    clearTransactions();
  };

  const authenticatedLinks = () => (
    <>
      <li>
        <a href="#!" onClick={onLogout}>
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
