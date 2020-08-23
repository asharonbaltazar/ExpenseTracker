import React from "react";
import Header from "../Components/Header";
import Overview from "../Components/Overview";
import TransactionView from "../Components/TransactionView";
import AuthLinks from "../Components/AuthLinks";

const Home = () => {
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
