import React, { useState } from "react";
import Dropdown from "./Dropdown";
import BlockFilter from "./Block/BlockFilter";
import TransactionFilter from "./Transaction/TransactionFilter";
import AddressFilter from "./Address/AddressFilter";
import "./FilterPanel.css";

export default function FilterPanel({ getFilterValues }) {
  const [blockVisible, setBlockVisible] = useState(true);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);

  const arrowColor = "rgb(210, 142, 121)";
  const filterOptions = [
    { value: 0, name: "Block" },
    { value: 1, name: "Transaktion" },
    { value: 2, name: "Adresse" },
  ];
  const [transactionFilter, setTransactionFilter] = useState({
    fromMin: 0,
    fromMax: 1000000000,
    toMin: 0,
    toMax: 1000000000,
  });
  const [addressFilter, setAddressFilter] = useState({
    inMin: 0,
    inMax: 1000000000,
    outMin: 0,
    outMax: 1000000000,
  });
  const handleDropdownChange = (event) => {
    setEntityVisibility(parseInt(event.target.value));
    event.preventDefault();
  };

  const onFromMaxChange = (event) => {
    const { value } = event.target;
    transactionFilter.fromMax = parseFloat(value);
    setTransactionFilter(transactionFilter);
  };
  const onFromMinChange = (event) => {
    const { value } = event.target;
    transactionFilter.fromMin = parseFloat(value);
    setTransactionFilter(transactionFilter);
  };
  const onToMaxChange = (event) => {
    const { value } = event.target;
    transactionFilter.toMax = parseFloat(value);
    setTransactionFilter(transactionFilter);
  };
  const onToMinChange = (event) => {
    const { value } = event.target;
    transactionFilter.toMin = parseFloat(value);
    setTransactionFilter(transactionFilter);
  };

  const onInMaxChange = (event) => {
    const { value } = event.target;
    addressFilter.inMax = parseFloat(value);
    setAddressFilter(addressFilter);
  };
  const onInMinChange = (event) => {
    const { value } = event.target;
    addressFilter.inMin = parseFloat(value);
    setAddressFilter(addressFilter);
  };
  const onOutMaxChange = (event) => {
    const { value } = event.target;
    addressFilter.outMax = parseFloat(value);
    setAddressFilter(addressFilter);
  };
  const onOutMinChange = (event) => {
    const { value } = event.target;
    addressFilter.outMin = parseFloat(value);
    setAddressFilter(addressFilter);
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      getFilterValues({ transactionFilter, addressFilter });
    }
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
          optionsColor={"#d28e79"}
          onChange={handleDropdownChange}
        />
        ;
      </div>
      <div className="filter-option-bar">
        <BlockFilter visible={blockVisible} />
        <TransactionFilter
          visible={transactionVisible}
          onKeyDown={onKeyDown}
          onFromMaxChange={onFromMaxChange}
          onFromMinChange={onFromMinChange}
          onToMaxChange={onToMaxChange}
          onToMinChange={onToMinChange}
          fromMaxIn={transactionFilter.fromMax}
          fromMinIn={transactionFilter.fromMin}
          toMaxIn={transactionFilter.toMax}
          toMinIn={transactionFilter.toMin}
        />
        <AddressFilter
          visible={addressVisible}
          onKeyDown={onKeyDown}
          onInMaxChange={onInMaxChange}
          onInMinChange={onInMinChange}
          onOutMaxChange={onOutMaxChange}
          onOutMinChange={onOutMinChange}
          inMaxIn={addressFilter.inMin}
          inMinIn={addressFilter.inMax}
          outMaxIn={addressFilter.outMax}
          outMinIn={addressFilter.outMin}
        />
      </div>
    </div>
  );
}
