export const employees = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/employees`
  );
  const data = await response.json();

  return data;
};

export const getEmployeeById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/employees/${id}`
  );
  const data = await response.json();

  return data;
};

export const createEmployee = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/employees`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const editEmployee = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/employees/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteEmployee = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/employees/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const countEmployees = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/count/employees`
  );
  const data = await response.json();

  return data;
};

export const countCustomers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/person/count/customers`
  );
  const data = await response.json();

  return data;
};
