import React, { useRef, useEffect } from 'react';
import { runGraph } from './graphGenerator';
import styles from './graph.module.css';

export default function Graph({ linksData, nodesData, nodeHoverTooltip }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runGraph(
        containerRef.current,
        linksData,
        nodesData,
        nodeHoverTooltip
      );
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
