import React from "react";

// Components
import Tabs from "../components/Tabs";
import EmployeesTab from "../components/EmployeesTab";

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
      component: <div>Component 3</div>,
    },
    {
      name: "Trabajos",
      component: <div>Component 4</div>,
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
