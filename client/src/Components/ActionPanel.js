import React, { useState } from "react";
import Search from "./Search";

const ActionPanel = ({ query, setQuery }) => {
  const [searchButton, showSearchButton] = useState(false);

  return (
    <div className="history-search">
      <h3 className="bold-title">{query ? query + "..." : "History"}</h3>
      <Search search={searchButton} query={query} setQuery={setQuery} />
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
  );
};

export default ActionPanel;
