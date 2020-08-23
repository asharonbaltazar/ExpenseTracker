import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sorter, filterExpenses } from "../utils/format";
import DateSpan from "./DateSpan";
import Transaction from "./Transaction";
import ActionPanel from "./ActionPanel";
import { GlobalContext } from "../context/transactions/TransactionState";

const TransactionList = () => {
  const { transactions, getTransactions, loading } = useContext(GlobalContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  // Animation parameters
  const transitionList = {
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };
  const transitionItem = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -20 },
  };

  // Function to sort the dates by simple terms
  let output = sorter(transactions);

  const selectListItems = (id) => {
    if (!selectedItems.includes(id)) setSelectedItems([...selectedItems, id]);
    if (selectedItems.includes(id)) {
      setSelectedItems((elements) =>
        elements.filter((element) => element !== id)
      );
    }
  };

  // Display list
  const listDisplay = () => {
    if (query) {
      // Get the regex value of the query
      let search = filterExpenses(query, transactions);
      if (search.length) {
        // Run the query through the date sorter
        search = sorter(search);
        // Render the search
        return Object.keys(search).map((date, index) => (
          <div key={date}>
            <DateSpan variants={transitionItem} date={date} />
            {search[date].map((transaction) => (
              <Transaction
                key={transaction._id}
                transaction={transaction}
                click={(id) => selectListItems(id)}
                selectedItems={selectedItems}
                transitionItem={transitionItem}
              />
            ))}
          </div>
        ));
      } else return "Sorry. Nothing matches that query.";
    }
    // Render the list in dates
    return Object.keys(output).map((date, index) => (
      <div key={date}>
        <DateSpan variants={transitionItem} date={date} />
        {output[date].map((transaction) => (
          <Transaction
            key={transaction._id}
            transaction={transaction}
            click={(id) => selectListItems(id)}
            selectedItems={selectedItems}
            transitionItem={transitionItem}
          />
        ))}
      </div>
    ));
  };

  return (
    <>
      <ActionPanel
        query={query}
        setQuery={setQuery}
        selectedItems={selectedItems}
        clearSelections={() => setSelectedItems([])}
      />

      <motion.ul
        className="list disable-scrollbars"
        initial="hidden"
        animate="visible"
        variants={transitionList}
      >
        {transactions.length === 0 && !loading
          ? "You have no expenses."
          : listDisplay()}
      </motion.ul>
    </>
  );
};

export default TransactionList;
