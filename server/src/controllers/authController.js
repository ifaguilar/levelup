import bcrypt from "bcryptjs";
import db from "../database/db.js";

// Helpers
import { generateToken } from "../helpers/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let query = await db.query(
      "SELECT email, password FROM employee WHERE email = $1",
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
      `
      SELECT
        employee.id,
        person.first_name,
        person.last_name,
        gender.gender_name,
        employee.profile_pic_url
      FROM employee
      INNER JOIN person ON employee.person_id = person.id
      INNER JOIN gender ON person.gender_id = gender.id
      WHERE email = $1
    `,
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
    const { firstName, lastName, phone, email, password } = req.body;

    let query = await db.query("SELECT email FROM employee WHERE email = $1", [
      email,
    ]);

    if (query.rowCount !== 0) {
      throw new Error("El correo electrónico ya está en uso.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // query = await db.query("INSERT INTO person () VALUES ('', '', '')")
    // query = await db.query("INSERT INTO employee () VALUES ('', '', '')")

    // const token = generateToken(user._id);

    return res.status(201).json({
      ok: true,
      message: "Se ha registrado correctamente.",
      // token: token,
      // user: {
      //   name: user.name,
      //   email: user.email,
      //   avatar: user.avatar,
      // },
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "El correo electrónico ya está en uso.") {
      return res.status(409).json({
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
