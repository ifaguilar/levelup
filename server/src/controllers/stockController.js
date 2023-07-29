import db from "../database/db.js";

export const getStock = async (req, res) => {
    try {
      const query = await db.query("SELECT * FROM stock");
  
      const jobs = query.rows;
  
      if (jobs.length === 0) {
        throw new Error("No se encontraron existencias.");
      }
  
      return res.status(200).json({
        ok: true,
        message: "Lista de existencias obtenida correctamente.",
        jobs: jobs,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "No hay existencias actuales.") {
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

  export const createStock = async (req, res) => {
    try {
      const {
        quantity,
        product,
      } = req.body;
      
      let query = await db.query(
        `INSERT INTO stock (
          quantity,
          product_id
        ) VALUES (
          $1,
          $2
        ) RETURNING id`,
        [
          quantity,
          parseInt(product),
        ]
      );
  
      const stocktId = query.rows[0].id
  
      query = await db.query(
        `SELECT
          stock.quantity,
          product.product_name,
          stock.created_at,
          stock.modified_at
        FROM stock
        JOIN product ON stock.product_id = product.id
        WHERE stock.id = $1
        `,
        [stocktId]
      );
  
      const job = query.rows[0];
  
      return res.status(201).json({
        ok: true,
        message: "Existencia creada correctamente.",
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

  export const deleteStock = async (req, res) => {
    try {
      const id = req.params.id;
      const query = await db.query(
        "UPDATE stock SET is_active = FALSE WHERE id = $1;",
        [id]
      );
  
      return res.status(200).json({
        ok: true,
        message: "Existencia eliminada correctamente.",
      });
    } catch (error) {
      console.error(error.message);
  
      return res.status(500).json({
        ok: false,
        message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
      });
    }
  };