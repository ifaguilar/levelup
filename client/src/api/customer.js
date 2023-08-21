export const getCustomers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customer`
  );
  const data = await response.json();

  return data;
};

export const getCustomerById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customer/${id}`
  );
  const data = await response.json();

  return data;
};

export const createCustomer = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customer`,
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

export const editCustomer = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customer/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteCustomer = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customer/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const countCustomers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/customers/count`
  );
  const data = await response.json();

  return data;
};
