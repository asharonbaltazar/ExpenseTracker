import React, { useState, useContext } from "react";
import InputField from "./InputField";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalContext } from "../context/transactions/TransactionState";
import Search from "./Search";

const ActionPanel = ({ query, setQuery, selectedItems, clearSelections }) => {
  const [buttons, setButtons] = useState(null);

  const { deleteTransaction } = useContext(GlobalContext);

  // Delete selected list items
  const deleteSelectedItems = (selections) => {
    selections.forEach((id) => deleteTransaction(id));
    clearSelections();
  };

  const titleDisplay = () => {
    if (query.length) return query + "...";
    else if (buttons === "add") return "Add a transaction";
    else return "Transactions";
  };

  // Style
  const margin = { marginRight: "2px" };

  return (
    <>
      {selectedItems.length > 0 && (
        <div className="options-panel">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20, opacity: 0 }}
            className="options-div"
          >
            <button
              className="actionable-button"
              onClick={() => {
                clearSelections();
                setButtons(null);
              }}
              style={margin}
            >
              <i className="fas fa-times"></i>
            </button>

            <motion.h3
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bold-title"
            >
              {buttons === "edit"
                ? "Edit transaction"
                : `${selectedItems.length} selected`}
            </motion.h3>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence>
              {selectedItems.length === 1 && buttons !== "edit" && (
                <motion.button
                  className="actionable-button"
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  id={buttons === "edit" ? "" : "edit"}
                  onClick={(e) => setButtons(e.target.id)}
                >
                  <i className="fas fa-pen" id="edit"></i>
                </motion.button>
              )}
            </AnimatePresence>
            {buttons === "edit" ? null : (
              <button
                className="actionable-button delete-btn"
                onClick={() => deleteSelectedItems(selectedItems)}
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </motion.div>
          <AnimatePresence>
            {buttons === "edit" && (
              <InputField
                buttons={buttons}
                setButtons={() => setButtons(null)}
                clearSelections={() => clearSelections()}
              />
            )}
          </AnimatePresence>
        </div>
      )}
      {selectedItems.length === 0 && (
        // Search panel
        <div className="search-panel">
          <motion.h3
            className="bold-title"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            {titleDisplay()}
          </motion.h3>
          {/* Search input */}
          <Search buttons={buttons} query={query} setQuery={setQuery} />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {buttons === "edit" || query.length ? null : (
              <button
                className="actionable-button"
                style={{ display: buttons === "search" ? "none" : "inline" }}
                id={buttons === "add" ? "" : "add"}
                onClick={(e) => setButtons(e.target.id)}
              >
                {buttons === "add" ? (
                  <i className="fas fa-times"></i>
                ) : (
                  <i className="fas fa-plus" id="add"></i>
                )}
              </button>
            )}
            <button
              className="actionable-button"
              id={buttons === "search" ? "" : "search"}
              onClick={(e) => setButtons(e.target.id)}
            >
              {buttons === "search" ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-search" id="search"></i>
              )}
            </button>
          </motion.div>
          <AnimatePresence>
            {(buttons === "add" || buttons === "edit") && (
              <InputField buttons={buttons} />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ActionPanel;
