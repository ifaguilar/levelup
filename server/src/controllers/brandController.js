import db from "../database/db.js";

export const getBrand = async (req, res) => {
    try {
      const query = await db.query("SELECT * FROM brand");
  
      const team = query.rows;
  
      if (team.length === 0) {
        throw new Error("No se encontraron marcas.");
      }
  
      return res.status(200).json({
        ok: true,
        message: "Lista de marcas obtenida correctamente.",
        team: team,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "No se encontraron marcas.") {
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

export const createBrand = async (req, res) => {
    try {
    const {
        brandName,
      } = req.body;
      
      let query = await db.query(
        `INSERT INTO brand (
          brand_name
        ) VALUES (
          $1
        )RETURNING id`,
        [
          brandName
        ]
      );


    const branId = query.rows[0].id;
        
      query = await db.query(
        `SELECT
        brand.brand_name,
        brand.created_at,
        brand.modified_at
        FROM brand
        WHERE brand.id = $1
        `,
        [branId]
      );
      
      const brand = query.rows[0];
      return res.status(201).json({
        ok: true,
        message: "Marca creada correctamente.",
        brand: brand,
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
  export const deleteBrand = async (req, res) => {
    try {
      const id = req.params.id;
      const query = await db.query(
        "UPDATE brand SET is_active = FALSE WHERE id = $1;",
        [id]
      );
  
      return res.status(200).json({
        ok: true,
        message: "Marca eliminada correctamente.",
      });
    } catch (error) {
      console.error(error.message);
  
      return res.status(500).json({
        ok: false,
        message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
      });
    }
  };