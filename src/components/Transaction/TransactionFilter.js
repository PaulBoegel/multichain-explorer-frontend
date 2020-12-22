import React, { useEffect, useState } from "react";
import "./TransactionFilter.css";
export default function TransactionFilter({
  visible,
  onKeyDown,
  onFromMaxChange,
  onFromMinChange,
  onToMaxChange,
  onToMinChange,
}) {
  const [isVisible, setIsVisible] = useState(null);
  const [fromMin, setFromMin] = useState(0);
  const [fromMax, setFromMax] = useState(1000000);
  const [toMin, setToMin] = useState(0);
  const [toMax, setToMax] = useState(100000);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const onFromMaxValueChange = (event) => {
    setFromMax(event.target.value);
    onFromMaxChange(event);
  };
  const onFromMinValueChange = (event) => {
    setFromMin(event.target.value);
    onFromMinChange(event);
  };
  const onToMaxValueChange = (event) => {
    setToMax(event.target.value);
    onToMaxChange(event);
  };
  const onToMinValueChange = (event) => {
    setToMin(event.target.value);
    onToMinChange(event);
  };

  if (!isVisible) return null;

  return (
    <div className="filter-options transaction-filter-grid">
      <div className="transaction-filter-border-top"></div>
      <div className="transaction-filter-border-left"></div>
      <div className="transaction-filter-from">
        <label>From Min:</label>
        <input
          type="text"
          value={fromMin}
          onChange={onFromMinValueChange}
          onKeyDown={onKeyDown}
        />
        <label>From Max:</label>
        <input
          type="text"
          value={fromMax}
          onChange={onFromMaxValueChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="transaction-filter-border-middle"></div>
      <div className="transaction-filter-to">
        <label>To Min:</label>
        <input
          type="text"
          value={toMin}
          onChange={onToMinValueChange}
          onKeyDown={onKeyDown}
        />
        <label>To Max:</label>
        <input
          type="text"
          value={toMax}
          onChange={onToMaxValueChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="transaction-filter-border-bottom"></div>
    </div>
  );
}
