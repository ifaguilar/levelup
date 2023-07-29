import db from "../database/db.js";

export const getTeam = async (req, res) => {
    try {
      const query = await db.query("SELECT * FROM job");
  
      const team = query.rows;
  
      if (team.length === 0) {
        throw new Error("No se encontraron trabajos.");
      }
  
      return res.status(200).json({
        ok: true,
        message: "Lista de trabajos obtenida correctamente.",
        team: team,
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

export const createTeam = async (req, res) => {
    try {
    const {
        teamName,
        teamDescription,
      } = req.body;
      
      let query = await db.query(
        `INSERT INTO team (
          team_name,
          team_description
        ) VALUES (
          $1,
          $2
        )RETURNING id`,
        [
          teamName,
          teamDescription,
        ]
      );


    const teamId = query.rows[0].id;
        
      query = await db.query(
        `SELECT
        team.team_name,
        team.team_description,
        team.created_at,
        team.modified_at
        FROM team
        WHERE team.id = $1
        `,
        [teamId]
      );
      
      const team = query.rows[0];
      return res.status(201).json({
        ok: true,
        message: "Trabajo creado correctamente.",
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

/************** DELETE TEAM */
  export const deleteTeam = async (req, res) => {
    try {
      const id = req.params.id;
      const query = await db.query(
        "UPDATE team SET is_active = FALSE WHERE id = $1;",
        [id]
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