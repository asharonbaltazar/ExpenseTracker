import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    if (!amount.length || !text.length) return e.preventDefault();

    const transaction = {
      id: Math.floor(Math.random() * 100000),
      text,
      amount: +amount,
    };

    addTransaction(transaction);

    setText("");
    setAmount("");
    e.preventDefault();
  };

  return (
    <>
      <h3 className="bold-title">Add new transaction</h3>
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
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
