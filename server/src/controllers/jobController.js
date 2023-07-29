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

export const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, team } = req.body;

    let query = await db.query(
      `INSERT INTO job (
        job_title,
        job_description,
        team_id
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING id`,
      [jobTitle, jobDescription, parseInt(team)]
    );

    const jobId = query.rows[0].id;

    query = await db.query(
      `SELECT
        job.job_title,
        job.job_description,
        team.team_name,
        job.created_at,
        job.modified_at
      FROM job
      JOIN team ON job.team_id = team.id
      WHERE job.id = $1
      `,
      [jobId]
    );

    const job = query.rows[0];

    return res.status(201).json({
      ok: true,
      message: "Trabajo creado correctamente.",
      job: job,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const query = await db.query(
      "UPDATE job SET is_active = FALSE WHERE id = $1;",
      [id]
    );

    return res.status(200).json({
      ok: true,
      message: "Trabajo eliminado correctamente.",
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
