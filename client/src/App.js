import React from "react";
import Header from "./Components/Header";
import Overview from "./Components/Overview";
import TransactionView from "./Components/TransactionView";
import { AuthState } from "./context/auth/AuthState";
import { GlobalProvider } from "./context/transactions/TransactionState";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <GlobalProvider>
        <div className="container">
          <Header />
          <Overview />
          <TransactionView />
        </div>
      </GlobalProvider>
    </AuthState>
  );
};

export default App;
