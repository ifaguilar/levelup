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
  {
    name: "system_logs",
    text: "Bitácora de sistema",
    link: "/system_logs",
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
    name: "jobId",
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
    name: "genderId",
    type: "select",
    label: "Género",
    placeholder: "Seleccione su género...",
  },
];

export const SIGNUP_FORM_ADDRESS_INFO = [
  {
    name: "departmentId",
    type: "select",
    label: "Departamento",
    placeholder: "Seleccione su departamento...",
  },
  {
    name: "municipalityId",
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

export const TEAM_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "team_name", text: "Nombre del equipo" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const JOB_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "job_title", text: "Nombre del trabajo" },
  { id: "team_name", text: "Equipo" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const PRODUCT_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "product_name", text: "Nombre del producto" },
  { id: "brand_name", text: "Marca" },
  { id: "category_name", text: "Categoría" },
  { id: "supplier_name", text: "Proveedor" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const CATEGORY_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "category_name", text: "Nombre de la categoría" },
  { id: "category_description", text: "Descripción de la categoría" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const BRAND_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "brand_name", text: "Nombre de la marca" },
  { id: "created_at", text: "Creado el" },
  { id: "modified_at", text: "Modificado el" },
];

export const LATEST_SALES_ORDERS_TABLE_HEADERS = [
  { id: "id", text: "ID" },
  { id: "customer_name", text: "Nombre del cliente" },
  { id: "email", text: "Correo electrónico" },
  { id: "total_amount", text: "Cantidad" },
  { id: "order_date", text: "Fecha de pedido" },
  { id: "order_status", text: "Estado del pedido" },
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

export const DATE_HEADERS = ["created_at", "modified_at", "order_date"];

export const PRO_BENEFITS = [
  {
    name: "hr",
    text: "Recursos Humanos",
  },
  {
    name: "sales",
    text: "Ventas",
  },
  {
    name: "support",
    text: "Servicio y soporte",
  },
  {
    name: "analytics",
    text: "Analíticas",
  },
  {
    name: "system_logs",
    text: "Bitácora de sistema",
  },
];

export const TAILWIND_CSS_COLORS = [
  "#ef4444", // Red 500
  "#f97316", // Orange 500
  "#f59e0b", // Amber 500
  "#22c55e", // Green 500
  "#14b8a6", // Teal 500
  "#3b82f6", // Blue 500
  "#6366f1", // Indigo 500
  "#d946ef", // Fuchsia 500
  "#f43f5e", // Rose 500
];
