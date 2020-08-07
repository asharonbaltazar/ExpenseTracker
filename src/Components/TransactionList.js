import React, { useContext, useState } from "react";
import Transaction from "./Transaction";
import Search from "./Search";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
  const [searchButton, showSearchButton] = useState(false);
  const [query, setQuery] = useState("");

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
          <Transaction key={transaction.id} transaction={transaction} />
        ));
      else return "Sorry. Nothing matches that query.";
    }
    return transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  };

  return (
    <>
      <div className="history-search">
        <h3>History</h3>
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

      <ul className="list">
        {transactions.length === 0 ? "You have no expenses." : listDisplay()}
      </ul>
    </>
  );
};

export default TransactionList;
