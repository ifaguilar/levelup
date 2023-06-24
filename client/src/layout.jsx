import React, { useRef, useState, useEffect, useContext } from "react";
import { Outlet, ScrollRestoration, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Context
import { AuthContext } from "./context/AuthProvider";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const overlayRef = useRef();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener("click", handleOverlay);

    return () => {
      document.removeEventListener("click", handleOverlay);
    };
  }, []);

  const handleOverlay = (event) => {
    const isClicked = overlayRef.current?.contains(event.target);

    if (isClicked) {
      setSidebarOpen(false);
      setDropdownOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navigate to="/login" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={overlayRef}
        className={`${
          sidebarOpen || dropdownOpen ? "block" : "hidden"
        } absolute bg-black/10 inset-0 z-40`}
      ></div>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
      />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
