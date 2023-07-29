export const brands = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/brand`);
  const data = await response.json();

  return data;
};

export const getBrandById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/brand/${id}`
  );
  const data = await response.json();

  return data;
};

export const createBrand = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/brand`,
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

export const editBrand = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/brand/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteBrand = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/brand/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const countBrands = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/brands/count`
  );
  const data = await response.json();

  return data;
};
