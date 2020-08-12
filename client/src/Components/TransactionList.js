import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import Transaction from "./Transaction";
import Search from "./Search";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const [searchButton, showSearchButton] = useState(false);
  const [query, setQuery] = useState("");

  const output = transactions.reduce((dates, item) => {
    if (dates[item.createdAt]) {
      dates[item.createdAt].push(item);
    } else {
      dates[item.createdAt] = [item];
    }

    return dates;
  }, {});

  console.log(output);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  let filterExpenses = (query) => {
    query = Array.from(query).reduce(
      (a, v, i) => `${a}[^${query.substr(i)}]*?${v}`,
      ""
    );
    const regex = RegExp(query, "i");
    const result = transactions.filter((transaction) =>
      transaction.text.match(regex)
    );
    return result;
  };

  const listDisplay = () => {
    if (query) {
      const search = filterExpenses(query);
      if (search.length)
        return search.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ));
      else return "Sorry. Nothing matches that query.";
    }
    return transactions.map((transaction) => (
      <Transaction key={transaction._id} transaction={transaction} />
    ));
  };

  return (
    <>
      <div className="history-search">
        <h3 className="bold-title">History</h3>
        <Search
          search={searchButton}
          query={query}
          setQuery={setQuery}
          filterExpenses={filterExpenses}
        />
        <button
          className="search-button"
          onClick={() => showSearchButton(!searchButton)}
        >
          {searchButton ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-search"></i>
          )}
        </button>
      </div>

      <ul className="list disable-scrollbars">
        {transactions.length === 0 ? "You have no expenses." : listDisplay()}
      </ul>
    </>
  );
};

export default TransactionList;
