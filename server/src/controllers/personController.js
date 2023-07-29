import db from "../database/db.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      job,
      phone,
      birthdate,
      gender,
      municipality,
      address,
      email,
      password,
    } = req.body;

    let query = await db.query(
      `SELECT person.email
      FROM employee
      JOIN person ON employee.person_id = person.id
      WHERE person.email = $1 AND employee.is_active != FALSE
      `,
      [email]
    );

    if (query.rowCount !== 0) {
      throw new Error("El correo electrónico ya está en uso.");
    }

    query = await db.query(
      `SELECT person.phone
      FROM employee
      JOIN person ON employee.person_id = person.id
      WHERE person.phone = $1 AND employee.is_active != FALSE
      `,
      [phone]
    );

    if (query.rowCount !== 0) {
      throw new Error("El número de teléfono ya está en uso.");
    }

    query = await db.query(
      `INSERT INTO address (
        address_description,
        municipality_id
      ) VALUES (
        $1,
        $2
      ) RETURNING id`,
      [address, parseInt(municipality)]
    );

    const addressId = query.rows[0].id;

    query = await db.query(
      `INSERT INTO person (
        first_name,
        last_name,
        email,
        phone,
        birthdate,
        gender_id,
        address_id
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      ) RETURNING id`,
      [
        firstName,
        lastName,
        email,
        phone,
        birthdate,
        parseInt(gender),
        addressId,
      ]
    );

    const personId = query.rows[0].id;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const encodedName = `${firstName}+${lastName}`;
    const profilePicUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=128&bold=true`;

    query = await db.query(
      `INSERT INTO employee (
        password,
        profile_pic_url,
        person_id,
        job_id
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      )`,
      [hashedPassword, profilePicUrl, personId, parseInt(job)]
    );

    query = await db.query(
      `SELECT
        employee.id,
        CONCAT(person.first_name, ' ', person.last_name) AS full_name,
        person.email,
        job.job_title,
        employee.created_at,
        employee.modified_at
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN job ON employee.job_id = job.id
      WHERE person.email = $1`,
      [email]
    );

    const employee = query.rows[0];

    return res.status(201).json({
      ok: true,
      message: "Empleado creado correctamente.",
      employee: employee,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El correo electrónico ya está en uso.") {
      return res.status(400).json({
        ok: false,
        message: error.message,
      });
    }

    if (error.message === "El número de teléfono ya está en uso.") {
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

export const editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      job,
      phone,
      birthdate,
      gender,
      municipality,
      address,
      email,
    } = req.body;

    let query = await db.query("SELECT person_id FROM employee WHERE id = $1", [
      parseInt(id),
    ]);

    const personId = query.rows[0].person_id;

    query = await db.query(
      "SELECT email FROM person WHERE email = $1 AND id != $2",
      [email, personId]
    );

    if (query.rowCount !== 0) {
      throw new Error("El correo electrónico ya está en uso.");
    }

    query = await db.query(
      "SELECT phone FROM person WHERE phone = $1 AND id != $2",
      [phone, personId]
    );

    if (query.rowCount !== 0) {
      throw new Error("El número de teléfono ya está en uso.");
    }

    query = await db.query(
      `INSERT INTO address (
        address_description,
        municipality_id
      ) VALUES (
        $1,
        $2
      ) RETURNING id`,
      [address, parseInt(municipality)]
    );

    const addressId = query.rows[0].id;

    query = await db.query(
      `UPDATE person
      SET
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        birthdate = $5,
        gender_id = $6,
        address_id = $7,
        modified_at = NOW()
      WHERE id = $8
      `,
      [
        firstName,
        lastName,
        email,
        phone,
        birthdate,
        parseInt(gender),
        addressId,
        personId,
      ]
    );

    const encodedName = `${firstName}+${lastName}`;
    const profilePicUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=128&bold=true`;

    query = await db.query(
      `UPDATE employee
      SET
        profile_pic_url = $1,
        job_id = $2,
        modified_at = NOW()
      WHERE id = $3`,
      [profilePicUrl, parseInt(job), id]
    );

    query = await db.query(
      `SELECT
        employee.id,
        CONCAT(person.first_name, ' ', person.last_name) AS full_name,
        person.email,
        job.job_title,
        employee.created_at,
        employee.modified_at
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN job ON employee.job_id = job.id
      WHERE person.email = $1`,
      [email]
    );

    const employee = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Empleado editado correctamente.",
      employee: employee,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El correo electrónico ya está en uso.") {
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
        job.job_title,
        employee.created_at,
        employee.modified_at
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

export const getEmployeeById = async (req, res) => {
  try {
    const query = await db.query(
      `
      SELECT
        employee.id,
        person.first_name,
        person.last_name,
        employee.job_id,
        person.phone,
        person.birthdate,
        person.gender_id,
        municipality.department_id,
        address.municipality_id,
        address.address_description,
        person.email
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN address ON person.address_id = address.id
      JOIN municipality ON address.municipality_id = municipality.id
      WHERE employee.id = $1
      `,
      [req.params.id]
    );

    const employee = query.rows[0];

    return res.status(200).json({
      ok: true,
      message: "Información de empleado obtenida correctamente.",
      employee: employee,
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
