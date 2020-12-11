import React from "react";
import "./Explorer.css";
import FilterPanel from "./FilterPanel";
import SearchPanel from "./SearchPanel";

export default function Explorer() {
  return (
    <div className="explorer-grid">
      <div className="border-top"></div>
      <div className="border-left"></div>
      <div className="border-right"></div>
      <div className="search-panel">
        <SearchPanel />
      </div>
      <div className="first-horizontal-border"></div>
      <div className="filter-panel">
        <FilterPanel />
      </div>
      <div className="second-horizontal-border"></div>
      <div className="data-panel"></div>
      <div className="graph-panel"></div>
      <div className="relation-panel"></div>
      <div className="border-bottom"></div>
    </div>
  );
}
