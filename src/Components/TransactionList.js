import React, { useContext, useState } from "react";
import Transaction from "./Transaction";
import Search from "./Search";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
  const [search, showSearch] = useState(false);
  const [query, setQuery] = useState("");

  let filteredExpenses = (query) => {
    query = Array.from(query).reduce(
      (a, v, i) => `${a}[^${query.substr(i)}]*?${v}`,
      ""
    );
    const regex = RegExp(query);
    let result = transactions.filter((transaction) =>
      transaction.text.match(regex)
    );
    return result;
  };

  const searchResults = () => {
    if (search && query.length > 0) {
      return filteredExpenses.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
    } else if (!search) {
      return transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
    }
  };

  return (
    <>
      <div className="history-search">
        <h3>History</h3>
        <Search
          search={search}
          query={query}
          setQuery={setQuery}
          filteredExpenses={filteredExpenses}
        />
        <button className="search-button" onClick={() => showSearch(!search)}>
          {search ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-search"></i>
          )}
        </button>
      </div>

      <ul className="list">
        {transactions.length === 0 ? "You have no expenses." : searchResults()}
      </ul>
    </>
  );
};

export default TransactionList;
