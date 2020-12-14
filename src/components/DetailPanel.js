import React, { useState, useEffect } from "react";
import BlockDetail from "./Block/BlockDetail";
import TransactionDetail from "./Transaction/TransactionDetail";
import AddressDetail from "./Address/AddressDetail";

export default function DetailPanel({ visibleId, details }) {
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
    <div className="detail-panel">
      <BlockDetail visible={blockVisible} details={details} />
      <TransactionDetail visible={transactionVisible} details={details} />
      <AddressDetail visible={addressVisible} />
    </div>
  );
}
