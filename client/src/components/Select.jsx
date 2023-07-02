import React from "react";

const Select = ({ touched, error, ...props }) => (
  <select
    className={`appearance-none w-full px-6 py-3 rounded-full bg-white placeholder-neutral-400 border-2 border-neutral-200 hover:border-neutral-400 focus:outline-none focus:border-green-400 ${
      touched && error ? "border-red-600" : ""
    } cursor-pointer disabled:cursor-not-allowed`}
    {...props}
  />
);

export default Select;
