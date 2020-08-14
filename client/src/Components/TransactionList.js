import React, { useContext, useState, useEffect, Fragment } from "react";
import { sorter, filterExpenses } from "../utils/format";
import Transaction from "./Transaction";
import ActionPanel from "./ActionPanel";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

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
        return Object.keys(search).map((date) => (
          <Fragment key={date}>
            <div className="date-span">{date}</div>
            {search[date].map((transaction) => (
              <Transaction
                key={transaction._id}
                transaction={transaction}
                click={(id) => selectListItems(id)}
                selectedItems={selectedItems}
              />
            ))}
          </Fragment>
        ));
      } else return "Sorry. Nothing matches that query.";
    }
    // Render the list in dates
    return Object.keys(output).map((date) => (
      <Fragment key={date}>
        <div className="date-span">{date}</div>
        {output[date].map((transaction) => (
          <Transaction
            key={transaction._id}
            transaction={transaction}
            click={(id) => selectListItems(id)}
            selectedItems={selectedItems}
          />
        ))}
      </Fragment>
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

      <ul className="list disable-scrollbars">
        {transactions.length === 0
          ? "You have no expenses."
          : listDisplay(query)}
      </ul>
    </>
  );
};

export default TransactionList;
