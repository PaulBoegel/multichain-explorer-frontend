import React, { useEffect, useState } from "react";
import "./AddressRelations.css";

export default function AddressRelations({ relations, onRelationClicked }) {
  const [inContainer, setFromContainer] = useState([]);
  const [outContainer, setToContainer] = useState([]);

  const formatContainerStrings = ({ containers }) => {
    if (!containers) return;
    let formatedContainers = [];
    containers.forEach((container) => {
      if (container.length === 0) {
        formatedContainers.push([]);
        return;
      }

      formatedContainers.push(
        container.map((txObj) => {
          return {
            txidShort: txObj.txid.substring(0, 40) + "...",
            txid: txObj.txid,
            value: txObj.value,
          };
        })
      );
    });

    return formatedContainers;
  };

  const fillContainer = ({ relations = [] }) => {
    const containers = [];

    let relationsInContainer = Math.floor(relations.length / 1);
    if (relationsInContainer === 0) relationsInContainer = 1;
    const remindRelations = relations.length % 1;
    let relationsIndex = 0;
    for (let index = 0; index < 1; index++) {
      containers.push(
        relations.slice(relationsIndex, relationsIndex + relationsInContainer)
      );
      relationsIndex += relationsInContainer;
    }

    for (let index = 0; index < remindRelations; index++) {
      if (remindRelations <= 0) break;
      containers[index].push(
        ...relations.slice(relationsIndex, relationsIndex + 1)
      );
    }

    return formatContainerStrings({ containers });
  };

  useEffect(() => {
    if (!relations || relations.length === 0) return null;
    const inContainer = fillContainer({
      relations: relations[0],
    });
    const outContainer = fillContainer({
      relations: relations[1],
    });

    setFromContainer(inContainer);
    setToContainer(outContainer);
  }, [relations]);

  return (
    <div className="address-relations-grid">
      <div className="address-relations-in">
        <div className="relationsTitle">In</div>
        <div
          className="address-relations-in-grid"
          style={{ gridTemplateColumns: "auto" }}
        >
          {inContainer.map((container, key) => {
            return (
              <div
                key={key}
                style={{ gridColumn: `${key + 1} / ${key + 2}` }}
                className="relations-container address-relations-container"
              >
                <ul>
                  {container.map((tx, key) => {
                    return (
                      <li key={key}>
                        <a
                          className="address-relation-link"
                          href="#"
                          data-id={tx.txid}
                          data-entity={1}
                          onClick={onRelationClicked}
                        >
                          {tx.txidShort}
                        </a>
                        <div className="address-relation-li-border"></div>
                        <div className="address-relation-value">{tx.value}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="address-relations-divider"></div>
      <div className="address-relations-out">
        <div className="relationsTitle">Out</div>
        <div
          className="address-relations-out-grid"
          style={{ gridTemplateColumns: "auto" }}
        >
          {outContainer.map((container, key) => {
            return (
              <div
                key={key}
                style={{ gridColumn: `${key + 1} / ${key + 2}` }}
                className="relations-container address-relations-container"
              >
                <ul>
                  {container.map((tx, key) => {
                    return (
                      <li key={key}>
                        <a
                          className="address-relation-link"
                          href="#"
                          data-id={tx.txid}
                          data-entity={1}
                          onClick={onRelationClicked}
                        >
                          {tx.txidShort}
                        </a>
                        <div className="address-relation-li-border"></div>
                        <div className="address-relation-value">{tx.value}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
