import React, { useState } from "react";
import "./Search.css";

export default function Search({ searchTextIn, onKeyDown }) {
  const [searchText, setSearchText] = useState(searchTextIn);

  const onSearchTextChanged = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <input
      type="text"
      value={searchText}
      onKeyDown={onKeyDown}
      onChange={onSearchTextChanged}
      placeholder="Search ..."
      className="search-input"
    />
  );
}
