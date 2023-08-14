import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Outlet,
  ScrollRestoration,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API
import { upgradeToPro } from "./api/employee";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Icon from "./components/Icon";
import Button from "./components/Button";

// Constants
import { PRO_BENEFITS } from "./constants/constants";

// Context
import { AuthContext } from "./context/AuthProvider";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { isAuthenticated } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [proModal, setProModal] = useState(false);
  const overlayRef = useRef();
  const navigate = useNavigate();

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
      setModalOpen(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const id = user?.id;
      const data = await upgradeToPro(id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Suscrito correctamente.");
      navigate("/profile");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
        toast.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
      }
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
          sidebarOpen || dropdownOpen || modalOpen ? "block" : "hidden"
        } absolute bg-black/10 inset-0 z-40`}
      ></div>
      {modalOpen === true && proModal === true ? (
        <Modal
          title="Mejorar a Pro"
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex items-center justify-center w-24 h-24 border-2 border-green-500 rounded-full bg-green-500/5">
              <p className="text-xl font-bold text-green-500 uppercase">Pro</p>
            </div>
            <p className="text-4xl font-bold">HNL 499.99/mes</p>
          </div>
          <p>
            Con la suscripción Pro obtienes acceso a los siguientes módulos:
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {PRO_BENEFITS.map((benefit) => (
              <div key={benefit.name} className="flex items-center gap-2">
                <div className="text-green-500">
                  <Icon icon="checkmark" />
                </div>
                <span key={benefit.name}>{benefit.text}</span>
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            className="flex justify-center w-full gap-2"
            onClick={() => {
              handleUpgrade();
              setSidebarOpen(false);
              setModalOpen(false);
              setProModal(false);
            }}
          >
            <Icon icon="pro" />
            Mejorar a Pro
          </Button>
        </Modal>
      ) : null}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        setModalOpen={setModalOpen}
        setProModal={setProModal}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setProModal={setProModal}
        setModalOpen={setModalOpen}
      />
      <Outlet
        context={{
          sidebarOpen,
          setSidebarOpen,
          modalOpen,
          setModalOpen,
          proModal,
          setProModal,
        }}
      />
      <Footer />
      <ScrollRestoration />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Layout;
