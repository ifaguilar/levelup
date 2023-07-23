import React from "react";

const TabItem = ({ text, isActive = false, onClick = null }) => (
  <div
    className={`${
      isActive
        ? "bg-green-500/5 border-b-4 border-green-500 text-green-500"
        : "hover:text-green-500"
    } px-6 py-4 cursor-pointer transition`}
    onClick={onClick}
  >
    <span>{text}</span>
  </div>
);

export default TabItem;
