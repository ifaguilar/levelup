import db from "../database/db.js";

export const getJobs = async (req, res) => {
  try {
    const query = await db.query("SELECT * FROM job");

    const jobs = query.rows;

    if (jobs.length === 0) {
      throw new Error("No se encontraron trabajos.");
    }

    return res.status(200).json({
      ok: true,
      message: "Lista de trabajos obtenida correctamente.",
      jobs: jobs,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "No se encontraron trabajos.") {
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
