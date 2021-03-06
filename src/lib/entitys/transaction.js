import {
  pushBlock,
  pushTransaction,
  pushAddress,
  pushCoinbase,
} from "../helper/pushHelper";
import { checkDuplicateNodes } from "../helper/duplicationCheckHelper";

export default function TransactionFactory({ chainId, blockList, id }) {
  const _createGraphData = () => {
    let nodes = [];
    let links = [];

    nodes.push(
      pushTransaction(
        details.txid,
        chainId,
        details.inputTotal,
        details.outputTotal,
        true
      )
    );

    nodes.push(pushBlock(details.block, chainId, false));

    links.push({
      source: details.txid,
      target: details.block,
      chainId,
    });

    const fromAdresses = [];
    relations[0].forEach((addressObj) => {
      fromAdresses.push(
        ...addressObj.address.map((address) => {
          return { addressId: address, value: addressObj.value };
        })
      );
    });

    fromAdresses.forEach((from) => {
      if (from.addressId === "coinbase") {
        nodes.push(
          pushCoinbase(`${from.addressId}-${details.txid}`, chainId, from.value)
        );

        links.push({
          source: `${from.addressId}-${details.txid}`,
          target: details.txid,
          chainId,
        });
        return;
      }

      nodes.push(
        pushAddress({
          id: from.addressId,
          chainId,
          outValue: from.value,
          active: false,
        })
      );

      links.push({
        source: from.addressId,
        target: details.txid,
        chainId,
      });
    });

    const toAddress = [];
    relations[1].forEach((addressObj) => {
      if (!addressObj.address) {
        toAddress.push({ addressId: "", value: addressObj.value });
        return;
      }
      toAddress.push(
        ...addressObj.address.map((address) => {
          return { addressId: address, value: addressObj.value };
        })
      );
    });

    toAddress.forEach((to) => {
      nodes.push(
        pushAddress({
          id: to.addressId,
          chainId,
          inValue: to.value,
          active: false,
        })
      );

      links.push({
        source: details.txid,
        target: to.addressId,
        chainId,
      });
    });

    nodes = checkDuplicateNodes(nodes);
    return { nodes, links };
  };

  const _findTransactionBlock = () => {
    return blockList.find((block) => {
      return block.tx.find((transaction) => transaction.txid === id);
    });
  };

  const _createDetails = () => {
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
    if (!transaction.fee)
      fee = parseFloat((inputTotal - outputTotal).toFixed(8));
    if (coinbase) fee = 0;
    return {
      txid: transaction.txid,
      block: block.height,
      inputTotal,
      outputTotal,
      fee,
    };
  };

  const _createRelations = () => {
    const to = transaction.to.map((to) => {
      if (!to.address) return { address: [""], value: 0 };
      return to;
    });
    const from = transaction.from.map((from) => {
      const { address, coinbase, ...data } = from;
      if (coinbase) {
        return { address: ["coinbase"], ...data };
      }
      return from;
    });

    return [[...from], [...to]];
  };

  const block = _findTransactionBlock();
  const [transaction] = block.tx;
  const details = _createDetails();
  const relations = _createRelations();

  return {
    chainId,
    entityId: 1,
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
