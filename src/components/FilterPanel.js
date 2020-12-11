import React, { useState } from "react";
import Dropdown from "./Dropdown";
import BlockFilter from "./Block/BlockFilter";
import TransactionFilter from "./Transaction/TransactionFilter";
import AddressFilter from "./Address/AddressFilter";
import "./FilterPanel.css";

export default function FilterPanel() {
  const [blockVisible, setBlockVisible] = useState(true);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);

  const arrowColor = "rgb(210, 142, 121)";
  const filterOptions = [
    { value: 0, name: "Block" },
    { value: 1, name: "Transaktion" },
    { value: 2, name: "Adresse" },
  ];
  const handleDropdownChange = (event) => {
    setEntityVisibility(parseInt(event.target.value));
    event.preventDefault();
  };
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
    <div className="filter-panel filter-panel-grid">
      <div className="filter-dropdown">
        <Dropdown
          arrowColor={arrowColor}
          options={filterOptions}
          onChange={handleDropdownChange}
        />
        ;
      </div>
      <div className="filter-option-bar">
        <BlockFilter visible={blockVisible} />
        <TransactionFilter visible={transactionVisible} />
        <AddressFilter visible={addressVisible} />
      </div>
    </div>
  );
}
