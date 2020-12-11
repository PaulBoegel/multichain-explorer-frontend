import React, { useEffect, useState } from "react";
export default function AddressFilter({ visible }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  return <div className="filter-options">AddressFilter</div>;
}
