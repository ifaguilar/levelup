import db from "../database/db.js";

export const getMunicipalities = async (req, res) => {
  try {
    const query = await db.query("SELECT * FROM municipality");

    const municipalities = query.rows;

    if (municipalities.length === 0) {
      throw new Error("No se encontraron municipios.");
    }

    return res.status(200).json({
      ok: true,
      message: "Lista de municipios obtenida correctamente.",
      municipalities: municipalities,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "No se encontraron municipios.") {
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

export const getMunicipalitiesByDepartmentId = async (req, res) => {
  try {
    const query = await db.query(
      "SELECT * FROM municipality WHERE department_id = $1",
      [req.params.id]
    );

    const municipalities = query.rows;

    if (municipalities.length === 0) {
      throw new Error("No se encontraron municipios.");
    }

    return res.status(200).json({
      ok: true,
      message: "Lista de municipios obtenida correctamente.",
      municipalities: municipalities,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "No se encontraron municipios.") {
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
