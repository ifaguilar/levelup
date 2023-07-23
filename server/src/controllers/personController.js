import db from "../database/db.js";

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const query = await db.query(
      "UPDATE employee SET is_active = FALSE WHERE id = $1;",
      [id]
    );

    return res.status(200).json({
      ok: true,
      message: "Empleado eliminado correctamente.",
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const query = await db.query(
      `
      SELECT
        employee.id,
        CONCAT(person.first_name, ' ', person.last_name) AS full_name,
        person.email,
        job.job_title
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN job ON employee.job_id = job.id
      WHERE employee.is_active = TRUE
      `
    );

    const employees = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de empleados obtenida correctamente.",
      employees: employees,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const query = await db.query(
      `
      SELECT
        employee.id,
        CONCAT(person.first_name, ' ', person.last_name) AS full_name,
        person.email,
        job.job_title
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN job ON employee.job_id = job.id
      WHERE employee.is_active = TRUE
      `
    );

    const employees = query.rows;

    return res.status(200).json({
      ok: true,
      message: "Información de clientes obtenida correctamente.",
      employees: employees,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const countEmployees = async (req, res) => {
  try {
    const query = await db.query(
      "SELECT COUNT(*) FROM employee WHERE is_active = TRUE"
    );

    const employeeCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de empleados obtenida correctamente.",
      employeeCount: employeeCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};

export const countCustomers = async (req, res) => {
  try {
    const query = await db.query(
      "SELECT COUNT(*) FROM customer WHERE is_active = TRUE"
    );

    const customerCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de clientes obtenida correctamente.",
      customerCount: customerCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
