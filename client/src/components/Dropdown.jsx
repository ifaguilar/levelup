import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Components
import Icon from "./Icon";
import Divider from "./Divider";
import ProfilePic from "./ProfilePic";

// Constants
import { DROPDOWN_ITEMS } from "../constants/constants";

// Context
import { AuthContext } from "../context/AuthProvider";

const Dropdown = ({ dropdownOpen, setDropdownOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { logoutUser } = useContext(AuthContext);

  return (
    <div
      className={`${
        dropdownOpen ? "block" : "hidden"
      } fixed top-16 right-4 w-64 z-50 py-4 shadow-lg rounded-lg bg-white`}
    >
      <div className="flex items-center gap-4 p-4">
        <ProfilePic src={user?.profile_pic_url} />
        <div className="flex flex-col overflow-hidden">
          <p className="text-medium">{`${user?.first_name} ${user?.last_name}`}</p>
          <span>{user?.email}</span>
        </div>
      </div>
      <Divider />
      {DROPDOWN_ITEMS.map((item) => (
        <NavLink
          to={item.link}
          key={item.name}
          onClick={() => setDropdownOpen(false)}
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
      <Divider />
      <div
        className="flex items-center gap-4 p-4 font-semibold transition cursor-pointer hover:text-red-600"
        onClick={logoutUser}
      >
        <Icon icon="logout" />
        Cerrar sesión
      </div>
    </div>
  );
};

export default Dropdown;
