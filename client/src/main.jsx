import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IconContext } from "react-icons";
import Layout from "./layout";
import "./main.css";

// Context
import { AuthProvider } from "./context/AuthProvider";

// Loaders
import dashboardLoader from "./loaders/dashboardLoader";
import hrLoader from "./loaders/hrLoader";
import inventoryLoader from "./loaders/inventoryLoader";
import salesLoader from "./loaders/salesLoader";
import supportLoader from "./loaders/supportLoader";
import analyticsLoader from "./loaders/analyticsLoader";
import profileLoader from "./loaders/profileLoader";
import signupLoader from "./loaders/signupLoader";
import systemLogLoader from "./loaders/systemLogLoader";

// Pages
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import HRPage from "./pages/HRPage";
import InventoryPage from "./pages/InventoryPage";
import SalesPage from "./pages/SalesPage";
import SupportPage from "./pages/SupportPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import SystemLogsPage from "./pages/SystemLogsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: "/hr",
        element: <HRPage />,
        loader: hrLoader,
      },
      {
        path: "/inventory",
        element: <InventoryPage />,
        loader: inventoryLoader,
      },
      {
        path: "/sales",
        element: <SalesPage />,
        loader: salesLoader,
      },
      {
        path: "/support",
        element: <SupportPage />,
        loader: supportLoader,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
        loader: analyticsLoader,
      },
      {
        path: "/system_logs",
        element: <SystemLogsPage />,
        loader: systemLogLoader,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: profileLoader,
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
    loader: signupLoader,
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
