import React, { useEffect, useContext } from "react";
import Header from "../Components/Header";
import Overview from "../Components/Overview";
import TransactionView from "../Components/TransactionView";
import AuthLinks from "../Components/AuthLinks";
import { AuthContext } from "../context/auth/AuthState";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(
    () => {
      authContext.loadUser();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="container">
      <Header />
      <AuthLinks />
      <Overview />
      <TransactionView />
    </div>
  );
};

export default Home;
