import React, { useEffect, useState } from "react";

export default function AddressRelations({ visible, relations }) {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;
  if (!relations) return null;
  return <div>Address</div>;
}
