import React from "react";
import DetailPanel from "./DetailPanel";
import "./Explorer.css";
import FilterPanel from "./FilterPanel";
import RelationsPanel from "./RelationsPanel";
import SearchPanel from "./SearchPanel";

export default function Explorer() {
  const entityId = 0;
  return (
    <div className="explorer-grid">
      <div className="border-top"></div>
      <div className="border-left"></div>
      <div className="border-right"></div>
      <SearchPanel />
      <div className="first-horizontal-border"></div>
      <FilterPanel />
      <div className="second-horizontal-border"></div>
      <DetailPanel visibleId={entityId} />
      <div className="graph-panel"></div>
      <RelationsPanel visibleId={entityId} />
      <div className="border-bottom"></div>
    </div>
  );
}
