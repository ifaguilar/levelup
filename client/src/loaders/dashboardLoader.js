import { redirect } from "react-router-dom";

// API
import { countProducts, countProductsByCategory } from "../api/product";
import { countEmployees } from "../api/employee";
import { countSalesOrders, getLatestSalesOrders } from "../api/salesOrder";
import { countTickets } from "../api/ticket";

const dashboardLoader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  try {
    const { employeeCount } = await countEmployees();
    const { productCount } = await countProducts();
    const { salesOrderCount } = await countSalesOrders();
    const { ticketCount } = await countTickets();
    const { latestSalesOrders } = await getLatestSalesOrders();
    const { productCountByCategory } = await countProductsByCategory();

    const stats = [
      {
        title: "Empleados en planilla",
        number: employeeCount,
        icon: "people",
        colors: {
          cardBgColor: "bg-blue-100",
          iconBgColor: "bg-blue-500",
          iconTextColor: "text-blue-50",
        },
      },
      {
        title: "Productos en inventario",
        number: productCount,
        icon: "box",
        colors: {
          cardBgColor: "bg-amber-100",
          iconBgColor: "bg-amber-500",
          iconTextColor: "text-amber-50",
        },
      },
      {
        title: "Pedidos realizados",
        number: salesOrderCount,
        icon: "receipt",
        colors: {
          cardBgColor: "bg-green-100",
          iconBgColor: "bg-green-500",
          iconTextColor: "text-green-50",
        },
      },
      {
        title: "Tickets pendientes",
        number: ticketCount,
        icon: "ticket",
        colors: {
          cardBgColor: "bg-red-100",
          iconBgColor: "bg-red-500",
          iconTextColor: "text-red-50",
        },
      },
    ];

    return {
      stats: stats,
      latestSalesOrders: latestSalesOrders,
      productCountByCategory: productCountByCategory,
    };
  } catch (error) {
    return { stats: [], latestSalesOrders: [], productCountByCategory: [] };
  }
};

export default dashboardLoader;
