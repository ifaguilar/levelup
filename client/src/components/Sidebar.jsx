import React from "react";
import { NavLink } from "react-router-dom";

// Components
import Icon from "./Icon";

// Constants
import { SIDEBAR_ITEMS } from "../constants/constants";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <div
    className={`${
      sidebarOpen ? "translate-x-0" : "-translate-x-64"
    } fixed top-14 bottom-0 left-0 w-64 z-50 py-6 overflow-y-scroll shadow-lg bg-white transition`}
  >
    {SIDEBAR_ITEMS.map((item) => (
      <NavLink
        to={item.link}
        key={item.name}
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-4 p-4 cursor-pointer font-semibold transition ${
            isActive
              ? "bg-green-500/5 border-r-4 border-green-500 text-green-500"
              : "hover:text-green-500"
          }`
        }
      >
        <Icon icon={item.name} />
        {item.text}
      </NavLink>
    ))}
  </div>
);

export default Sidebar;
