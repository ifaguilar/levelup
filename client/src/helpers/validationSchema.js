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

  password: Yup.string()
    .min(8, "Por favor, ingrese una contraseña con al menos 8 caracteres.")
    .required("Por favor, ingrese una contraseña."),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
    .required("Por favor, confirme su contraseña."),
});

export const createEmployeeSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre."),

  lastName: Yup.string()
    .min(3, "Ingrese un apellido con al menos 3 caracteres.")
    .required("Ingrese el apellido."),

  job: Yup.string().required("Seleccione el trabajo."),

  phone: Yup.string()
    .min(9, "Ingrese un número de teléfono válido.")
    .matches(phoneRules, "Ingrese un número de teléfono válido.")
    .required("Ingrese el número de teléfono."),

  birthdate: Yup.string().required("Ingrese la fecha de nacimiento."),

  gender: Yup.string().required("Seleccione el género."),

  department: Yup.string().required("Seleccione el departamento."),

  municipality: Yup.string().required("Seleccione el municipio."),

  address: Yup.string()
    .min(3, "Ingrese una dirección con al menos 3 caracteres.")
    .required("Ingrese la dirección."),

  email: Yup.string()
    .email("Ingrese un correo electrónico válido.")
    .required("Ingrese el correo electrónico."),

  password: Yup.string()
    .min(8, "Ingrese una contraseña con al menos 8 caracteres.")
    .required("Ingrese la contraseña."),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
    .required("Confirme la contraseña."),
});

export const editEmployeeSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre."),

  lastName: Yup.string()
    .min(3, "Ingrese un apellido con al menos 3 caracteres.")
    .required("Ingrese el apellido."),

  job: Yup.string().required("Seleccione un trabajo."),

  phone: Yup.string()
    .min(9, "Ingrese un número de teléfono válido.")
    .matches(phoneRules, "Ingrese un número de teléfono válido.")
    .required("Ingrese el número de teléfono."),

  birthdate: Yup.string().required("Ingrese la fecha de nacimiento."),

  gender: Yup.string().required("Seleccione el género."),

  department: Yup.string().required("Seleccione el departamento."),

  municipality: Yup.string().required("Seleccione el municipio."),

  address: Yup.string()
    .min(3, "Ingrese una dirección con al menos 3 caracteres.")
    .required("Ingrese la dirección."),

  email: Yup.string()
    .email("Ingrese un correo electrónico válido.")
    .required("Ingrese el correo electrónico."),
});

export const createBrandSchema = Yup.object({
  brandName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre de la marca."),
});

export const editBrandSchema = Yup.object({
  brandName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre de la marca."),
});
