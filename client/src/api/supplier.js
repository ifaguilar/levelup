export const getSuppliers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/supplier`
  );
  const data = await response.json();

  return data;
};

export const getSupplierById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/supplier/${id}`
  );
  const data = await response.json();

  return data;
};

export const createSupplier = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/supplier`,
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

export const editSupplier = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/supplier/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteSupplier = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/supplier/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};
