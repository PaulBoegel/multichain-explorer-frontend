import * as d3 from "d3";
import styles from "./graph.module.css";

export function runGraph({ container, nodeHoverTooltip, handleNodeClicked }) {
  let linksData = [];
  let nodesData = [];

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const icon = (d) => {
    return d.letter;
  };

  const drag = (simulation) => {
    const dragstarted = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };

    const dragended = (event, d) => {
      const isParent = linksData.find((link) => link.target.id === d.id);
      d.fx = null;
      d.fy = null;
      simulation.alphaTarget(0);
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    div.transition().duration(200).style("opacity", 0.9);
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div.transition().duration(200).style("opacity", 0);
  };

  const simulation = d3
    .forceSimulation(nodesData)
    .force(
      "link",
      d3
        .forceLink(linksData)
        .id((d) => d.id)
        .distance(100)
    )
    .force("charge", d3.forceManyBody().strength(-5000))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .call(
      d3.zoom().on("zoom", function (event) {
        handleZoom(event);
      })
    );

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("orient", "auto")
    .attr("markerUnits", "storkeWidth")
    .append("path")
    .attr("fill", "gray")
    .attr("d", "M0,0 L0,12 L12,6 z");

  let link = svg
    .append("g")
    .attr("class", "links")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 1)
    .attr("stroke-width", "2px")
    .attr("marker-mid", "url(#arrow)")
    .selectAll("path");

  let node = svg
    .append("g")
    .attr("class", "entitys")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .attr("r", 20)
    .selectAll("circle")
    .attr("data-id", (d) => d.id)
    .on("click", handleNodeClicked)
    .call(drag(simulation));

  let label = svg
    .append("g")
    .attr("class", styles.label)
    .attr("class", "labels")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .selectAll("text")
    .text((d) => {
      return icon(d);
    })
    .call(drag(simulation));

  const handleZoom = (event) => {
    d3.select(".entitys").attr("transform", event.transform);
    d3.select(".links").attr("transform", event.transform);
    d3.select(".labels").attr("transform", event.transform);
  };

  const lineGenerator = d3.line();

  const ticked = () => {
    link.attr("d", (d) => {
      const mid = [
        (d.source.x + d.target.x) / 2,
        (d.source.y + d.target.y) / 2,
      ];

      return lineGenerator([
        [d.source.x, d.source.y],
        mid,
        [d.target.x, d.target.y],
      ]);
    });

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    label
      .attr("x", (d) => {
        return d.x;
      })
      .attr("y", (d) => {
        return d.y;
      });
  };

  simulation.on("tick", ticked);

  window.addEventListener("resize", () => {
    const containerRect = container.getBoundingClientRect();
    const { width, height } = containerRect;
    const svg = d3
      .select("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
    setNodes: ({ links, nodes, chainId }) => {
      nodesData.unshift(...nodes);
      linksData.unshift(...links);

      let index = 0;
      let activePassed = false;
      while (index < nodesData.length) {
        if (nodesData[index].chainId === chainId) {
          if (nodesData[index].active === true) {
            if (activePassed === true) nodesData[index].active = false;
            activePassed = true;
          }
          index++;
          continue;
        }
        nodesData.splice(index, 1);
      }

      index = 0;
      while (index < linksData.length) {
        if (linksData[index].source?.id === undefined) {
          linksData[
            index
          ].linkId = `${linksData[index].source}-${linksData[index].target}`;
          index++;
          continue;
        }
        const link = {
          source: linksData[index].source.id,
          target: linksData[index].target.id,
          chainId: linksData[index].chainId,
          linkId: `${linksData[index].source.id}-${linksData[index].target.id}`,
        };
        linksData.splice(index, 1);
        linksData.push(link);
      }

      index = 0;
      while (index < linksData.length) {
        if (linksData[index].chainId === chainId) {
          index++;
          continue;
        }
        linksData.splice(index, 1);
      }

      const linksSeen = new Set();
      linksData = linksData.filter((link) => {
        const duplicatded = linksSeen.has(link.linkId);
        linksSeen.add(link.linkId);
        return !duplicatded;
      });

      const nodesSeen = new Set();
      nodesData = nodesData.filter((node) => {
        const duplicated = nodesSeen.has(node.id);
        nodesSeen.add(node.id);
        return !duplicated;
      });

      link.data(linksData).exit().remove();
      node.data(nodesData).exit().remove();
      label.data(nodesData).exit().remove();

      link = link
        .data(linksData)
        .attr("stroke-width", (d) => Math.sqrt(d.value));

      const linkEnter = link
        .enter()
        .append("path")
        .attr("stroke-width", (d) => Math.sqrt(d.value));

      link = linkEnter.merge(link);

      node = node
        .data(nodesData)
        .attr("data-id", (d) => d.id)
        .attr("data-chain", (d) => d.chainId)
        .attr("data-entity", (d) => d.entity)
        .attr("r", (d) => d.radius)
        .attr("class", (d) => {
          return `${styles[d.class]} ${d.active ? styles.active : ""}`;
        })
        .on("mouseover", (event, d) => {
          addTooltip(nodeHoverTooltip, d, event.pageX, event.pageY);
        })
        .on("mouseout", () => {
          removeTooltip();
        });

      let nodeEnter = node
        .enter()
        .append("circle")
        .attr("class", (d) => {
          return `${styles[d.class]} ${d.active ? styles.active : ""}`;
        })
        .attr("r", (d) => d.radius)
        .attr("data-id", (d) => d.id)
        .attr("data-chain", (d) => d.chainId)
        .attr("data-entity", (d) => d.entity)
        .on("click", handleNodeClicked)
        .call(drag(simulation))
        .on("mouseover", (event, d) => {
          addTooltip(nodeHoverTooltip, d, event.pageX, event.pageY);
        })
        .on("mouseout", () => {
          removeTooltip();
        });

      node = nodeEnter.merge(node);

      label = label.data(nodesData).text((d) => {
        return icon(d);
      });

      const labelEnter = label
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", "2px")
        .attr("dominant-baseline", "central")
        .attr("class", (d) => {
          return `${styles.label} ${styles[d.class]}`;
        })
        .text((d) => {
          return icon(d);
        })
        .call(drag(simulation));

      label = labelEnter.merge(label);

      simulation.nodes(nodesData);
      simulation.force("link").links(linksData);
      simulation.alpha(0.1).restart();
    },
  };
}
