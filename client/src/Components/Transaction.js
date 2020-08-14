import React, { useState } from "react";
import { numberWithCommas } from "../utils/format";

const Transaction = ({ transaction, click, selectedItems }) => {
  const [selected, setSelected] = useState(false);
  const selectedStyling = () => {
    if (!selectedItems.length) return setSelected(false);
    if (selectedItems.length) return { backgroundColor: "#dedede" };
  };
  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      style={selected ? selectedStyling() : null}
      className={transaction.amount < 0 ? "minus" : "plus"}
      onClick={() => {
        click(transaction._id);
        setSelected(!selected);
      }}
    >
      {transaction.text}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default Transaction;
