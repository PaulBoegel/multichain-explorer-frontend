import React from "react";
import "./SearchPanel.css";
import Search from "./Search";
import Dropdown from "./Dropdown";

export default function SearchPanel() {
  const arrowColor = "rgb(103, 136, 155)";
  const blockchainOptions = [
    { value: 0, name: "Bitcoin" },
    { value: 1, name: "Litecoin" },
    { value: 2, name: "Dash" },
    { value: 3, name: "Ethereum" },
  ];

  return (
    <div className="search-panel-grid">
      <div className="search-bar">
        <Search />
      </div>
      <div className="search-border"></div>
      <div className="search-dropdown">
        <Dropdown arrowColor={arrowColor} options={blockchainOptions} />
      </div>
    </div>
  );
}
