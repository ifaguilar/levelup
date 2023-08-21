import db from "../database/db.js";

export const getSuppliers = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        id,
        supplier_name,
        email,
        phone,
        created_at,
        modified_at
      FROM supplier
      WHERE supplier.is_active = TRUE
      `);

    const suppliers = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de proveedores obtenida correctamente.",
      suppliers: suppliers,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getSupplierById = async (req, res) => {};

export const createSupplier = async (req, res) => {};

export const editSupplier = async (req, res) => {};

export const deleteSupplier = async (req, res) => {};
