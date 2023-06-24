import React from "react";

const IconButton = ({ onClick = null, children }) => (
  <button
    className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-neutral-100"
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;
