import React, { useContext } from "react";
import { numberWithCommas } from "../utils/format";

import { GlobalContext } from "../context/GlobalState";

const Transaction = ({ transaction, click }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      className={transaction.amount < 0 ? "minus" : "plus"}
      onClick={() => click(transaction._id)}
    >
      {transaction.text}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default Transaction;
