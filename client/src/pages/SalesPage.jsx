import React from "react";

// Components
import Tabs from "../components/Tabs";

const SalesPage = () => {
  const tabList = [
    {
      name: "Principal",
      component: <div>Component 1</div>,
    },
    {
      name: "Clientes",
      component: <div>Component 2</div>,
    },
    {
      name: "Pedidos",
      component: <div>Component 3</div>,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen gap-12 px-4 py-12 lg:p-24 mt-14">
      <h3>Ventas</h3>
      <Tabs tabList={tabList} />
    </div>
  );
};

export default SalesPage;
