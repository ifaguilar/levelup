export const SIDEBAR_ITEMS = [
  {
    name: "dashboard",
    text: "Dashboard",
    link: "/",
  },
  {
    name: "hr",
    text: "Recursos Humanos",
    link: "/hr",
  },
  {
    name: "inventory",
    text: "Inventario",
    link: "/inventory",
  },
  {
    name: "sales",
    text: "Ventas",
    link: "/sales",
  },
  {
    name: "support",
    text: "Servicio y soporte",
    link: "/support",
  },
  {
    name: "analytics",
    text: "Analíticas",
    link: "/analytics",
  },
];

export const DROPDOWN_ITEMS = [
  {
    name: "profile",
    text: "Perfil",
    link: "/profile",
  },
];

export const SIGNUP_FORM_BASIC_INFO = [
  {
    name: "firstName",
    type: "text",
    label: "Nombre",
    placeholder: "Ingrese su nombre...",
  },
  {
    name: "lastName",
    type: "text",
    label: "Apellido",
    placeholder: "Ingrese su apellido...",
  },
  {
    name: "job",
    type: "select",
    label: "Trabajo",
    placeholder: "Seleccione su trabajo...",
  },
];

export const SIGNUP_FORM_PERSONAL_INFO = [
  {
    name: "phone",
    type: "text",
    label: "Teléfono",
    placeholder: "Ingrese su teléfono...",
  },
  {
    name: "birthdate",
    type: "date",
    label: "Fecha de nacimiento",
    placeholder: "Ingrese su fecha de nacimiento...",
  },
  {
    name: "gender",
    type: "select",
    label: "Género",
    placeholder: "Seleccione su género...",
  },
];

export const SIGNUP_FORM_ADDRESS_INFO = [
  {
    name: "department",
    type: "select",
    label: "Departamento",
    placeholder: "Seleccione su departamento...",
  },
  {
    name: "municipality",
    type: "select",
    label: "Municipio",
    placeholder: "Seleccione su municipio...",
  },
  {
    name: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Ingrese su dirección...",
  },
];

export const SIGNUP_FORM_SECURITY_INFO = [
  {
    name: "email",
    type: "email",
    label: "Correo electrónico",
    placeholder: "Ingrese su correo electrónico...",
  },
  {
    name: "password",
    type: "password",
    label: "Contraseña",
    placeholder: "Ingrese su contraseña...",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirmar contraseña",
    placeholder: "Confirme su contraseña...",
  },
];

export const SIGNUP_FORM_STEPS = [
  {
    title: "Información básica",
    fields: SIGNUP_FORM_BASIC_INFO,
  },
  {
    title: "Información personal",
    fields: SIGNUP_FORM_PERSONAL_INFO,
  },
  {
    title: "Información de dirección",
    fields: SIGNUP_FORM_ADDRESS_INFO,
  },
  {
    title: "Información de seguridad",
    fields: SIGNUP_FORM_SECURITY_INFO,
  },
];

export const EMPLOYEE_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "full_name", text: "Nombre completo" },
  { id: "email", text: "Correo electrónico" },
  { id: "job_title", text: "Trabajo" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const BRAND_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "brand_name", text: "Nombre de la marca" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const DATE_TIME_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
  timeZone: "America/Tegucigalpa",
};
