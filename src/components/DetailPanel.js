import React, { useState, useEffect } from "react";
import BlockDetail from "./Block/BlockDetail";
import TransactionDetail from "./Transaction/TransactionDetail";
import AddressDetail from "./Address/AddressDetail";
import "./DeteilPanel.css";

export default function DetailPanel({ entity }) {
  if (!entity)
    return (
      <div className="detail-panel">
        <span class="detailLoading">loading ...</span>
      </div>
    );
  switch (entity.entityId) {
    case 0:
      return (
        <div className="detail-panel">
          <BlockDetail details={entity.getDetails()} />
        </div>
      );
    case 1:
      return (
        <div className="detail-panel">
          <TransactionDetail details={entity.getDetails()} />
        </div>
      );
    case 2:
      return (
        <div className="detail-panel">
          <AddressDetail details={entity.getDetails()} />
        </div>
      );
    default:
      return <div className="detail-panel">loading ...</div>;
  }
}
