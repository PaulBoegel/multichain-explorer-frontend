import React, { useEffect, useState } from "react";
import "./AddressFilter.css";
export default function AddressFilter({
  visible,
  onInMaxChange,
  onInMinChange,
  onOutMaxChange,
  onOutMinChange,
  onKeyDown,
}) {
  const [isVisible, setIsVisible] = useState(null);
  const [inMax, setInMax] = useState(1000000);
  const [inMin, setInMin] = useState(0);
  const [outMax, setOutMax] = useState(1000000);
  const [outMin, setOutMin] = useState(0);

  const onInMaxValueChange = (event) => {
    setInMax(event.target.value);
    onInMaxChange(event);
  };

  const onInMinValueChange = (event) => {
    setInMin(event.target.value);
    onInMaxChange(event);
  };

  const onOutMaxValueChange = (event) => {
    setOutMax(event.target.value);
    onInMaxChange(event);
  };

  const onOutMinValueChange = (event) => {
    setOutMin(event.target.value);
    onInMaxChange(event);
  };

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <div className="filter-options address-filter-grid">
      <div className="address-filter-border-top"></div>
      <div className="address-filter-border-left"></div>
      <div className="address-filter-from">
        <label>In Min:</label>
        <input
          type="text"
          value={inMin}
          onChange={onInMinValueChange}
          onKeyDown={onKeyDown}
        />
        <label>In Max:</label>
        <input
          type="text"
          value={inMax}
          onChange={onInMaxValueChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="address-filter-border-middle"></div>
      <div className="address-filter-to">
        <label>Out Max:</label>
        <input
          type="text"
          value={outMin}
          onChange={onOutMinValueChange}
          onKeyDown={onKeyDown}
        />
        <label>Out Min:</label>
        <input
          type="text"
          value={outMax}
          onChange={onOutMaxValueChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="address-filter-border-bottom"></div>
    </div>
  );
}
