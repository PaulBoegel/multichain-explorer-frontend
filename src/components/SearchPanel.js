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
  selected,
}) {
  const arrowColor = "rgb(103, 136, 155)";

  return (
    <div className="search-panel search-panel-grid">
      <div className="search-bar">
        <Search
          searchTextIn={searchText}
          onSearchTextChanged={onSearchTextChanged}
          onKeyDown={onSearchInputKeyDown}
        />
      </div>
      <div className="search-border"></div>
      <div className="search-dropdown">
        <Dropdown
          selected={selected}
          onChange={onDropdownChanged}
          arrowColor={arrowColor}
          optionsColor={"#67889b"}
          options={blockchainOptions}
        />
      </div>
    </div>
  );
}
