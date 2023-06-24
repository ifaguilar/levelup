import React from "react";

const Button = ({
  variant,
  children,
  onClick = null,
  type = "button",
  disabled = false,
}) => (
  <button
    className={`${
      variant === "primary"
        ? "bg-green-400 text-neutral-900 hover:brightness-90"
        : "text-white bg-indigo-950 hover:brightness-90"
    } uppercase text-sm rounded-full font-bold px-6 py-3 disabled:opacity-50`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
