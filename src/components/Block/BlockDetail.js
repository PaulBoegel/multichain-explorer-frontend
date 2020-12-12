import React, { useEffect, useState } from "react";
import "./BlockDetail.css";

export default function BlockDetail({ visible }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  return (
    <div className="block-details-grid">
      <div className="block-details-border-left"></div>
      <div className="block-details-top-section">
        <label className="transacton-details-label-hash">Hash </label>
        <div className="block-details-value-hash">0x24fae02a563f2 ...</div>
        <label className="transacton-details-label-height">Height: </label>
        <div className="block-details-value-height">12341211</div>
        <label className="transacton-details-label-mined">Mined: </label>
        <div className="block-details-value-mined">01.05.2020 / 12:30 PM</div>
      </div>
      <div className="block-details-divider"></div>
      <div className="block-details-bottom-section">
        <label className="transacton-details-label-parent">Parent: </label>
        <a href="#" className="block-details-value-parent">
          0x250de02a23cf ...
        </a>
        <label className="transacton-details-label-transaction-count">
          Transaction Count:
        </label>
        <div className="block-details-value-transaction-count">112</div>
      </div>
      <div className="block-details-border-right"></div>
    </div>
  );
}
