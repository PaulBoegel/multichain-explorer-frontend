import React, { useRef, useEffect, useState } from "react";
import { runGraph } from "./graphGenerator";
import styles from "./graph.module.css";
import Spinner from "../images/graph-spinner.svg";

export default function Graph({
  entity,
  chainId,
  nodeHoverTooltip,
  handleNodeClicked,
  loading,
  transactionFilter,
  addressFilter,
}) {
  const containerRef = useRef(null);
  const [newNodes, setNewNodes] = useState();
  const [filterNodes, setFilterNodes] = useState();

  useEffect(() => {
    if (!transactionFilter && !addressFilter) return;
    if (filterNodes) filterNodes({ transactionFilter, addressFilter });
    if (newNodes) newNodes({ chainId });
  }, [transactionFilter, addressFilter]);

  useEffect(() => {
    if (!entity) return;
    const { nodes, links } = entity.getGraphData();
    if (newNodes) newNodes({ nodes, links, chainId });
  }, [entity]);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy, setNodes, filterNodes } = runGraph({
        container: containerRef.current,
        nodeHoverTooltip,
        handleNodeClicked,
      });
      setFilterNodes(() => filterNodes);
      setNewNodes(() => setNodes);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return (
    <>
      <img
        src={Spinner}
        alt="spinner"
        className={`${styles.spinner} ${loading ? styles.show : styles.hide}`}
      />
      <div
        id="graph-container"
        ref={containerRef}
        className={styles.container}
      ></div>
    </>
  );
}
