import React from "react";
import { BsList, BsBell } from "react-icons/bs";

// Components
import Logo from "./Logo";
import IconButton from "./IconButton";
import ProfilePic from "./ProfilePic";
import Dropdown from "./Dropdown";

const Navbar = ({
  sidebarOpen,
  setSidebarOpen,
  dropdownOpen,
  setDropdownOpen,
  setModalOpen,
  setProModal,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => {
    setSidebarOpen(false);
    setDropdownOpen(false);
    setModalOpen(false);
    setProModal(false);
  };

  const openSidebar = () => {
    handleClose();
    setSidebarOpen(!sidebarOpen);
  };

  const openDropdown = () => {
    handleClose();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between px-4 py-1 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <IconButton onClick={openSidebar}>
          <BsList />
        </IconButton>
        <Logo className="h-6" onClick={handleClose} />
      </div>
      <div className="flex items-center gap-4">
        <IconButton>
          <BsBell />
        </IconButton>
        <ProfilePic
          src={user?.profile_pic_url}
          className="cursor-pointer"
          onClick={openDropdown}
        />
        <Dropdown
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
