export const pushBlock = (id, chainId, active = false) => {
  return {
    id: id,
    name: `Block: ${id}`,
    letter: "B",
    class: "block",
    form: "rect",
    radius: 40,
    chainId,
    active,
  };
};

export const pushTransaction = (id, chainId, active = false) => {
  return {
    id: id,
    name: `Transaction: ${id}`,
    letter: "T",
    class: "transaction",
    form: "circle",
    radius: 25,
    chainId,
    active,
  };
};

export const pushAddress = (id, chainId, active = false) => {
  return {
    id,
    name: `Address: ${id}`,
    letter: "A",
    class: "address",
    form: "triangle",
    radius: 25,
    chainId,
    active,
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
