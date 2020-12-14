import React, { useEffect, useState } from "react";
import "./TransactionDetail.css";

export default function TransactionDetail({ visible, details }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  if (!details) return null;
  return (
    <div className="transaction-details-grid">
      <div className="transaction-details-border-left"></div>
      <div className="transaction-details-top-section">
        <label className="transacton-details-label-txid">TxID: </label>
        <div className="transaction-details-value-txid">
          {details.txid.substring(0, 15) + "..."}
        </div>
        <label className="transacton-details-label-block">Block: </label>
        <div className="transaction-details-value-block">
          <a href="#">{details.block}</a>
        </div>
        {/* <label className="transacton-details-label-date">Date/Time: </label>
        <div className="transaction-details-value-date">
          01.05.2020 / 12:30 PM
        </div> */}
      </div>
      <div className="transaction-details-divider"></div>
      <div className="transaction-details-bottom-section">
        <label className="transacton-details-label-value">Value: </label>
        <div className="transaction-details-value-value">{details.value}</div>
        {/* <label className="transacton-details-label-fee">Fee: </label>
        <div className="transaction-details-value-fee">213</div> */}
      </div>
      <div className="transaction-details-border-right"></div>
    </div>
  );
}
