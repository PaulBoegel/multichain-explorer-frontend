export const pushBlock = (id, chainId, active = false) => {
  return {
    id: id,
    entity: 0,
    name: `Block: ${id}`,
    letter: "B",
    class: "block",
    form: "rect",
    radius: 40,
    chainId,
    active,
  };
};

export const pushTransaction = (
  id,
  chainId,
  fromValue,
  toValue,
  active = false
) => {
  return {
    id: id,
    entity: 1,
    name: `Transaction: ${id}`,
    letter: "T",
    class: "transaction",
    form: "circle",
    radius: 25,
    chainId,
    fromValue,
    toValue,
    active,
  };
};

export const pushAddress = ({
  id,
  chainId,
  inValue = 0,
  outValue = 0,
  active = false,
}) => {
  return {
    id,
    entity: 2,
    name: `Address: ${id}`,
    letter: "A",
    class: "address",
    form: "triangle",
    radius: 25,
    inValue,
    outValue,
    chainId,
    active,
  };
};

export const pushCoinbase = (id, chainId) => {
  return {
    id,
    entity: 3,
    name: `coinbase`,
    letter: "C",
    class: "coinbase",
    form: "circle",
    radius: 25,
    chainId,
  };
};
