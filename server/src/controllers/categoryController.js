import db from "../database/db.js";

export const getCategory = async (req, res) => {
    try {
      const query = await db.query("SELECT * FROM category");
  
      const team = query.rows;
  
      if (team.length === 0) {
        throw new Error("No se encontraron categorias.");
      }
  
      return res.status(200).json({
        ok: true,
        message: "Lista de categorias obtenida correctamente.",
        team: team,
      });
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "No se encontraron categorias.") {
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

  /*******CREATE BRAND ******/
export const createCategory = async (req, res) => {
    try {
    const {
        categoryName,
        categoryDescription,
      } = req.body;
      
      let query = await db.query(
        `INSERT INTO category (
          category_name,
          category_description
        ) VALUES (
          $1,
          $2
        )RETURNING id`,
        [
            categoryName,
            categoryDescription,
        ]
      );


    const categoryId = query.rows[0].id;
        
      query = await db.query(
        `SELECT
        category.category_name,
        category.category_description,
        category.created_at,
        category.modified_at
        FROM category
        WHERE category.id = $1
        `,
        [categoryId]
      );
      
      const category= query.rows[0];
      return res.status(201).json({
        ok: true,
        message: "categoria creada correctamente.",
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