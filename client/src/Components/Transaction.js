import React, { useState, useContext } from "react";
import { numberWithCommas } from "../utils/format";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer-motion";

const Transaction = ({ transaction, click, selectedItems, transitionItem }) => {
  const [selected, setSelected] = useState(false);
  const selectedStyling = () => {
    if (!selectedItems.length) return setSelected(false);
    if (selectedItems.length) return { backgroundColor: "#dedede" };
  };
  const transactionContext = useContext(GlobalContext);
  const { selectingTransaction } = transactionContext;

  const { _id, text, amount } = transaction;

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <motion.li
      style={selected ? selectedStyling() : { backgroundColor: "white" }}
      className={transaction.amount < 0 ? "minus" : "plus"}
      onClick={() => {
        click(_id);
        setSelected(() => !selected);
        selectingTransaction({
          _id,
          text,
          amount,
        });
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      variants={transitionItem}
    >
      {text}
      <span>
        {sign}${numberWithCommas(Math.abs(amount))}
      </span>
    </motion.li>
  );
};

export default Transaction;
