import React, { useReducer, createContext } from "react";
import axios from "axios";
import authReducer from "./authReducer";

// Initial state for authentication
const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: true,
  user: true,
  error: null,
};

// Create context
export const AuthContext = createContext(initialState);

export const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => {};

  const register = () => {};

  const loadUser = () => {};

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        loading: state.loading,
        user: state.user,
        error: state.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
