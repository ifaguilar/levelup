import db from "../database/db.js";

export const countEmployees = async (req, res) => {
  try {
    const query = await db.query("SELECT COUNT(*) FROM employee");

    const employeeCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de empleados obtenida correctamente.",
      employeeCount: employeeCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const countCustomers = async (req, res) => {
  try {
    const query = await db.query("SELECT COUNT(*) FROM customer");

    const customerCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de clientes obtenida correctamente.",
      customerCount: customerCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
