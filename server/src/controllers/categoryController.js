import db from "../database/db.js";

export const getCategory = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        id,
        category_name,
        created_at,
        modified_at
      FROM category
      WHERE is_active = TRUE
      `);

    const category = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de categorias obtenida correctamente.",
      category: category,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

  /*******CREATE Category ******/
  export const createCategory = async (req, res) => {
    try {
      const { categoryName, categoryDescription } = req.body;
  
      let query = await db.query(
        "SELECT category_name FROM category WHERE category_name = $1 AND is_active != FALSE",
        [categoryName]
      );
  
      if (query.rowCount !== 0) {
        throw new Error("El nombre de la categoria ya está en uso.");
      }
  
      query = await db.query(
        `INSERT INTO category (
          category_name,
          category_description
        ) VALUES (
          $1,
          $2
        ) RETURNING id`,
        [categoryName, categoryDescription]
      );
  
      const categoryId = query.rows[0].id;
  
      query = await db.query(
        `SELECT
          id,
          category_name,
          created_at,
          modified_at
        FROM category
        WHERE id = $1`,
        [categoryId]
      );
  
      const category = query.rows[0];
  
      return res.status(201).json({
        ok: true,
        message: "Categoria creada correctamente.",
        category: category,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "El nombre de la categoria ya está en uso.") {
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
  
  export const editCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { categoryName, categoryDescription } = req.body;
  
      let query = await db.query(
        "SELECT category_name FROM category WHERE category_name = $1 AND id != $2 AND is_active != FALSE",
        [categoryName, categoryId]
      );
  
      if (query.rowCount !== 0) {
        throw new Error("El nombre de la tarea ya está en uso.");
      }
  
      query = await db.query(
        `UPDATE 
          category 
        SET 
          category_name = $1,
          category_description = $2,
          modified_at = NOW()
        WHERE id = $3`,
        [categoryName, categoryDescription, categoryId]
      );
  
      query = await db.query(
        `SELECT
          id,
          category_name,
          created_at,
          modified_at
        FROM category
        WHERE id = $1`,
        [categoryId]
      );
  
      const category = query.rows[0];
  
      return res.status(200).json({
        ok: true,
        message: "categoria editado correctamente.",
        category: category,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "El nombre de la tarea está en uso.") {
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

/************** DELETE CATEGORY *****/
  export const deleteCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const query = await db.query(
        "UPDATE category SET is_active = FALSE WHERE id = $1;",
        [id]
      );
  
      return res.status(200).json({
        ok: true,
        message: "Categoria eliminada correctamente.",
      });
    } catch (error) {
      console.error(error.message);
  
      return res.status(500).json({
        ok: false,
        message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
      });
    }
  };

 
export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const query = await db.query(
      "SELECT id, category_name FROM category WHERE id = $1",
      [categoryId]
    );

    const category = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Información de categoria obtenida correctamente.",
      category: category,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

