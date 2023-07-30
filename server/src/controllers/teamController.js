import db from "../database/db.js";

export const getTeams = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        id,
        team_name,
        created_at,
        modified_at
      FROM team
      WHERE is_active = TRUE
      `);

    const teams = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de equipos obtenida correctamente.",
      teams: teams,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const teamId = req.params.id;
    const query = await db.query(
      "SELECT id, team_name, team_description FROM team WHERE id = $1",
      [teamId]
    );

    const team = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Información de equipo obtenida correctamente.",
      team: team,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { teamName, teamDescription } = req.body;

    let query = await db.query(
      "SELECT team_name FROM team WHERE team_name = $1 AND is_active != FALSE",
      [teamName]
    );

    if (query.rowCount !== 0) {
      throw new Error("El nombre del equipo ya está en uso.");
    }

    query = await db.query(
      `INSERT INTO team (
        team_name,
        team_description
      ) VALUES (
        $1,
        $2
      ) RETURNING id`,
      [teamName, teamDescription]
    );

    const teamId = query.rows[0].id;

    query = await db.query(
      `SELECT
        id,
        team_name,
        created_at,
        modified_at
      FROM team
      WHERE id = $1`,
      [teamId]
    );

    const team = query.rows[0];

    return res.status(201).json({
      ok: true,
      message: "Equipo creado correctamente.",
      team: team,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El nombre del equipo ya está en uso.") {
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

export const editTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { teamName, teamDescription } = req.body;

    let query = await db.query(
      "SELECT team_name FROM team WHERE team_name = $1 AND id != $2 AND is_active != FALSE",
      [teamName, teamId]
    );

    if (query.rowCount !== 0) {
      throw new Error("El nombre del equipo ya está en uso.");
    }

    query = await db.query(
      `UPDATE 
        team 
      SET 
        team_name = $1,
        team_description = $2,
        modified_at = NOW()
      WHERE id = $3`,
      [teamName, teamDescription, teamId]
    );

    query = await db.query(
      `SELECT
        id,
        team_name,
        created_at,
        modified_at
      FROM team
      WHERE id = $1`,
      [teamId]
    );

    const team = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Equipo editado correctamente.",
      team: team,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El nombre del equipo ya está en uso.") {
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

export const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const query = await db.query(
      "UPDATE team SET is_active = FALSE WHERE id = $1;",
      [teamId]
    );

    return res.status(200).json({
      ok: true,
      message: "Equipo eliminado correctamente.",
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
