import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/authentication/Login";
import Register from "./Components/authentication/Register";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import { AuthState } from "./context/auth/AuthState";
import { GlobalProvider } from "./context/transactions/TransactionState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  return (
    <AuthState>
      <GlobalProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </GlobalProvider>
    </AuthState>
  );
};

export default App;
