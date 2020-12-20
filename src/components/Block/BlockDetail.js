import "./BlockDetail.css";

export default function BlockDetail({ details }) {
  return (
    <div className="block-details-grid">
      <div className="block-details-border-left"></div>
      <div className="block-details-top-section">
        <label className="transacton-details-label-hash">Hash </label>
        <div className="block-details-value-hash">
          {details.hash.substring(0, 15) + "..."}
        </div>
        <label className="transacton-details-label-height">Height: </label>
        <div className="block-details-value-height">{details.height}</div>
        <label className="transacton-details-label-mined">Mined: </label>
        <div className="block-details-value-mined">{details.mined}</div>
      </div>
      <div className="block-details-divider"></div>
      <div className="block-details-bottom-section">
        <label className="transacton-details-label-parent">Parent: </label>
        <a href="#" className="block-details-value-parent">
          {details.parent.substring(0, 15) + "..."}
        </a>
        <label className="transacton-details-label-transaction-count">
          Transaction Count:
        </label>
        <div className="block-details-value-transaction-count">
          {details.transactionCount}
        </div>
      </div>
      <div className="block-details-border-right"></div>
    </div>
  );
}
