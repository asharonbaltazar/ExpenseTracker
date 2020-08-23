import React, { useReducer, createContext } from "react";
import axios from "axios";
import authReducer from "./authReducer";

// Initial state for authentication
const initialState = {
  token: localStorage.getItem("token"),
  isAuth: true,
  isLoading: false,
  user: true,
  error: null,
};

// Create context
export const AuthContext = createContext(initialState);

export const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async () => {};

  const register = async () => {};

  const loadUser = async () => {};

  const logout = async () => {};

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
