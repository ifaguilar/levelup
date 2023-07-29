import db from "../database/db.js";

export const getDepartments = async (req, res) => {
  try {
    const query = await db.query("SELECT * FROM department");

    const departments = query.rows;

    if (departments.length === 0) {
      throw new Error("No se encontraron departamentos.");
    }

    return res.status(200).json({
      ok: true,
      message: "Lista de departamentos obtenida correctamente.",
      departments: departments,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "No se encontraron departamentos.") {
      return res.status(400).json({
        ok: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
