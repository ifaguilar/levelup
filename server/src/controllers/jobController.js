import db from "../database/db.js";

export const getJobs = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        job.id,
        job.job_title,
        team.team_name,
        job.created_at,
        job.modified_at
      FROM job
      JOIN team ON job.team_id = team.id
      WHERE job.is_active = TRUE AND team.is_active = TRUE
      `);

    const jobs = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de trabajos obtenida correctamente.",
      jobs: jobs,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const query = await db.query(
      `SELECT 
        id, 
        job_title,
        job_description,
        team_id
      FROM job
      WHERE job.id = $1
      `,
      [jobId]
    );

    const job = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Información de trabajo obtenida correctamente.",
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

export const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, teamId } = req.body;

    let query = await db.query(
      `SELECT job.job_title 
      FROM job 
      JOIN team ON job.team_id = team.id
      WHERE 
        job.job_title = $1 AND 
        job.is_active != FALSE AND 
        team.is_active != FALSE`,
      [jobTitle]
    );

    if (query.rowCount !== 0) {
      throw new Error("El nombre del trabajo ya está en uso.");
    }

    query = await db.query(
      `INSERT INTO job (
        job_title,
        job_description,
        team_id
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING id`,
      [jobTitle, jobDescription, teamId]
    );

    const jobId = query.rows[0].id;

    query = await db.query(
      `SELECT 
        job.id, 
        job.job_title,
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

    if (error.message === "El nombre del trabajo ya está en uso.") {
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

export const editJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { jobTitle, jobDescription, teamId } = req.body;

    let query = await db.query(
      "SELECT job_title FROM job WHERE job_title = $1 AND id != $2 AND is_active != FALSE",
      [jobTitle, jobId]
    );

    if (query.rowCount !== 0) {
      throw new Error("El nombre del trabajo ya está en uso.");
    }

    query = await db.query(
      `UPDATE 
        job 
      SET 
        job_title = $1,
        job_description = $2,
        team_id = $3,
        modified_at = NOW()
      WHERE id = $4`,
      [jobTitle, jobDescription, teamId, jobId]
    );

    query = await db.query(
      `SELECT
        job.id,
        job.job_title,
        team.team_name,
        job.created_at,
        job.modified_at
      FROM job
      JOIN team ON job.team_id = team.id
      WHERE job.id = $1`,
      [jobId]
    );

    const job = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Trabajo editado correctamente.",
      job: job,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El nombre del trabajo ya está en uso.") {
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

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const query = await db.query(
      "UPDATE job SET is_active = FALSE WHERE id = $1;",
      [jobId]
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
