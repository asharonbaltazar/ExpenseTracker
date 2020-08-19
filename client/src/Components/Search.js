import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Search = ({ buttons, query, setQuery }) => {
  return (
    <AnimatePresence>
      {buttons === "search" && (
        <motion.input
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          exit={{ y: -20, opacity: 0 }}
          type="text"
          id="search"
          className="search-panel-input"
          placeholder="Search your expenses"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          ref={(input) => input && input.focus()}
        />
      )}
    </AnimatePresence>
  );
};
export default Search;
