import React from "react";
import Header from "./Components/Header";
import Overview from "./Components/Overview";
import TransactionView from "./Components/TransactionView";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

const App = () => {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Overview />
        <TransactionView />
      </div>
    </GlobalProvider>
  );
};

export default App;
