import React, { useRef, useEffect, useState } from "react";
import { runGraph } from "./graphGenerator";
import styles from "./graph.module.css";

export default function Graph({
  linksData,
  nodesData,
  nodeHoverTooltip,
  handleNodeClicked,
}) {
  const containerRef = useRef(null);
  const [func, setFunc] = useState();
  const [svgNodes, setSvgNodes] = useState();

  useEffect(() => {
    if (func) func({ nodes: nodesData, links: linksData });
  }, [nodesData]);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy, setNodes } = runGraph(
        containerRef.current,
        linksData,
        nodesData,
        nodeHoverTooltip,
        handleNodeClicked
      );
      setFunc(() => setNodes);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
