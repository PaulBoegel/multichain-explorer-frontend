import Explorer from "./Explorer";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

export default function ExplorerWraper({ serviceUrl }) {
  const [chainId, setChainId] = useState(0);
  const handleChainChanged = (event) => {
    setChainId(parseInt(event.target.value));
  };

  const request = {
    query: gql`
      query getHeight($chainId: Int) {
        getHeight(chainId: $chainId)
      }
    `,
    variables: { chainId },
  };
  const { loading, data } = useQuery(request.query, {
    variables: request.variables,
  });

  if (loading) return <div>loading ...</div>;

  return (
    <Explorer
      serviceUrl={serviceUrl}
      initialHeight={data.getHeight}
      chainId={chainId}
      onChainChanged={handleChainChanged}
    />
  );
}
