import React, { useEffect, useState } from "react";
import "./TransactionRelations.css";

export default function TransactionRelations({ visible, relations }) {
  const [isVisible, setIsVisible] = useState(null);
  const [toTemplateString, setToTemplateString] = useState("");
  const [fromTemplateString, setFromTemplateString] = useState();
  const [fromContainer, setFromContainer] = useState([]);
  const [toContainer, setToContainer] = useState([]);
  const [containerCount, setContainerCount] = useState(
    window.innerWidth > 850 ? Math.floor(window.innerWidth * 0.0025) : 2
  );

  const formatContainerStrings = ({ containers }) => {
    let formatedContainer = [];
    let templateString = "";
    containers.forEach((container) => {
      if (container.length === 0) {
        formatedContainer.push([]);
        return;
      }

      formatedContainer.push(
        ...container.map((addressObj) => {
          const { address } = addressObj;
          return address.map(
            (addressString) => addressString.substring(0, 15) + "..."
          );
        })
      );
      templateString += "auto ";
    });

    return [formatedContainer, templateString];
  };

  const fillContainer = ({ relations = [] }) => {
    const containers = [];

    const relationsInContainer = Math.floor(relations.length / containerCount);
    const remindRelations = relations.length % containerCount;
    let relationsIndex = 0;
    for (let index = 0; index < containerCount; index++) {
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
    if (!isVisible) return null;
    const [fromContainer, fromTemplateString] = fillContainer({
      relations: relations[0],
    });
    const [toContainer, toTemplateString] = fillContainer({
      relations: relations[1],
    });

    setFromContainer(fromContainer);
    setToContainer(toContainer);

    setFromTemplateString(fromTemplateString);
    setToTemplateString(toTemplateString);
  }, [relations]);

  window.addEventListener("resize", () => {
    setContainerCount(
      window.innerWidth > 850 ? Math.floor(window.innerWidth * 0.0025) : 2
    );
  });

  if (!isVisible) return null;
  if (!relations) return null;
  return (
    <div className="transaction-relations-grid">
      <div className="transaction-relations-from">
        <div className="relationsTitle">From</div>
        <div
          className="transaction-relations-from-grid"
          style={{ gridTemplateColumns: fromTemplateString }}
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
                        <a href="#">{addresses}</a>
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
          style={{ gridTemplateColumns: fromTemplateString }}
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
                        <a href="#">{addresses}</a>
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
