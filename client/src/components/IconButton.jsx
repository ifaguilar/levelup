import React from "react";

const IconButton = ({ className = "", onClick = null, children }) => (
  <button
    className={`inline-flex items-center justify-center w-12 h-12 transition bg-transparent rounded-full hover:bg-neutral-100 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;
