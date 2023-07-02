import React from "react";

const Button = ({
  variant,
  children,
  onClick = null,
  type = "button",
  className = "",
  disabled = false,
}) => (
  <button
    className={`${
      variant === "primary"
        ? "bg-green-400 text-neutral-900 hover:brightness-90"
        : "text-neutral-900 bg-neutral-100 hover:brightness-90"
    } uppercase text-sm rounded-full font-bold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
