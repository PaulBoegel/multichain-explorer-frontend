import React from "react";
import Dropdown from "./Dropdown";
import "./FilterPanel.css";

export default function FilterPanel() {
  const arrowColor = "rgb(210, 142, 121)";
  const filterOptions = [
    { value: 0, name: "Block" },
    { value: 1, name: "Transaktion" },
    { value: 2, name: "Adresse" },
  ];
  return (
    <div className="filter-panel-grid">
      <div className="filter-dropdown">
        <Dropdown arrowColor={arrowColor} options={filterOptions} />;
      </div>
      <div className="filter-border"></div>
      <div className="filter-option-bar"></div>
    </div>
  );
}
