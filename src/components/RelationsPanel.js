import React, { useState, useEffect } from "react";
import BlockRelations from "./Block/BlockRelations";
import TransactionRelations from "./Transaction/TransactionRelations";
import AddressRelations from "./Address/AddressRelations";

export default function RelationsPanel({ visibleId }) {
  const [blockVisible, setBlockVisible] = useState(true);
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
      <BlockRelations visible={blockVisible} />
      <TransactionRelations visible={transactionVisible} />
      <AddressRelations visible={addressVisible} />
    </div>
  );
}
