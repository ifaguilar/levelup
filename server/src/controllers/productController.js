import db from "../database/db.js";

export const countProducts = async (req, res) => {
  try {
    const query = await db.query("SELECT COUNT(*) FROM product");

    const productCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de productos obtenida correctamente.",
      productCount: productCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
