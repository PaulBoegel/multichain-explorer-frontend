import React, { useEffect, useState } from "react";
import "./TransactionRelations.css";

export default function TransactionRelations({
  visible,
  relations,
  onRelationClicked,
}) {
  const [isVisible, setIsVisible] = useState(null);
  const [fromContainer, setFromContainer] = useState([]);
  const [toContainer, setToContainer] = useState([]);

  const formatContainerStrings = ({ containers }) => {
    return containers;
  };

  const fillContainer = ({ relations = [] }) => {
    const containers = [];

    const relationsInContainer = Math.floor(relations.length / 1);
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
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (!relations || relations.length === 0) return null;
    const fromContainer = fillContainer({
      relations: relations[0],
    });
    const toContainer = fillContainer({
      relations: relations[1],
    });

    setFromContainer(fromContainer);
    setToContainer(toContainer);
  }, [relations]);

  if (!isVisible) return null;
  if (!relations) return null;
  return (
    <div className="transaction-relations-grid">
      <div className="transaction-relations-from">
        <div className="relationsTitle">From</div>
        <div
          className="transaction-relations-from-grid"
          style={{ gridTemplateColumns: "auto" }}
        >
          {fromContainer.map((container, key) => {
            return (
              <div
                key={key}
                style={{ gridColumn: `${key + 1} / ${key + 2}` }}
                className="relations-container transaction-relations-container"
              >
                <ul>
                  {container.map((addresses, key) => {
                    return (
                      <li key={key}>
                        {addresses.address.map((address, key) => {
                          return (
                            <a
                              key={key}
                              className="transaction-relation-link"
                              href="#"
                              data-id={address}
                              data-entity={2}
                              onClick={onRelationClicked}
                            >
                              {address}
                            </a>
                          );
                        })}
                        <div className="transaction-relation-li-border"></div>
                        <div className="transaction-relation-value">
                          {addresses.value}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="transaction-relations-divider"></div>
      <div className="transaction-relations-to">
        <div className="relationsTitle">To</div>
        <div
          className="transaction-relations-to-grid"
          style={{ gridTemplateColumns: "auto" }}
        >
          {toContainer.map((container, key) => {
            return (
              <div
                key={key}
                style={{ gridColumn: `${key + 1} / ${key + 2}` }}
                className="relations-container transaction-relations-container"
              >
                <ul>
                  {container.map((addresses, key) => {
                    return (
                      <li key={key}>
                        {addresses.address.map((address, key) => {
                          return (
                            <a
                              key={key}
                              className="transaction-relation-link"
                              href="#"
                              data-id={address}
                              data-entity={2}
                              onClick={onRelationClicked}
                            >
                              {address}
                            </a>
                          );
                        })}
                        <div className="transaction-relation-li-border"></div>
                        <div className="transaction-relation-value">
                          {addresses.value}
                        </div>
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
