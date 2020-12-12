import React, { useEffect, useState } from "react";
import "./AddressFilter.css";
export default function AddressFilter({
  visible,
  onInMaxChange,
  onInMinChange,
  onOutMaxChange,
  onOutMinChange,
}) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <div className="filter-options address-filter-grid">
      <div className="address-filter-border-top"></div>
      <div className="address-filter-border-left"></div>
      <div className="address-filter-from">
        <label>In Max:</label>
        <input type="text" onChange={onInMaxChange} />
        <label>In Min:</label>
        <input type="text" onChange={onInMinChange} />
      </div>
      <div className="address-filter-border-middle"></div>
      <div className="address-filter-to">
        <label>Out Max:</label>
        <input type="text" onChange={onOutMaxChange} />
        <label>Out Min:</label>
        <input type="text" onChange={onOutMinChange} />
      </div>
      <div className="address-filter-border-bottom"></div>
    </div>
  );
}
