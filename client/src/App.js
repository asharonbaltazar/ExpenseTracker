import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/authentication/Login";
import Register from "./Components/authentication/Register";
import { AuthState } from "./context/auth/AuthState";
import { GlobalProvider } from "./context/transactions/TransactionState";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <GlobalProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </GlobalProvider>
    </AuthState>
  );
};

export default App;
