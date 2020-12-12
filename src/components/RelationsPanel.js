import React, { useState, useEffect } from "react";
import BlockRelations from "./Block/BlockRelations";
import TransactionRelations from "./Transaction/TransactionRelations";
import AddressRelations from "./Address/AddressRelations";
import "./RelationsPanel.css";

export default function RelationsPanel({ visibleId, relations }) {
  const [blockVisible, setBlockVisible] = useState(true);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [containers, setContainers] = useState([]);
  const [containerCount, setContainerCount] = useState(
    window.innerWidth > 850 ? Math.floor(window.innerWidth / 200) : 4
  );

  const updateContainers = () => {
    const containers = fillContainer({ relations });
    setContainers(containers);
  };

  const fillContainer = ({ relations = [] }) => {
    const containers = [];

    const relationsInContainer = Math.floor(relations.length / containerCount);
    const remindRelations = relations.length % containerCount;
    let relationsIndex = 0;
    for (let index = 0; index < containerCount; index++) {
      containers.push(
        relations.slice(relationsIndex, relationsIndex + relationsInContainer)
      );
      relationsIndex += relationsInContainer;
    }

    for (let index = 0; index < remindRelations; index++) {
      if (remindRelations <= 0) break;
      containers[index].push(
        ...relations.slice(relationsIndex, relationsIndex + 1)
      );
    }

    return containers;
  };

  useEffect(() => {
    setEntityVisibility(parseInt(visibleId));
  }, [visibleId]);

  useEffect(() => {
    updateContainers();
  }, [relations]);

  useEffect(() => {
    if (containers.length === containerCount) return;
    updateContainers();
  });

  window.addEventListener("resize", () => {
    setContainerCount(
      window.innerWidth > 850 ? Math.floor(window.innerWidth / 200) : 4
    );
  });

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
        <BlockRelations visible={blockVisible} />
        <TransactionRelations
          visible={transactionVisible}
          containers={containers}
        />
        <AddressRelations visible={addressVisible} />
      </div>
    </div>
  );
}
