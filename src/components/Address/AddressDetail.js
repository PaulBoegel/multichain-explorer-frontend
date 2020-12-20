import "./AddressDetail.css";

export default function AddressDetail({ visible, details }) {
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
      <div className="address-details-bottom-section">
        <label className="transacton-details-label-input-count">
          Input Count:{" "}
        </label>
        <div className="address-details-value-input-count">
          {details.inTransactionCount}
        </div>
        <label className="transacton-details-label-output-count">
          Output Count:{" "}
        </label>
        <div className="address-details-value-output-count">
          {details.outTransactionCount}
        </div>
      </div>
    </div>
  );
}
