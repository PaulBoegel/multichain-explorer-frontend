import React from "react";
import "./Search.css";

export default function Search({ onSearchTextChanged, onKeyDown }) {
  return (
    <input
      type="text"
      onKeyDown={onKeyDown}
      onChange={onSearchTextChanged}
      placeholder="Search ..."
      className="search-input"
    />
  );
}
