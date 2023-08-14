import React from "react";
import { NavLink } from "react-router-dom";

// Components
import Icon from "./Icon";
import Button from "./Button";

// Constants
import { PRO_BENEFITS, SIDEBAR_ITEMS } from "../constants/constants";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  setModalOpen,
  setProModal,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => {
    setSidebarOpen(false);
    setModalOpen(false);
    setProModal(false);
  };

  const openProModal = () => {
    setSidebarOpen(false);
    setModalOpen(true);
    setProModal(true);
  };

  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      } fixed top-14 bottom-0 left-0 w-64 z-50 py-6 overflow-y-scroll shadow-lg bg-white transition flex flex-col justify-between`}
    >
      <div>
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            to={item.link}
            key={item.name}
            onClick={(event) => {
              const isProBenefit = PRO_BENEFITS.some(
                (benefit) => benefit.name === item.name
              );

              if (isProBenefit && user.is_pro === false) {
                event.preventDefault();
                openProModal();
              } else {
                handleClose();
              }
            }}
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
      {user.is_pro !== true ? (
        <div className="p-4">
          <Button
            variant="primary"
            className="flex justify-center w-full gap-2"
            onClick={openProModal}
          >
            <Icon icon="pro" />
            Mejorar a Pro
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
