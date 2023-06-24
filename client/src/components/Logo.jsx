import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className = "", onClick = null }) => (
  <Link to="/" onClick={onClick}>
    <img className={`${className}`} src="logo.svg" alt="levelup" />
  </Link>
);

export default Logo;
