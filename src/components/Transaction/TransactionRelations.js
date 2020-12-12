import React, { useEffect, useState } from "react";
import "./TransactionRelations.css";

export default function TransactionRelations({ visible, containers }) {
  const [isVisible, setIsVisible] = useState(null);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  let gridTemplateString = "";
  containers.forEach((container) => {
    gridTemplateString += "auto ";
  });

  if (!isVisible) return null;
  return (
    <>
      <div className="relationsTitle">Transactions</div>
      <div
        className="transaction-relations-grid"
        style={{ gridTemplateColumns: gridTemplateString }}
      >
        {containers.map((container, key) => {
          return (
            <div
              key={key}
              style={{ gridColumn: `${key + 1} / ${key + 2}` }}
              className="relations-container transaction-relations-container"
            >
              <ul>
                {container.map((transaction, key) => {
                  return (
                    <li key={key}>
                      <a href="#">{transaction.txid}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
