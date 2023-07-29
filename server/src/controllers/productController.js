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

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      price,
      category,
      brand,
    } = req.body;
    
    let query = await db.query(
      `INSERT INTO product (
        product_name,
        product_description,
        price,
        category_id,
        brand_id
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
      ) RETURNING id`,
      [
        productName,
        productDescription,
        price,
        category,
        parseInt(brand),
      ]
    );

    const productId = query.rows[0].id

    query = await db.query(
      `SELECT
        product.product_name,
        product.product_description,
        product.price,
        brand.brand_name,
        product.created_at,
        product.modified_at
      FROM product
      JOIN brand ON product.brand_id = brand.id
      WHERE product.id = $1
      `,
      [productId]
    );

    const job = query.rows[0];

    return res.status(201).json({
      ok: true,
      message: "Producto creado correctamente.",
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

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const query = await db.query(
      "UPDATE product SET is_active = FALSE WHERE id = $1;",
      [id]
    );

    return res.status(200).json({
      ok: true,
      message: "Producto eliminado correctamente.",
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};