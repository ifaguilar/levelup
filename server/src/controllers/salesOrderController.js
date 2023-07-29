import db from "../database/db.js";

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
