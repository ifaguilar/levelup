import bcrypt from "bcryptjs";
import db from "../database/db.js";

// Helpers
import { generateToken } from "../helpers/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let query = await db.query(
      `SELECT
        person.email, employee.password
      FROM employee
      JOIN person ON employee.person_id = person.id
      WHERE email = $1`,
      [email]
    );

    if (query.rowCount === 0) {
      throw new Error("Correo electrónico o contraseña inválidos.");
    }

    const userPassword = query.rows[0].password;
    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
      throw new Error("Correo electrónico o contraseña inválidos.");
    }

    query = await db.query(
      `SELECT
        employee.id,
        person.first_name,
        person.last_name,
        gender.gender_name,
        employee.profile_pic_url
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN gender ON person.gender_id = gender.id
      WHERE email = $1`,
      [email]
    );

    let user = query.rows[0];
    user = {
      ...user,
      email: email,
    };

    const token = generateToken(user.id);

    return res.status(200).json({
      ok: true,
      message: "Se ha iniciado sesión correctamente.",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "Correo electrónico o contraseña inválidos.") {
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

export const signup = async (req, res) => {
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

    let query = await db.query("SELECT email FROM person WHERE email = $1", [
      email,
    ]);

    if (query.rowCount !== 0) {
      throw new Error("El correo electrónico ya está en uso.");
    }

    query = await db.query("SELECT phone FROM person WHERE phone = $1", [
      phone,
    ]);

    if (query.rowCount !== 0) {
      throw new Error("El número telefónico ya está en uso.");
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

    const address_id = query.rows[0].id;

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
        address_id,
      ]
    );

    const person_id = query.rows[0].id;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const encodedName = `${firstName}+${lastName}`;
    const profile_pic_url = `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=128&bold=true`;

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
      [hashedPassword, profile_pic_url, person_id, parseInt(job)]
    );

    query = await db.query(
      `SELECT
        employee.id,
        person.first_name,
        person.last_name,
        gender.gender_name,
        employee.profile_pic_url
      FROM employee
      JOIN person ON employee.person_id = person.id
      JOIN gender ON person.gender_id = gender.id
      WHERE email = $1`,
      [email]
    );

    let user = query.rows[0];
    user = {
      ...user,
      email: email,
    };

    const token = generateToken(user.id);

    return res.status(201).json({
      ok: true,
      message: "Se ha registrado correctamente.",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El correo electrónico ya está en uso.") {
      return res.status(400).json({
        ok: false,
        message: error.message,
      });
    }

    if (error.message === "El número telefónico ya está en uso.") {
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
