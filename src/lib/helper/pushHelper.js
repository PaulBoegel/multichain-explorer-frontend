export const pushBlock = (id, chainId) => {
  return {
    id: id,
    name: `Block: ${id}`,
    letter: "B",
    class: "block",
    form: "rect",
    radius: 40,
    chainId,
  };
};

export const pushTransaction = (id, chainId) => {
  return {
    id: id,
    name: `Transaction: ${id}`,
    letter: "T",
    class: "transaction",
    form: "circle",
    radius: 25,
    chainId,
  };
};

export const pushAddress = (id, chainId) => {
  return {
    id,
    name: `Address: ${id}`,
    letter: "A",
    class: "address",
    form: "triangle",
    radius: 25,
    chainId,
  };
};

export const pushCoinbase = (id, chainId) => {
  return {
    id,
    name: `coinbase`,
    letter: "C",
    class: "coinbase",
    form: "circle",
    radius: 25,
    chainId,
  };
};
