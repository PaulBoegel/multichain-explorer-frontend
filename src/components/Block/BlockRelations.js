import React, { useEffect, useState } from "react";
import "./BlockRelations.css";

export default function BlockRelations({ relations, onRelationClicked }) {
  const [gridTemplateString, setGridTemplateString] = useState();
  const [blockContainer, setBlockContainer] = useState([]);
  const [containerCount, setContainerCount] = useState(
    window.innerWidth > 850 ? Math.floor(window.innerWidth * 0.005) : 4
  );

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

    return containers;
  };

  useEffect(() => {
    if (!relations) return null;
    const containers = fillContainer({ relations });
    let gridTemplateString = "";
    const blockContainer = [];
    containers.forEach((container) => {
      blockContainer.push(
        container.map((tx) => {
          const { txid, ...data } = tx;
          return { txidShort: txid.substring(0, 15) + "...", txid, data };
        })
      );
      gridTemplateString += "auto ";
    });
    setBlockContainer(blockContainer);
    setGridTemplateString(gridTemplateString);
  }, [relations]);

  window.addEventListener("resize", () => {
    setContainerCount(
      window.innerWidth > 850 ? Math.floor(window.innerWidth / 200) : 4
    );
  });

  return (
    <>
      <div className="relationsTitle">Transactions</div>
      <div
        className="block-relations-grid"
        style={{ gridTemplateColumns: gridTemplateString }}
      >
        {blockContainer.map((container, key) => {
          return (
            <div
              key={key}
              style={{ gridColumn: `${key + 1} / ${key + 2}` }}
              className="relations-container block-relations-container"
            >
              <ul>
                {container.map((transaction, key) => {
                  return (
                    <li key={key}>
                      <a
                        href="#"
                        data-id={transaction.txid}
                        data-entity={1}
                        onClick={onRelationClicked}
                      >
                        {transaction.txidShort}
                      </a>
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
