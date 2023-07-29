import db from "../database/db.js";

export const getSuppliers = async (req, res) => {
    try {
      const query = await db.query("SELECT * FROM supplier");
  
      const team = query.rows;
  
      if (team.length === 0) {
        throw new Error("No se encontro ningun proveedor.");
      }
  
      return res.status(200).json({
        ok: true,
        message: "Lista de proveedores obtenida correctamente.",
        team: team,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "No se encontro ningun proveedor.") {
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


  /******** CREATE SUPPLIER *****/
  export const createSupplier = async (req, res) => {
    try {
      const {
        supplierName,
        email,
        phone,
        address,
      } = req.body;
      
      let query = await db.query(
        `INSERT INTO supplier (
          supplier_name,
          email,
          phone,
          address_id
        ) VALUES (
          $1,
          $2,
          $3,
          $4
        ) RETURNING id`,
        [
          supplierName,
          email,
          phone,
          parseInt(address),
        ]
      );
  
      const supplierId = query.rows[0].id
  
      query = await db.query(
        `SELECT
          supplier.supplier_name,
          supplier.email,
          supplier.phone,
          address.address_description,
          supplier.created_at,
          supplier.modified_at
        FROM supplier
        JOIN address ON supplier.address_id = address.id
        WHERE supplier.id = $1
        `,
        [supplierId]
      );
  
      const job = query.rows[0];
  
      return res.status(201).json({
        ok: true,
        message: "proveedor creado correctamente.",
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

  /**** Delete supplier ****/

  export const deleteSupplier = async (req, res) => {
    try {
      const id = req.params.id;
      const query = await db.query(
        "UPDATE supplier SET is_active = FALSE WHERE id = $1;",
        [id]
      );
  
      return res.status(200).json({
        ok: true,
        message: "proveedor eliminado correctamente.",
      });
    } catch (error) {
      console.error(error.message);
  
      return res.status(500).json({
        ok: false,
        message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
      });
    }
  };