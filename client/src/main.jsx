import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IconContext } from "react-icons";
import Layout from "./layout";
import "./main.css";

// Context
import { AuthProvider } from "./context/AuthProvider";

// Loaders
import homeLoader from "./loaders/homeLoader";
import warehouseLoader from "./loaders/warehouseLoader";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import WarehousePage from "./pages/WarehousePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "/warehouse",
        element: <WarehousePage />,
        loader: warehouseLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <IconContext.Provider value={{ size: "1.25em" }}>
        <RouterProvider router={router} />
      </IconContext.Provider>
    </AuthProvider>
  </React.StrictMode>
);
