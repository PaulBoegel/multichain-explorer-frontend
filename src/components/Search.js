import React from "react";
import "./Search.css";

export default function Search({ searchText, onSearchTextChanged, onKeyDown }) {
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
