import React, { useEffect, useState } from "react";
export default function BlockFilter({ visible }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  return <div className="filter-options">BlockFilter</div>;
}
