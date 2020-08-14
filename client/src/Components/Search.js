import React from "react";
import { Transition } from "react-spring/renderprops";

const Search = ({ search, query, setQuery }) => {
  return (
    <Transition
      items={search}
      config={{ mass: 1, tension: 500, friction: 18 }}
      from={{ transform: "translate3d(0,-10px,0)" }}
      enter={{ transform: "translate3d(0,0px,0)" }}
      leave={{ transform: "translate3d(0,-10px,0)" }}
    >
      {(search) =>
        search
          ? (props) => (
              <input
                style={props}
                type="text"
                placeholder="Search your expenses"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            )
          : () => null
      }
    </Transition>
  );
};

export default Search;
