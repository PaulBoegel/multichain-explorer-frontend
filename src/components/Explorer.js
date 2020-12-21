import Graph from "./graph/graph";
import React, { useEffect, useState } from "react";
import DetailPanel from "./DetailPanel";
import "./Explorer.css";
import FilterPanel from "./FilterPanel";
import RelationsPanel from "./RelationsPanel";
import SearchPanel from "./SearchPanel";
import { useQuery, gql } from "@apollo/client";
import { TRANSACTIONS, BLOCKS, ADDRESS } from "../query";
import BlockFactory from "../lib/entitys/block";
import TransactionFactory from "../lib/entitys/transaction";
import AddressFactory from "../lib/entitys/address";

const blockchainOptions = [
  { value: 0, name: "Bitcoin" },
  { value: 1, name: "Litecoin" },
  { value: 2, name: "Dash" },
  { value: 3, name: "Ethereum" },
];

const getEntityQuery = (chainId, searchState) => {
  switch (searchState.id) {
    case 1:
      return {
        query: TRANSACTIONS,
        variables: {
          chainId: chainId,
          txid: searchState.value,
          pageSize: 100,
          page: 0,
        },
      };
    case 2:
      return {
        query: ADDRESS,
        variables: {
          chainId: chainId,
          address: searchState.value,
          pageSize: 1000,
          page: 0,
        },
      };
    default:
      return {
        query: BLOCKS,
        variables: {
          chainId: chainId,
          height: searchState.value,
          pageSize: 10000,
          page: 0,
        },
      };
  }
};

const getEntityObject = ({ chainId, blockList, searchState }) => {
  if (blockList === null) return;
  switch (searchState.id) {
    case 1:
      return TransactionFactory({ chainId, blockList, id: searchState.value });
    case 2:
      return AddressFactory({ chainId, blockList, id: searchState.value });
    default:
      return BlockFactory({ chainId, blockList, id: searchState.value });
  }
};

export default function Explorer({
  serviceUrl,
  initialHeight,
  onChainChanged: onBlockchainChanged,
  chainId,
}) {
  const [queryError, setQueryError] = useState(false);
  const [queryLoading, setQueryLoading] = useState(false);
  const [entity, setEntity] = useState(null);
  const [nextBlocks, setNextBlocks] = useState(200);
  const [searchState, setSearchState] = useState({
    id: 0,
    value: initialHeight,
  });
  const [searchText, setSearchText] = useState("");

  const { query, variables, error } = getEntityQuery(chainId, searchState);

  const { loading, data } = useQuery(query, {
    variables,
  });

  let blockSize = 0;

  useEffect(() => {
    setQueryError(true);
  }, [error]);

  useEffect(() => {
    setQueryLoading(true);
    console.log(queryLoading);
  }, [loading]);

  useEffect(() => {
    if (!data) return;
    setQueryLoading(false);
    const blockList = getBlocks(data);
    console.log(queryLoading);
    setEntity(
      getEntityObject({
        chainId,
        blockList,
        searchState,
      })
    );
  }, [data]);

  useEffect(() => {
    setSearchState({ id: 0, value: initialHeight });
  }, [initialHeight]);

  const getBlocks = (data) => {
    switch (searchState.id) {
      case 1:
        blockSize = data.transactions.size;
        return data.transactions.blocks;
      case 2:
        blockSize = data.address.size;
        return data.address.blocks;
      default:
        blockSize = data.blocks.size;
        return data.blocks.blocks;
    }
  };

  const searchEntity = (entityId, searchString) => {
    switch (entityId) {
      case 1:
        setSearchState({ id: 1, value: searchString });
        break;
      case 2:
        setSearchState({ id: 2, value: searchString });
        break;
      default:
        setSearchState({ id: 0, value: parseInt(searchString) });
    }
  };

  const searchRelation = ({ entityId, relationId }) => {
    switch (entityId) {
      case 1:
        setSearchState({ id: 1, value: relationId });
        break;
      case 2:
        setSearchState({ id: 2, value: relationId });
        break;
      default:
        setSearchState({ id: 0, value: relationId });
    }
  };

  const CallSearchEntity = (searchString, chain) => {
    const variables = { chainId: parseInt(chain), searchString };
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

  const onSearchInputKeyDown = async (event) => {
    if (event.keyCode === 13) {
      const searchString = event.target.value;
      const entityId = await CallSearchEntity(searchString, chainId);
      searchEntity(entityId, searchString);
    }
  };

  const onRelationClicked = (event) => {
    const { entity, id } = event.target.dataset;
    if (id === "coinbase") return;
    setSearchText(id);
    searchRelation({ entityId: parseInt(entity), relationId: id });
  };

  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div class="tooltip">${node.name.slice(0, 30)} ${
      node.name.length > 40 ? "..." : ""
    }</div>`;
  });

  const onNodeClicked = async (event) => {
    const { id, entity } = event.target.dataset;
    const isCoinbase = id.split("coinbase").length === 2;
    if (isCoinbase) return;
    // const entityId = await CallSearchEntity(id, chain);
    searchEntity(parseInt(entity), id);
  };

  const onNextBlocks = (event) => {
    setNextBlocks(nextBlocks - 10);
  };

  return (
    <div className="explorer-grid">
      <div className="border-top"></div>
      <div className="border-left"></div>
      <div className="border-right"></div>
      <SearchPanel
        loading={queryLoading}
        selected={chainId}
        searchText={searchText}
        blockchainOptions={blockchainOptions}
        onDropdownChanged={onBlockchainChanged}
        onSearchInputKeyDown={onSearchInputKeyDown}
      />
      <div className="first-horizontal-border"></div>
      <FilterPanel />
      <div className="second-horizontal-border"></div>
      <DetailPanel entity={entity} loading={queryLoading} error={queryError} />
      <div className="graph-panel">
        {/* <button onClick={onNextBlocks}>{blockSize} remaining</button> */}
        <Graph
          loading={queryLoading}
          error={queryError}
          chainId={chainId}
          entity={entity}
          nodeHoverTooltip={nodeHoverTooltip}
          handleNodeClicked={onNodeClicked}
        />
      </div>
      <RelationsPanel
        entity={entity}
        onRelationClicked={onRelationClicked}
        loading={queryLoading}
        error={queryError}
      />
      <div className="border-bottom"></div>
    </div>
  );
}
