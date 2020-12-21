import React, { useRef, useEffect, useState } from "react";
import { runGraph } from "./graphGenerator";
import styles from "./graph.module.css";
import { style } from "d3";

export default function Graph({
  entity,
  chainId,
  nodeHoverTooltip,
  handleNodeClicked,
  loading,
}) {
  const containerRef = useRef(null);
  const [func, setFunc] = useState();

  useEffect(() => {
    if (!entity) return;
    const { nodes, links } = entity.getGraphData();
    if (func) func({ nodes, links, chainId });
  }, [entity]);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy, setNodes } = runGraph({
        container: containerRef.current,
        nodeHoverTooltip,
        handleNodeClicked,
      });
      setFunc(() => setNodes);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return (
    <>
      <div className={loading ? styles.show : styles.hide}>... loading</div>
      <div
        id="graph-container"
        ref={containerRef}
        className={`${styles.container} ${
          !loading ? styles.show : styles.hide
        }`}
      ></div>
    </>
  );
}
