import React from "react";

// Components
import Tabs from "../components/Tabs";
import ProductsTab from "../components/ProductsTab";
import BrandsTab from "../components/BrandsTab";
import CategoriesTab from "../components/CategoriesTab";

const InventoryPage = () => {
  const tabList = [
    {
      name: "Principal",
      component: <div>Component 1</div>,
    },
    {
      name: "Productos",
      component: <ProductsTab />,
    },
    {
      name: "Categorías",
      component: <CategoriesTab />,
    },
    {
      name: "Marcas",
      component: <BrandsTab />,
    },
    {
      name: "Proveedores",
      component: <div>Component 5</div>,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen gap-12 px-4 py-12 lg:p-24 mt-14">
      <h3>Inventario</h3>
      <Tabs tabList={tabList} />
    </div>
  );
};

export default InventoryPage;
