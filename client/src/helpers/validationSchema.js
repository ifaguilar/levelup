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

  jobId: Yup.string().required("Por favor, seleccione su trabajo."),

  phone: Yup.string()
    .min(9, "Por favor, ingrese un número de teléfono válido.")
    .matches(phoneRules, "Por favor, ingrese un número de teléfono válido.")
    .required("Por favor, ingrese su número de teléfono."),

  birthdate: Yup.string().required(
    "Por favor, ingrese su fecha de nacimiento."
  ),

  genderId: Yup.string().required("Por favor, seleccione su género."),

  departmentId: Yup.string().required("Por favor, seleccione su departamento."),

  municipalityId: Yup.string().required("Por favor, seleccione su municipio."),

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

  jobId: Yup.string().required("Seleccione el trabajo."),

  phone: Yup.string()
    .min(9, "Ingrese un número de teléfono válido.")
    .matches(phoneRules, "Ingrese un número de teléfono válido.")
    .required("Ingrese el número de teléfono."),

  birthdate: Yup.string().required("Ingrese la fecha de nacimiento."),

  genderId: Yup.string().required("Seleccione el género."),

  departmentId: Yup.string().required("Seleccione el departamento."),

  municipalityId: Yup.string().required("Seleccione el municipio."),

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

  jobId: Yup.string().required("Seleccione un trabajo."),

  phone: Yup.string()
    .min(9, "Ingrese un número de teléfono válido.")
    .matches(phoneRules, "Ingrese un número de teléfono válido.")
    .required("Ingrese el número de teléfono."),

  birthdate: Yup.string().required("Ingrese la fecha de nacimiento."),

  genderId: Yup.string().required("Seleccione el género."),

  departmentId: Yup.string().required("Seleccione el departamento."),

  municipalityId: Yup.string().required("Seleccione el municipio."),

  address: Yup.string()
    .min(3, "Ingrese una dirección con al menos 3 caracteres.")
    .required("Ingrese la dirección."),

  email: Yup.string()
    .email("Ingrese un correo electrónico válido.")
    .required("Ingrese el correo electrónico."),
});

export const createTeamSchema = Yup.object({
  teamName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre del equipo."),

  teamDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción del equipo."),
});

export const editTeamSchema = Yup.object({
  teamName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre del equipo."),

  teamDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción del equipo."),
});

export const createJobSchema = Yup.object({
  jobTitle: Yup.string()
    .min(3, "Ingrese un nombre de trabajo con al menos 3 caracteres.")
    .required("Ingrese el nombre del trabajo."),

  jobDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción del trabajo."),

  teamId: Yup.string().required("Seleccione el equipo."),
});

export const editJobSchema = Yup.object({
  jobTitle: Yup.string()
    .min(3, "Ingrese un nombre de trabajo con al menos 3 caracteres.")
    .required("Ingrese el nombre del trabajo."),

  jobDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción del trabajo."),

  teamId: Yup.string().required("Seleccione el equipo."),
});

export const createProductSchema = Yup.object({
  productName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre del producto."),

  productDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción del producto."),

  price: Yup.number("Ingrese un precio válido.")
    .min(1, "Ingrese un precio válido.")
    .positive("Ingrese un precio válido.")
    .required("Ingrese un precio válido."),

  brandId: Yup.string().required("Seleccione la marca."),

  categoryId: Yup.string().required("Seleccione la categoría."),

  supplierId: Yup.string().required("Seleccione el proveedor."),
});

export const editProductSchema = Yup.object({
  productName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre del producto."),

  productDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción del producto."),

  price: Yup.number("Ingrese un precio válido.")
    .min(1, "Ingrese un precio válido.")
    .positive("Ingrese un precio válido.")
    .required("Ingrese un precio válido."),

  brandId: Yup.string().required("Seleccione la marca."),

  categoryId: Yup.string().required("Seleccione la categoría."),

  supplierId: Yup.string().required("Seleccione el proveedor."),
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

export const createCategorySchema = Yup.object({
  categoryName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre de la categoría."),

  categoryDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción de la categoría."),
});

export const editCategorySchema = Yup.object({
  categoryName: Yup.string()
    .min(3, "Ingrese un nombre con al menos 3 caracteres.")
    .required("Ingrese el nombre de la categoría."),

  categoryDescription: Yup.string()
    .min(3, "Ingrese una descripción con al menos 3 caracteres.")
    .required("Ingrese la descripción de la categoría."),
});
