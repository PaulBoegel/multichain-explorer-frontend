import React, { useEffect, useState } from "react";

export default function BlockDetail({ visible }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  return <div>Block</div>;
}
