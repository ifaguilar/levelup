import db from "../database/db.js";

export const getGenders = async (req, res) => {
  try {
    const query = await db.query("SELECT * FROM gender");

    const genders = query.rows;

    if (genders.length === 0) {
      throw new Error("No se encontraron géneros.");
    }

    return res.status(200).json({
      ok: true,
      message: "Lista de géneros obtenida correctamente.",
      genders: genders,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "No se encontraron géneros.") {
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
