import React, { useState } from "react";
import Search from "./Search";

const ActionPanel = ({ query, setQuery, selectedItems, clearSelections }) => {
  const [searchButton, showSearchButton] = useState(false);
  return (
    <>
      {selectedItems.length ? (
        <div className="options-panel">
          <div>
            <button className="actionable-button" onClick={clearSelections}>
              <i className="fas fa-times"></i>
            </button>
            <h3 className="bold-title">{`${selectedItems.length} selected`}</h3>
          </div>

          <div>
            {selectedItems.length === 1 && (
              <button className="actionable-button">
                <i className="fas fa-pen"></i>
              </button>
            )}
            <button className="actionable-button delete-btn">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="search-panel">
          <h3 className="bold-title">{query ? query + "..." : "History"}</h3>
          <Search search={searchButton} query={query} setQuery={setQuery} />
          <button
            className="actionable-button"
            onClick={() => showSearchButton(!searchButton)}
          >
            {searchButton ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ActionPanel;
