import db from "../database/db.js";

export const getSalesOrders = async (req, res) => {};

export const getSalesOrderById = async (req, res) => {};

export const createSalesOrder = async (req, res) => {};

export const editSalesOrder = async (req, res) => {};

export const deleteSalesOrder = async (req, res) => {};

export const getLatestSalesOrders = async (req, res) => {
  try {
    const query = await db.query(
      `SELECT 
        sales_order.id,
        CONCAT(person.first_name, ' ', person.last_name) AS customer_name,
        person.email,
        order_details.total_amount,
        sales_order.order_date,
        sales_order.order_status
      FROM sales_order
      JOIN customer ON sales_order.customer_id = customer.id
      JOIN person ON customer.person_id = person.id
      JOIN order_details ON sales_order.order_details_id = order_details.id
      ORDER BY sales_order.order_date DESC
      LIMIT 10`
    );

    const latestSalesOrders = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Lista de últimos pedidos obtenida correctamente.",
      latestSalesOrders: latestSalesOrders,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const countSalesOrders = async (req, res) => {
  try {
    const query = await db.query("SELECT COUNT(*) FROM sales_order");

    const salesOrderCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de pedidos obtenida correctamente.",
      salesOrderCount: salesOrderCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
