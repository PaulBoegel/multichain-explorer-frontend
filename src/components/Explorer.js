import React from "react";
import DetailPanel from "./DetailPanel";
import "./Explorer.css";
import FilterPanel from "./FilterPanel";
import RelationsPanel from "./RelationsPanel";
import SearchPanel from "./SearchPanel";

export default function Explorer() {
  const entityId = 1;

  const relations = [
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
    { txid: "123123" },
  ];

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
      <RelationsPanel visibleId={entityId} relations={relations} />
      <div className="border-bottom"></div>
    </div>
  );
}
