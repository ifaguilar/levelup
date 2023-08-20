import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

// Components
import Icon from "../components/Icon";
import Table from "../components/Table";
import PieChart from "../components/PieChart";

// Constants
import {
  LATEST_SALES_ORDERS_TABLE_HEADERS,
  TAILWIND_CSS_COLORS,
} from "../constants/constants";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { stats, latestSalesOrders, productCountByCategory } = useLoaderData();
  const [rows, setRows] = useState(latestSalesOrders);
  const [headers, setHeaders] = useState(LATEST_SALES_ORDERS_TABLE_HEADERS);

  const [productsByCategory, setProductsByCategory] = useState({
    labels: productCountByCategory.map((data) => data.category_name),
    datasets: [
      {
        label: "Cantidad de productos",
        data: productCountByCategory.map((data) => data.product_quantity),
        backgroundColor: TAILWIND_CSS_COLORS,
      },
    ],
  });

  return (
    <div className="min-h-screen px-4 py-12 lg:p-24 mt-14">
      <div className="flex flex-col gap-24">
        <h3>
          {`${
            user?.gender_name === "Masculino" ? "Bienvenido" : "Bienvenida"
          }, ${user?.first_name}`}
        </h3>
        <div className="grid grid-rows-4 gap-12 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`card-stats ${stat.colors.cardBgColor}`}
            >
              <div
                className={`card-icon ${stat.colors.iconBgColor} ${stat.colors.iconTextColor}`}
              >
                <Icon icon={stat.icon} />
              </div>
              <p className="card-number">{stat.number}</p>
              <p className="card-title">{stat.title}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-rows-2 gap-12 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-4">
          <div className="max-w-sm md:max-w-none lg:col-span-3 card">
            <div className="flex flex-col gap-12">
              <h5>Últimos pedidos</h5>
              <Table headers={headers} rows={rows} />
            </div>
          </div>
          <div className="card">
            <div className="flex flex-col gap-12">
              <h5>Productos por categorías</h5>
              <PieChart chartData={productsByCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
