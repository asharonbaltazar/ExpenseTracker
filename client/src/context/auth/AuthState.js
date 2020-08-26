import React, { useReducer, createContext } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import authReducer from "./authReducer";

// Initial state for authentication
const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: true,
  user: null,
  error: null,
};

// Create context
export const AuthContext = createContext(initialState);

export const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const response = await axios.get("/auth");

      dispatch({
        type: "USER_LOADED",
        action: response.data,
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  const login = async (form) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await axios.get("/auth", form, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  const register = async (form) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await axios.post("/users", form, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
