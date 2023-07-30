import React from "react";

// Components
import Tabs from "../components/Tabs";
import EmployeesTab from "../components/EmployeesTab";
import TeamsTab from "../components/TeamsTab";
import JobsTab from "../components/JobsTab";

const HRPage = () => {
  const tabList = [
    {
      name: "Principal",
      component: <div>Component 1</div>,
    },
    {
      name: "Empleados",
      component: <EmployeesTab />,
    },
    {
      name: "Equipos",
      component: <TeamsTab />,
    },
    {
      name: "Trabajos",
      component: <JobsTab />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen gap-12 px-4 py-12 lg:p-24 mt-14">
      <h3>Recursos Humanos</h3>
      <Tabs tabList={tabList} />
    </div>
  );
};

export default HRPage;
