import { pushTransaction, pushAddress } from "../helper/pushHelper";
import { checkDuplicateNodes } from "../helper/duplicationCheckHelper";

export default function AddressFactory({ chainId, blockList, id }) {
  const _createGraphData = () => {
    let nodes = [];
    let links = [];

    nodes.push(
      pushAddress({
        id,
        chainId,
        inValue: details.inValue,
        outValue: details.outValue,
        active: true,
      })
    );

    relations[0].forEach((transaction) => {
      nodes.push(
        pushTransaction(transaction.txid, chainId, 0, transaction.value, false)
      );

      links.push({
        source: transaction.txid,
        target: details.address,
        chainId,
      });
    });

    relations[1].forEach((transaction) => {
      nodes.push(
        pushTransaction(transaction.txid, chainId, transaction.value, 0, false)
      );

      links.push({
        source: details.address,
        target: transaction.txid,
        chainId,
      });
    });

    nodes = checkDuplicateNodes(nodes);

    return { nodes, links };
  };

  const _createTransactionPool = () => {
    return blockList.map((block) => block.tx[0]);
  };

  const _createFromAndToArray = () => {
    const fromArray = [];
    const toArray = [];
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
    return { toArray, fromArray };
  };

  const _createRelations = () => {
    const toTmp = [];
    const fromTmp = [];
    toArray.forEach((to) => {
      if (!to) return;
      const relation = to.address?.find((adr) => adr === id);
      if (!relation) return;
      toTmp.push({ txid: to.txid, value: to.value });
    });
    fromArray.forEach((from) => {
      if (!from) return;
      const relation = from.address?.find((adr) => adr === id);
      if (!relation) return;
      fromTmp.push({ txid: from.txid, value: from.value });
    });
    return [toTmp, fromTmp];
  };

  const _createDetails = () => {
    let balance = 0;

    let inValue = parseFloat(
      relations[0].reduce((prev, curr) => prev + curr.value, 0).toFixed(8)
    );
    let outValue = parseFloat(
      relations[1].reduce((prev, curr) => prev + curr.value, 0).toFixed(8)
    );

    balance += inValue;
    balance -= outValue;

    return {
      address: id,
      inTransactionCount: relations[0].length,
      outTransactionCount: relations[1].length,
      inValue,
      outValue,
      balance,
    };
  };

  const transactionPool = _createTransactionPool();
  const { fromArray, toArray } = _createFromAndToArray();
  const relations = _createRelations();
  const details = _createDetails();

  return {
    chainId,
    entityId: 2,
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
