import React, { useContext, useState, useEffect, Fragment } from "react";
import moment from "moment";
import Transaction from "./Transaction";
import Search from "./Search";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const [searchButton, showSearchButton] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  // Regex search functionality
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

  // Sort the transactions by descending dates
  transactions.sort((first, second) => {
    if (first.createdAt > second.createdAt) return -1;
    if (first.createdAt < second.createdAt) return 1;
    return 0;
  });
  // Function to sort the dates by simple terms
  const sorter = (data) => {
    return data.reduce((dates, item) => {
      const createdAt = moment(item.createdAt).calendar(null, {
        lastDay: "[Yesterday]",
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        lastWeek: "dddd",
        nextWeek: "dddd",
        sameElse: "L",
      });

      if (dates[createdAt]) {
        dates[createdAt].push(item);
      } else {
        dates[createdAt] = [item];
      }
      return dates;
    }, {});
  };

  let output = sorter(transactions);

  // Display list
  const listDisplay = () => {
    if (query) {
      // Get the regex value of the query
      let search = filterExpenses(query);
      if (search.length) {
        // Run the query through the date sorter
        search = sorter(search);
        // Render the search
        return Object.keys(search).map((date) => (
          <Fragment key={date}>
            <div className="date-span">{date}</div>
            {search[date].map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
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
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </Fragment>
    ));
  };

  return (
    <>
      <div className="history-search">
        <h3 className="bold-title">{query ? query + "..." : "History"}</h3>
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
