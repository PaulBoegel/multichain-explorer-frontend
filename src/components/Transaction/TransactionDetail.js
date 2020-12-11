import React, { useEffect, useState } from "react";

export default function TransactionDetail({ visible }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  return <div>Transaction</div>;
}
