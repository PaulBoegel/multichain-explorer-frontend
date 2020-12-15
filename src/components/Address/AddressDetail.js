import "./AddressDetail.css";
import React, { useEffect, useState } from "react";

export default function AddressDetail({ visible, details }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  if (!details) return null;
  return (
    <div className="address-details-grid">
      <div className="address-details-border-left"></div>
      <div className="address-details-top-section">
        <label className="transacton-details-label-address">Address: </label>
        <div className="address-details-value-address">{details.address}</div>
        <label className="transacton-details-label-balance">Balance: </label>
        <div className="address-details-value-balance">{details.balance}</div>
      </div>
      <div className="address-details-divider"></div>
      <div className="address-details-bottom-section"></div>
    </div>
  );
}
