export const checkDuplicateNodes = (nodes) => {
  const seen = new Set();

  return nodes.filter((node) => {
    const duplicated = seen.has(node.id);
    seen.add(node.id);
    return !duplicated;
  });
};
