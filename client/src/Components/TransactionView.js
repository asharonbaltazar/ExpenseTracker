import React from "react";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

const TransactionView = () => {
  return (
    <div className="transaction-view">
      <TransactionList />
    </div>
  );
};

export default TransactionView;
