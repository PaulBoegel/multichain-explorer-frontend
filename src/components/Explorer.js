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

export default function Explorer() {
  const entityId = 1;
  const [chainId, setChainId] = useState(0);
  const [searchHeight, setSearchHeight] = useState(490214);
  const [searchTxid, setSearchTxid] = useState(
    "6f9f63267a68a4358d38fe00f5b8bc782596588b6370f2b7c0086d5a4d05043f"
  );
  const [searchAddress, setSearchAddress] = useState(
    "XyrVX6MkETLwdGHAr1sdk9N9pXKoVAvvBa"
  );

  const searchForDetails = ({ blockList }) => {
    const block = findBlock(blockList);
    if (!block) return;
    switch (entityId) {
      case 1:
        const transaction = block.tx.find(
          (transaction) => transaction.txid === searchTxid
        );
        if (!transaction) return;
        let value = 0;
        console.log(transaction);
        transaction.from.forEach((address) => (value += address.value));
        transaction.to.forEach((address) => (value += address.value));
        return {
          txid: transaction.txid,
          block: block.height,
          value,
        };
      case 2:
        return {};
      default:
        return {
          hash: block.hash,
          height: block.height,
          mined: block.mined,
          parent: block.parent,
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
          relations.push([...transaction.from]);
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
        fromArray.forEach((from) => {
          if (!from) return;
          const relation = from.address?.find((adr) => adr === searchAddress);
          if (!relation) return;
          relations[0].push(from.txid);
        });

        toArray.forEach((to) => {
          if (!to) return;
          const relation = to.address?.find((adr) => adr === searchAddress);
          if (!relation) return;
          relations[1].push(to.txid);
        });

        console.log(relations);

        break;
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

  const onSearchDropdownChanged = (event) => {
    setChainId(parseInt(event.target.value));
  };

  const CallBlocks = () => {
    const { query, variables } = getEntityQuery(entityId);
    const { loading, data } = useQuery(query, {
      variables,
    });
    if (loading) return false;

    return getBlocks(data);
  };

  const blockList = CallBlocks();
  let details = null;
  let relations = [];
  if (blockList) {
    details = searchForDetails({ blockList });
    relations = searchForRelations({ blockList });
  }

  return (
    <div className="explorer-grid">
      <div className="border-top"></div>
      <div className="border-left"></div>
      <div className="border-right"></div>
      <SearchPanel
        blockchainOptions={blockchainOptions}
        onDropdownChanged={onSearchDropdownChanged}
      />
      <div className="first-horizontal-border"></div>
      <FilterPanel />
      <div className="second-horizontal-border"></div>
      <DetailPanel visibleId={entityId} details={details} />
      <div className="graph-panel"></div>
      <RelationsPanel visibleId={entityId} relations={relations} />
      <div className="border-bottom"></div>
    </div>
  );
}
