import * as Yup from "yup";

const phoneRules = /^[0-9]{4}-[0-9]{4}$/;

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Por favor, ingrese un correo electrónico válido.")
    .required("Por favor, ingrese su correo electrónico."),

  password: Yup.string().required("Por favor, ingrese su contraseña."),
});

export const signupSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Por favor, ingrese un nombre con al menos 3 caracteres.")
    .required("Por favor, ingrese su nombre."),

  lastName: Yup.string()
    .min(3, "Por favor, ingrese un apellido con al menos 3 caracteres.")
    .required("Por favor, ingrese su apellido."),

  job: Yup.string().required("Por favor, seleccione su trabajo."),

  phone: Yup.string()
    .min(9, "Por favor, ingrese un número de teléfono válido.")
    .matches(phoneRules, "Por favor, ingrese un número de teléfono válido.")
    .required("Por favor, ingrese su número de teléfono."),

  birthdate: Yup.string().required(
    "Por favor, ingrese su fecha de nacimiento."
  ),

  gender: Yup.string().required("Por favor, seleccione su género."),

  department: Yup.string().required("Por favor, seleccione su departamento."),

  municipality: Yup.string().required("Por favor, seleccione su municipio."),

  address: Yup.string()
    .min(3, "Por favor, ingrese una dirección con al menos 3 caracteres.")
    .required("Por favor, ingrese su dirección."),

  email: Yup.string()
    .email("Por favor, ingrese un correo electrónico válido.")
    .required("Por favor, ingrese su correo electrónico."),

  password: Yup.string().required("Por favor, ingrese una contraseña."),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
    .required("Por favor, confirme su contraseña."),
});
