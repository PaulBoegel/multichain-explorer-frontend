import React, { useState, useEffect } from "react";
import BlockRelations from "./Block/BlockRelations";
import TransactionRelations from "./Transaction/TransactionRelations";
import AddressRelations from "./Address/AddressRelations";
import "./RelationsPanel.css";

export default function RelationsPanel({ entity, onRelationClicked }) {
  const setRelationsPanel = () => {
    if (!entity) return <span class="relationsLoading">loading ...</span>;
    switch (entity.entityId) {
      case 0:
        return (
          <BlockRelations
            relations={entity.getRelations()}
            onRelationClicked={onRelationClicked}
          />
        );
      case 1:
        return (
          <TransactionRelations
            relations={entity.getRelations()}
            onRelationClicked={onRelationClicked}
          />
        );
      case 2:
        return (
          <AddressRelations
            relations={entity.getRelations()}
            onRelationClicked={onRelationClicked}
          />
        );
      default:
        return <span>loading ...</span>;
    }
  };

  return (
    <div className="relations-panel">
      <div className="relations-panel-scroller">{setRelationsPanel()}</div>
    </div>
  );
}
