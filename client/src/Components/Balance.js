import React, { useContext } from "react";
import { numberWithCommas } from "../utils/format";
import { GlobalContext } from "../context/transactions/TransactionState";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h3 className="bold-title">Your Balance</h3>
      <h1 className="bold-title">${numberWithCommas(total)}</h1>
    </>
  );
};

export default Balance;
