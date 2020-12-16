import React from "react";
import "./SearchPanel.css";
import Search from "./Search";
import Dropdown from "./Dropdown";

export default function SearchPanel({
  onDropdownChanged,
  onSearchTextChanged,
  blockchainOptions,
  onSearchInputKeyDown,
  searchText,
}) {
  const arrowColor = "rgb(103, 136, 155)";

  return (
    <div className="search-panel search-panel-grid">
      <div className="search-bar">
        <Search
          searchText={searchText}
          onSearchTextChanged={onSearchTextChanged}
          onKeyDown={onSearchInputKeyDown}
        />
      </div>
      <div className="search-border"></div>
      <div className="search-dropdown">
        <Dropdown
          onChange={onDropdownChanged}
          arrowColor={arrowColor}
          optionsColor={"#67889b"}
          options={blockchainOptions}
        />
      </div>
    </div>
  );
}
