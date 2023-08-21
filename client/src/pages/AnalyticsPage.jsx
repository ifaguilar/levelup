import React, { useState } from "react";
import { Navigate, useLoaderData } from "react-router-dom";

// Components
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

// Constants
import { TAILWIND_CSS_COLORS } from "../constants/constants";

const AnalyticsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { productCountByBrand, employeeCountByGender } = useLoaderData();

  const [productsByBrand, setProductsByBrand] = useState({
    labels: productCountByBrand.map((data) => data.brand_name),
    datasets: [
      {
        label: "Cantidad de productos",
        data: productCountByBrand.map((data) => data.product_quantity),
        backgroundColor: TAILWIND_CSS_COLORS,
      },
    ],
  });

  const [employeesByGender, setEmployeesByGender] = useState({
    labels: employeeCountByGender.map((data) => data.gender_name),
    datasets: [
      {
        label: "Cantidad de empleados",
        data: employeeCountByGender.map((data) => data.employee_quantity),
        backgroundColor: TAILWIND_CSS_COLORS,
      },
    ],
  });

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
      <div className="grid grid-rows-2 gap-12 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-4">
        <div className="max-w-sm md:max-w-none lg:col-span-3 card">
          <h5>Productos por marca</h5>
          <BarChart chartData={productsByBrand} />
        </div>
        <div className="card">
          <h5>Empleados por género</h5>
          <PieChart chartData={employeesByGender} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
