import db from "../database/db.js";

export const getProducts = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        product.id,
        product.product_name,
        brand.brand_name,
        category.category_name,
        supplier.supplier_name,
        product.created_at,
        product.modified_at
      FROM product
      JOIN brand ON product.brand_id = brand.id
      JOIN category ON product.category_id = category.id
      JOIN supplier ON product.supplier_id = supplier.id
      WHERE 
        product.is_active = TRUE AND 
        brand.is_active = TRUE AND
        category.is_active = TRUE AND
        supplier.is_active = TRUE
      ORDER BY product.id
      `);

    const products = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de productos obtenida correctamente.",
      products: products,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const query = await db.query(
      `SELECT 
        id, 
        product_name,
        product_description,
        price,
        category_id,
        brand_id,
        supplier_id
      FROM product
      WHERE product.id = $1
      `,
      [productId]
    );

    const product = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Información de producto obtenida correctamente.",
      product: product,
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
      brandId,
      categoryId,
      supplierId,
    } = req.body;

    let query = await db.query(
      `SELECT product_name
      FROM product
      WHERE product.product_name = $1 AND product.is_active != FALSE`,
      [productName]
    );

    if (query.rowCount !== 0) {
      throw new Error("El nombre de producto ya está en uso.");
    }

    query = await db.query(
      `INSERT INTO product (
        product_name,
        product_description,
        price,
        brand_id,
        category_id,
        supplier_id
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      ) RETURNING id`,
      [productName, productDescription, price, brandId, categoryId, supplierId]
    );

    const productId = query.rows[0].id;

    query = await db.query(
      `SELECT
        product.id,
        product.product_name,
        brand.brand_name,
        category.category_name,
        supplier.supplier_name,
        product.created_at,
        product.modified_at
      FROM product
      JOIN brand ON product.brand_id = brand.id
      JOIN category ON product.category_id = category.id
      JOIN supplier ON product.supplier_id = supplier.id
      WHERE product.id = $1`,
      [productId]
    );

    const product = query.rows[0];

    return res.status(201).json({
      ok: true,
      message: "Producto creado correctamente.",
      product: product,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El nombre de producto ya está en uso.") {
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

export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      productName,
      productDescription,
      price,
      brandId,
      categoryId,
      supplierId,
    } = req.body;

    let query = await db.query(
      "SELECT product_name FROM product WHERE product_name = $1 AND id != $2 AND is_active != FALSE",
      [productName, productId]
    );

    if (query.rowCount !== 0) {
      throw new Error("El nombre del producto ya está en uso.");
    }

    query = await db.query(
      `UPDATE product
      SET
        product_name = $1,
        product_description = $2,
        price = $3,
        brand_id = $4,
        category_id = $5,
        supplier_id = $6,
        modified_at = NOW()
      WHERE id = $7
      `,
      [
        productName,
        productDescription,
        price,
        brandId,
        categoryId,
        supplierId,
        productId,
      ]
    );

    query = await db.query(
      `SELECT
        product.id,
        product.product_name,
        brand.brand_name,
        category.category_name,
        supplier.supplier_name,
        product.created_at,
        product.modified_at
      FROM product
      JOIN brand ON product.brand_id = brand.id
      JOIN category ON product.category_id = category.id
      JOIN supplier ON product.supplier_id = supplier.id
      WHERE product.id = $1`,
      [productId]
    );

    const product = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Producto editado correctamente.",
      product: product,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El nombre del producto ya está en uso.") {
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

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const query = await db.query(
      "UPDATE product SET is_active = FALSE WHERE id = $1;",
      [productId]
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

export const countProductsByCategory = async (req, res) => {
  try {
    const query = await db.query(
      `SELECT
        category.id,
        category.category_name, 
        COUNT(product.id) AS product_quantity
      FROM category
      JOIN product ON category.id = product.category_id
      WHERE category.is_active = TRUE AND product.is_active = TRUE
      GROUP BY category.id, category.category_name
      ORDER BY category.category_name`
    );

    const productCountByCategory = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Cantidad de productos por categoría obtenida correctamente.",
      productCountByCategory: productCountByCategory,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
