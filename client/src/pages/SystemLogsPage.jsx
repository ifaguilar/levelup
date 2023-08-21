import React, { useState } from "react";
import { Navigate, useLoaderData } from "react-router-dom";

// Components
import Table from "../components/Table";

// Constants
import { SYSTEM_LOG_TABLE_HEADERS } from "../constants/constants";

const SystemLogsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { systemLogs } = useLoaderData();
  const [rows, setRows] = useState(systemLogs);
  const [headers, setHeaders] = useState(SYSTEM_LOG_TABLE_HEADERS);

  if (user?.is_pro !== true) {
    return (
      <div className="min-h-screen bg-white">
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 lg:p-24 mt-14">
      <div className="flex flex-col gap-24">
        <h3>Bitácora de sistema</h3>

        <div className="card">
          <h5>Últimos eventos</h5>
          <Table headers={headers} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default SystemLogsPage;
