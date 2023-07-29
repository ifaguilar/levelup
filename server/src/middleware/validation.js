import { body, validationResult } from "express-validator";

const phoneRules = /^[0-9]{4}-[0-9]{4}$/;

export const loginSchema = [
  body("email")
    .isEmail()
    .withMessage("Por favor, ingrese un correo electrónico válido.")
    .notEmpty()
    .withMessage("Por favor, ingrese su correo electrónico."),

  body("password").notEmpty().withMessage("Por favor, ingrese su contraseña."),
];

export const signupSchema = [
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("Por favor, ingrese un nombre con al menos 3 caracteres.")
    .notEmpty()
    .withMessage("Por favor, ingrese su nombre."),

  body("lastName")
    .isLength({ min: 3 })
    .withMessage("Por favor, ingrese un apellido con al menos 3 caracteres.")
    .notEmpty()
    .withMessage("Por favor, ingrese su apellido."),

  body("phone")
    .isLength({ min: 9 })
    .withMessage("Por favor, ingrese un número de teléfono válido.")
    .matches(phoneRules)
    .withMessage("Por favor, ingrese un número de teléfono válido.")
    .notEmpty()
    .withMessage("Por favor, ingrese su número de teléfono."),

  body("address")
    .isLength({ min: 3 })
    .withMessage("Ingrese una dirección con al menos 3 caracteres.")
    .notEmpty()
    .withMessage("Por favor, ingrese su dirección."),

  body("email")
    .isEmail()
    .withMessage("Por favor, ingrese un correo electrónico válido.")
    .notEmpty()
    .withMessage("Por favor, ingrese su correo electrónico."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Por favor, ingrese una contraseña con al menos 8 caracteres.")
    .notEmpty()
    .withMessage("Por favor, ingrese su contraseña."),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden.");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Por favor, confirme su contraseña."),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map((error) => error.msg);
  return res.status(400).json({ errors: errorMessages });
};
