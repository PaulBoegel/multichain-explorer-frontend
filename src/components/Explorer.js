import Graph from "./graph/graph";
import React, { useState } from "react";
import DetailPanel from "./DetailPanel";
import "./Explorer.css";
import FilterPanel from "./FilterPanel";
import RelationsPanel from "./RelationsPanel";
import SearchPanel from "./SearchPanel";
import { useQuery } from "@apollo/client";
import { TRANSACTIONS, BLOCKS, ADDRESS } from "../query";

const blockchainOptions = [
  { value: 0, name: "Bitcoin" },
  { value: 1, name: "Litecoin" },
  { value: 2, name: "Dash" },
  { value: 3, name: "Ethereum" },
];

let nodes = [];
let links = [];

export default function Explorer({ serviceUrl }) {
  const [entityId, setEntityId] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [chainId, setChainId] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [searchTxid, setSearchTxid] = useState(
    "1b7a8ee1a86e840c53e118298f7c4242e394be6fb0ed7c55b91fe17e3d8998e4"
  );
  const [searchAddress, setSearchAddress] = useState(
    "XdvCaucrgDmzzrfjQoDs2fnAfbZhnptokT"
  );

  const searchForDetails = ({ blockList }) => {
    const block = findBlock(blockList);
    switch (entityId) {
      case 1:
        if (!block) return;
        const transaction = block.tx.find(
          (transaction) => transaction.txid === searchTxid
        );
        if (!transaction) return;
        let fee = transaction.fee;
        const coinbase = transaction.from.find((from) => from.coinbase);
        let inputTotal = transaction.from.reduce(
          (prev, curr) => prev + curr.value,
          0
        );
        let outputTotal = transaction.to.reduce(
          (prev, curr) => prev + curr.value,
          0
        );
        inputTotal = parseFloat(inputTotal.toFixed(8));
        outputTotal = parseFloat(outputTotal.toFixed(8));
        if (!transaction.fee) fee = inputTotal - outputTotal;
        if (coinbase) fee = 0;
        return {
          txid: transaction.txid,
          block: block.height,
          inputTotal,
          outputTotal,
          fee,
        };
      case 2:
        const relations = [];
        const transactionPool = [];
        const fromArray = [];
        const toArray = [];
        let balance = 0;
        blockList.forEach((block) => transactionPool.push(...block.tx));
        transactionPool.forEach((transaction) => {
          fromArray.push(
            ...transaction.from.map((addressObj) => ({
              txid: transaction.txid,
              ...addressObj,
            }))
          );
          toArray.push(
            ...transaction.to.map((addressObj) => ({
              txid: transaction.txid,
              ...addressObj,
            }))
          );
        });

        relations.push([], []);
        toArray.forEach((to) => {
          if (!to) return;
          const relation = to.address?.find((adr) => adr === searchAddress);
          if (!relation) return;
          relations[0].push({ txid: to.txid, value: to.value });
        });
        fromArray.forEach((from) => {
          if (!from) return;
          const relation = from.address?.find((adr) => adr === searchAddress);
          if (!relation) return;
          relations[1].push({ txid: from.txid, value: from.value });
        });

        balance += parseFloat(
          relations[0].reduce((prev, curr) => prev + curr.value, 0).toFixed(8)
        );
        balance -= parseFloat(
          relations[1].reduce((prev, curr) => prev + curr.value, 0).toFixed(8)
        );

        return {
          address: searchAddress,
          balance,
        };
      default:
        if (!block) return;
        return {
          hash: block.hash,
          height: block.height,
          mined: block.mined,
          parent: block.parent ? block.parent : "",
          transactionCount: block.tx.length,
        };
    }
  };

  const searchForRelations = ({ blockList }) => {
    const relations = [];
    if (!blockList.length) return;
    let block = findBlock(blockList);
    switch (entityId) {
      case 1:
        if (block) {
          const transaction = block.tx.find(
            (transaction) => transaction.txid === searchTxid
          );
          const from = transaction.from.map((from) => {
            const { address, coinbase, ...data } = from;
            if (coinbase) {
              return { address: ["coinbase"], ...data };
            }
            return from;
          });

          relations.push([...from]);
          relations.push([...transaction.to]);
          return relations;
        }
        break;
      case 2:
        const transactionPool = [];
        const fromArray = [];
        const toArray = [];
        blockList.forEach((block) => transactionPool.push(...block.tx));
        transactionPool.forEach((transaction) => {
          fromArray.push(
            ...transaction.from.map((addressObj) => ({
              txid: transaction.txid,
              ...addressObj,
            }))
          );
          toArray.push(
            ...transaction.to.map((addressObj) => ({
              txid: transaction.txid,
              ...addressObj,
            }))
          );
        });

        relations.push([], []);
        toArray.forEach((to) => {
          if (!to) return;
          const relation = to.address?.find((adr) => adr === searchAddress);
          if (!relation) return;
          relations[0].push({ txid: to.txid, value: to.value });
        });
        fromArray.forEach((from) => {
          if (!from) return;
          const relation = from.address?.find((adr) => adr === searchAddress);
          if (!relation) return;
          relations[1].push({ txid: from.txid, value: from.value });
        });

        return relations;
      default:
        block = findBlock(blockList);
        if (block) {
          relations.push(...block.tx);
          return relations;
        }
    }
  };

  const getBlocks = (data) => {
    switch (entityId) {
      case 1:
        return data.transactions;
      case 2:
        return data.address;
      default:
        return data.blocks;
    }
  };
  const getEntityQuery = (entityId) => {
    switch (entityId) {
      case 1:
        return {
          query: TRANSACTIONS,
          variables: { chainId: chainId, txid: searchTxid },
        };
      case 2:
        return {
          query: ADDRESS,
          variables: { chainId: chainId, address: searchAddress },
        };
      default:
        return {
          query: BLOCKS,
          variables: { chainId: chainId, height: searchHeight },
        };
    }
  };

  const findBlock = (block) => {
    switch (entityId) {
      case 1:
        return blockList.find((block) => {
          return block.tx.find(
            (transaction) => transaction.txid === searchTxid
          );
        });
      case 2:
        return blockList.find((block) => {
          return block.height === searchHeight;
        });
      default:
        return blockList.find((block) => {
          return block.height === searchHeight;
        });
    }
  };

  const searchEntity = (entityId) => {
    switch (entityId) {
      case 1:
        setEntityId(1);
        setSearchTxid(searchText);
        break;
      case 2:
        setEntityId(2);
        setSearchAddress(searchText);
        break;
      default:
        setEntityId(0);
        setSearchHeight(parseInt(searchText));
    }
  };

  const searchRelation = ({ entityId, relationId }) => {
    switch (entityId) {
      case 1:
        setEntityId(1);
        setSearchTxid(relationId);
        break;
      case 2:
        setEntityId(2);
        setSearchAddress(relationId);
        break;
      default:
        setEntityId(0);
        setSearchHeight(parseInt(relationId));
    }
  };

  const CallBlocks = () => {
    const { query, variables } = getEntityQuery(entityId);
    const { loading, data } = useQuery(query, {
      variables,
    });
    if (loading) return false;

    return getBlocks(data);
  };

  const CallSearchEntity = () => {
    const variables = { chainId, searchString: searchText };
    const query = `
    query searchEntity($chainId: Int, $searchString: String) {
      searchEntity(chainId: $chainId, searchString: $searchString)
    }
  `;
    return fetch(serviceUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    })
      .then((response) => response.json())
      .then((response) => {
        return response.data.searchEntity;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchDropdownChanged = (event) => {
    setChainId(parseInt(event.target.value));
    setEntityId(0);
  };

  const onSearchTextChanged = (event) => {
    setSearchText(event.target.value);
  };

  const onSearchInputKeyDown = async (event) => {
    if (event.keyCode === 13) {
      const entityId = await CallSearchEntity();
      searchEntity(entityId);
    }
  };

  const onRelationClicked = (event) => {
    const { entity, id } = event.target.dataset;
    if (id === "coinbase") return;
    setSearchText(id);
    searchRelation({ entityId: parseInt(entity), relationId: id });
  };

  const setEntityData = (blockList) => {
    if (blockList && blockList.length > 0) {
      switch (entityId) {
        case 1:
          transactionDetails = searchForDetails({ blockList });
          transactionRelations = searchForRelations({ blockList });
          break;
        case 2:
          addressDetails = searchForDetails({ blockList });
          addressRelations = searchForRelations({ blockList });
          break;
        default:
          blockDetails = searchForDetails({ blockList });
          blockRelations = searchForRelations({ blockList });
      }
      return;
    }
  };

  const checkDuplicateNodes = (nodes) => {
    const seen = new Set();

    return nodes.filter((node) => {
      const duplicated = seen.has(node.id);
      seen.add(node.id);
      return !duplicated;
    });
  };

  const checkDuplicateLinks = (links) => {
    const seenSource = new Set();
    const seenTarget = new Set();

    return links.filter((link) => {
      const duplicatedSource = seenSource.has(link.source);
      seenSource.add(link.source);
      const duplicatedTarget = seenTarget.has(link.target);
      seenSource.add(link.target);
      return !(duplicatedSource && duplicatedTarget);
    });
  };

  const setNodesForBlockEntity = ({ blockDetails, blockRelations }) => {
    if (!blockDetails) return [];
    nodes = nodes.filter((node) => node.chainId === chainId);
    links = links.filter((link) => link.chainId === chainId);

    nodes.push({
      id: blockDetails.height,
      name: `Block: ${blockDetails.height}`,
      letter: "B",
      chainId,
    });
    if (blockDetails.height > 0) {
      nodes.push({
        id: blockDetails.height - 1,
        name: `Block: ${blockDetails.height - 1}`,
        letter: "B",
        chainId,
      });
      links.push({
        target: blockDetails.height,
        source: blockDetails.height - 1,
        chainId,
      });
      let connectionExists = nodes.find(
        (node) => node.id === blockDetails.height - 2
      );
      if (connectionExists) {
        links.push({
          target: blockDetails.height - 2,
          source: blockDetails.height - 1,
          chainId,
        });
      }
      connectionExists = nodes.find(
        (node) => node.id === blockDetails.height + 1
      );
      if (connectionExists) {
        links.push({
          target: blockDetails.height + 1,
          source: blockDetails.height,
          chainId,
        });
      }
    }

    blockRelations.forEach((transaction) => {
      nodes.push({
        id: transaction.txid,
        name: `Transaction: ${transaction.txid}`,
        letter: "T",
        chainId,
      });
      links.push({
        target: blockDetails.height,
        source: transaction.txid,
        chainId,
      });
    });

    nodes = checkDuplicateNodes(nodes);
    links = checkDuplicateLinks(links);
  };
  const setNodesForTransactionEntity = ({
    transactionDetails,
    transactionRelations,
  }) => {
    if (!transactionDetails) return [];
  };
  const setNodesForAddressEntity = ({ addressDetails, addressRelations }) => {
    if (!transactionDetails) return [];
  };

  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  });

  const onNodeClicked = (event) => {
    const { id } = event.target.dataset;
    setSearchText(id);
  };

  const blockList = CallBlocks();
  let blockDetails;
  let transactionDetails;
  let addressDetails;
  let blockRelations = [];
  let transactionRelations = [];
  let addressRelations = [];
  setEntityData(blockList);

  setNodesForBlockEntity({ blockDetails, blockRelations });
  setNodesForTransactionEntity({ transactionDetails, transactionRelations });
  setNodesForAddressEntity({ addressDetails, addressRelations });

  return (
    <div className="explorer-grid">
      <div className="border-top"></div>
      <div className="border-left"></div>
      <div className="border-right"></div>
      <SearchPanel
        searchText={searchText}
        blockchainOptions={blockchainOptions}
        onDropdownChanged={onSearchDropdownChanged}
        onSearchTextChanged={onSearchTextChanged}
        onSearchInputKeyDown={onSearchInputKeyDown}
      />
      <div className="first-horizontal-border"></div>
      <FilterPanel />
      <div className="second-horizontal-border"></div>
      <DetailPanel
        visibleId={entityId}
        blockDetails={blockDetails}
        transactionDetails={transactionDetails}
        addressDetails={addressDetails}
      />
      <div className="graph-panel">
        <Graph
          nodesData={nodes}
          linksData={links}
          nodeHoverTooltip={nodeHoverTooltip}
          handleNodeClicked={onNodeClicked}
        />
      </div>
      <RelationsPanel
        visibleId={entityId}
        blockRelations={blockRelations}
        transactionRelations={transactionRelations}
        addressRelations={addressRelations}
        onRelationClicked={onRelationClicked}
      />
      <div className="border-bottom"></div>
    </div>
  );
}
