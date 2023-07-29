import React from "react";
import { useLoaderData } from "react-router-dom";

// Components
import Icon from "../components/Icon";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { stats } = useLoaderData();

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
        <div className="grid grid-cols-2 gap-12">
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
