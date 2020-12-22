import { pushBlock, pushTransaction } from "../helper/pushHelper";

export default function BlockFactory({ chainId, blockList, id }) {
  const _createGraphData = () => {
    const nodes = [];
    const links = [];
    nodes.push(pushBlock(details.height, chainId, true));
    if (details.height > 0) {
      nodes.push(pushBlock(details.height - 1, chainId, false));
      links.push({
        target: details.height,
        source: details.height - 1,
        chainId,
      });
      let connectionExists = nodes.find(
        (node) => node.id === details.height - 2
      );
      if (connectionExists) {
        links.push({
          target: details.height - 2,
          source: details.height - 1,
          chainId,
        });
      }
      connectionExists = nodes.find((node) => node.id === details.height + 1);
      if (connectionExists) {
        links.push({
          target: details.height + 1,
          source: details.height,
          chainId,
        });
      }
    }

    relations.forEach((transaction) => {
      const formValue = parseFloat(
        transaction.from
          .reduce((curr, address) => {
            return curr + address.value;
          }, 0)
          .toFixed(8)
      );
      const toValue = parseFloat(
        transaction.to
          .reduce((curr, address) => {
            return curr + address.value;
          }, 0)
          .toFixed(8)
      );
      nodes.push(
        pushTransaction(transaction.txid, chainId, formValue, toValue, false)
      );
      links.push({
        target: details.height,
        source: transaction.txid,
        chainId,
      });
    });

    return { links, nodes };
  };

  const _findBlock = () => {
    return blockList.find((block) => {
      return block.height === id;
    });
  };

  const _createDetails = () => {
    if (!block) return;
    return {
      hash: block.hash,
      height: block.height,
      mined: block.mined,
      parent: block.parent ? block.parent : "",
      transactionCount: block.tx.length,
    };
  };

  const _createRelations = () => {
    if (block) {
      return [...block.tx];
    }
  };

  const block = _findBlock();
  const details = _createDetails();
  const relations = _createRelations();

  return {
    chainId,
    entityId: 0,
    getDetails() {
      return details;
    },
    getRelations() {
      return relations;
    },
    getGraphData() {
      return _createGraphData();
    },
  };
}
