export const getEmployees = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/employee`
  );
  const data = await response.json();

  return data;
};

export const getEmployeeById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/employee/${id}`
  );
  const data = await response.json();

  return data;
};

export const createEmployee = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/employee`,
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
    `${import.meta.env.VITE_API_BASE_URL}api/employee/${id}`,
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
    `${import.meta.env.VITE_API_BASE_URL}api/employee/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const countEmployees = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/employee/count`
  );
  const data = await response.json();

  return data;
};

export const cancelSubscription = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/employee/basic/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();

  return data;
};

export const upgradeToPro = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/employee/pro/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();

  return data;
};
