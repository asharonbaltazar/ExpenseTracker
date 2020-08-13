import React, { useContext, useState } from "react";
import { numberWithCommas } from "../utils/format";
import { GlobalContext } from "../context/GlobalState";

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [show, setShow] = useState(false);

  const sign = transaction.amount < 0 ? "-" : "+";

  // Individual button colors
  const remove = {
    backgroundColor: "#e74c3c",
  };
  const pen = {
    backgroundColor: "#9c88ff",
  };

  return (
    <li
      className={transaction.amount < 0 ? "minus" : "plus"}
      onClick={(e) => {
        setShow(!show);
        console.log(e.target);
      }}
    >
      {transaction.text}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <div className="list-buttons">
        <button style={remove}>
          <i className="fas fa-times"></i>
        </button>
        <button style={pen}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </li>
  );
};

export default Transaction;
