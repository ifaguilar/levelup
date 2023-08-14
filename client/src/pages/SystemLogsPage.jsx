import React from "react";
import { Navigate } from "react-router-dom";

const SystemLogsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.is_pro !== true) {
    return (
      <div className="min-h-screen bg-white">
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 lg:p-24 mt-14">
      <h3>Bitácora de sistema</h3>
    </div>
  );
};

export default SystemLogsPage;
