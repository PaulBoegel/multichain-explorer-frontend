import React, { useEffect, useState } from "react";
import "./TransactionFilter.css";
export default function TransactionFilter({
  visible,
  onFromMaxChange,
  onFromMinChange,
  onToMaxChange,
  onToMinChange,
}) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <div className="filter-options transaction-filter-grid">
      <div className="transaction-filter-border-top"></div>
      <div className="transaction-filter-border-left"></div>
      <div className="transaction-filter-from">
        <label>From Max:</label>
        <input type="text" onChange={onFromMaxChange} />
        <label>From Min:</label>
        <input type="text" onChange={onFromMinChange} />
      </div>
      <div className="transaction-filter-border-middle"></div>
      <div className="transaction-filter-to">
        <label>To Max:</label>
        <input type="text" onChange={onToMaxChange} />
        <label>To Min:</label>
        <input type="text" onChange={onToMinChange} />
      </div>
      <div className="transaction-filter-border-bottom"></div>
    </div>
  );
}
