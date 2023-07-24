import React from "react";

// Components
import IconButton from "./IconButton";
import Icon from "./Icon";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="z-50 flex flex-col gap-12 p-12 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-between">
          <h5>{title}</h5>
          <IconButton onClick={onClose}>
            <Icon icon="close" />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
