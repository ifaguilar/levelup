import db from "../database/db.js";

export const getAddress = async (req, res) => {
    try {
      const query = await db.query("SELECT * FROM address");
  
      const team = query.rows;
  
      if (team.length === 0) {
        throw new Error("No se encontraron direccion.");
      }
  
      return res.status(200).json({
        ok: true,
        message: "Lista de direcciones obtenida correctamente.",
        team: team,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "No se encontraron direcciones.") {
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


  /******** CREATE ADDRESS *****/
  export const createAddress = async (req, res) => {
    try {
      const {
        addressDescription,
        municipality,
      } = req.body;
      
      let query = await db.query(
        `INSERT INTO address (
          address_description,
          municipality_id
        ) VALUES (
          $1,
          $2
        ) RETURNING id`,
        [
          addressDescription,
          parseInt(municipality),
        ]
      );
  
      const addressId = query.rows[0].id
  
      query = await db.query(
        `SELECT
          address.address_description,
          municipality.municipality_name,
          address.created_at,
          address.modified_at
        FROM address
        JOIN municipality ON address.municipality_id = municipality.id
        WHERE address.id = $1
        `,
        [addressId]
      );
  
      const job = query.rows[0];
  
      return res.status(201).json({
        ok: true,
        message: "Direccion creada correctamente.",
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

  /**** Delete address ****/

  export const deleteAddress = async (req, res) => {
    try {
      const id = req.params.id;
      const query = await db.query(
        "UPDATE address SET is_active = FALSE WHERE id = $1;",
        [id]
      );
  
      return res.status(200).json({
        ok: true,
        message: "Direccion eliminada correctamente.",
      });
    } catch (error) {
      console.error(error.message);
  
      return res.status(500).json({
        ok: false,
        message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
      });
    }
  };