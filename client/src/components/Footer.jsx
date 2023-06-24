import React from "react";

// Components
import Icon from "./Icon";
import IconButton from "./IconButton";

const Footer = () => (
  <div className="flex justify-between px-4 py-[18px] text-white bg-neutral-900">
    <span>© 2023 levelup</span>
    <a
      href="https://github.com/ifaguilar/levelup"
      target="_blank"
      className="flex items-center gap-2"
    >
      <Icon icon="github" />
      <span>GitHub</span>
    </a>
  </div>
);

export default Footer;
