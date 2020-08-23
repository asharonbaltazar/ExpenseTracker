import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/transactions/TransactionState";

const InputField = ({ buttons, setButtons, clearSelections }) => {
  const {
    clickedTransaction,
    addTransaction,
    updateTransaction,
    setLoading,
  } = useContext(GlobalContext);

  const [text, setText] = useState(
    buttons === "edit" ? clickedTransaction.text : ""
  );
  const [amount, setAmount] = useState(
    buttons === "edit" ? clickedTransaction.amount.toString() : 0
  );

  const onSubmit = (e) => {
    if (!amount.length || !text.length) return e.preventDefault();

    if (buttons === "add") {
      const transaction = {
        text,
        amount: +amount,
        createdAt: new Date(),
      };
      addTransaction(transaction);
      setText("");
      setAmount("");
    }
    if (buttons === "edit") {
      const transaction = {
        id: clickedTransaction._id,
        text,
        amount: +amount,
      };
      updateTransaction(transaction);
      setButtons();
      clearSelections();
    }

    e.preventDefault();
  };

  return (
    <motion.div
      className="input-fields"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      exit={{ y: -10, opacity: 0 }}
    >
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            placeholder="Enter name..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <i>$</i>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
          className="btn"
        >
          {buttons === "add" ? "Add Transaction" : "Edit Transaction"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default InputField;
