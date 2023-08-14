import React from "react";
import { Navigate } from "react-router-dom";

// Components
import Tabs from "../components/Tabs";

const AnalyticsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const tabList = [
    {
      name: "Principal",
      component: <div>Component 1</div>,
    },
  ];

  if (user?.is_pro !== true) {
    return (
      <div className="min-h-screen bg-white">
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-12 px-4 py-12 lg:p-24 mt-14">
      <h3>Analíticas</h3>
      <Tabs tabList={tabList} />
    </div>
  );
};

export default AnalyticsPage;
