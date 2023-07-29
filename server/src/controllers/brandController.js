import db from "../database/db.js";

export const getBrands = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        id,
        brand_name,
        created_at,
        modified_at
      FROM brand
      WHERE is_active = TRUE
      `);

    const brands = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de marcas obtenida correctamente.",
      brands: brands,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const query = await db.query(
      "SELECT id, brand_name FROM brand WHERE id = $1",
      [req.params.id]
    );

    const brand = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Información de marca obtenida correctamente.",
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

export const createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;

    let query = await db.query(
      "SELECT brand_name FROM brand WHERE brand_name = $1 AND is_active != FALSE",
      [brandName]
    );

    if (query.rowCount !== 0) {
      throw new Error("La marca ya existe en la base de datos.");
    }

    query = await db.query(
      `INSERT INTO brand (
          brand_name
      ) VALUES (
        $1
      ) RETURNING id`,
      [brandName]
    );

    const brandId = query.rows[0].id;

    query = await db.query(
      `SELECT
        id,
        brand_name,
        created_at,
        modified_at
      FROM brand
      WHERE id = $1`,
      [brandId]
    );

    const brand = query.rows[0];

    return res.status(201).json({
      ok: true,
      message: "Marca creada correctamente.",
      brand: brand,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "La marca ya existe en la base de datos.") {
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

export const editBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { brandName } = req.body;

    let query = await db.query(
      "SELECT brand_name FROM brand WHERE brand_name = $1 AND id != $2",
      [brandName, id]
    );

    if (query.rowCount !== 0) {
      throw new Error("La marca ya existe en la base de datos.");
    }

    query = await db.query(
      `UPDATE 
        brand 
      SET 
        brand_name = $1,
        modified_at = NOW()
      WHERE id = $2`,
      [brandName, id]
    );

    query = await db.query(
      `SELECT
        id,
        brand_name,
        created_at,
        modified_at
      FROM brand
      WHERE id = $1`,
      [id]
    );

    const brand = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Marca editada correctamente.",
      brand: brand,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "La marca ya existe en la base de datos.") {
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

export const countBrands = async (req, res) => {
  try {
    const query = await db.query(
      "SELECT COUNT(*) FROM brand WHERE is_active = TRUE"
    );

    const brandCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de marcas obtenida correctamente.",
      brandCount: brandCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
