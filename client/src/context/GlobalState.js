import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  transactions: [],
  clickedTransaction: null,
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  // Add transaction
  const getTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Add a transaction
  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await axios.post("/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Update a transaction
  const updateTransaction = async (transaction) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.put(
        `/transactions/${transaction.id}`,
        transaction,
        config
      );

      getTransactions();

      dispatch({ type: "UPDATE_TRANSACTION", payload: response.data });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Allowing a selected item to be accessed throughout the application
  const selectingTransaction = (transaction) => {
    dispatch({ type: "SELECTED_TRANSACTION", payload: transaction });
  };

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        clickedTransaction: state.clickedTransaction,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
        updateTransaction,
        selectingTransaction,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
