import React, { useState, useEffect } from "react";
import BlockRelations from "./Block/BlockRelations";
import TransactionRelations from "./Transaction/TransactionRelations";
import AddressRelations from "./Address/AddressRelations";
import "./RelationsPanel.css";

export default function RelationsPanel({ visibleId, relations }) {
  const [blockVisible, setBlockVisible] = useState(false);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);

  useEffect(() => {
    setEntityVisibility(parseInt(visibleId));
  }, [visibleId]);

  const setEntityVisibility = (entityId) => {
    switch (entityId) {
      case 1:
        setBlockVisible(false);
        setTransactionVisible(true);
        setAddressVisible(false);
        break;
      case 2:
        setBlockVisible(false);
        setTransactionVisible(false);
        setAddressVisible(true);
        break;
      default:
        setBlockVisible(true);
        setTransactionVisible(false);
        setAddressVisible(false);
    }
  };

  return (
    <div className="relations-panel">
      <div className="relations-panel-scroller">
        <BlockRelations visible={blockVisible} relations={relations} />
        <TransactionRelations
          visible={transactionVisible}
          relations={relations}
        />
        <AddressRelations visible={addressVisible} relations={relations} />
      </div>
    </div>
  );
}
